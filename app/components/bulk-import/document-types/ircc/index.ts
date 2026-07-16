import type { DocumentTypeDefinition, RawRow, ValidateRowsContext, ValidationError } from '../../framework/types'
import type { LinkedRecordVerification } from '../../framework/record-utils'
import { KmDocumentsApi } from '~/api/km-document'
import { SCHEMAS } from '~/constants/schemas'
import { EXISTING_ID_REGEXP, isUserRecordOwner, verifyLinkedRecord } from '../../framework/record-utils'
import { Schema } from '../../framework/schema'
import { IrccSchema } from './schema'
import attributesMap from './attributes-map'
import irccMessages from '~/app-text/components/bulk-import/document-types/ircc.json'

const COUNTRY_COLUMNS = ['country', 'provider.country', 'pic.country']
const CONTACT_PREFIXES = ['provider', 'pic'] as const
const CONTACT_DETAIL_FIELDS = ['orgName', 'acronym', 'address', 'city', 'country', 'email'] as const
const CONTACT_REQUIRED_FIELDS = ['type', 'orgName', 'country', 'email'] as const

async function validateExistingIds (existing: string, column: string, rowIndex: number, api: KmDocumentsApi): Promise<ValidationError[]> {
  const errors: ValidationError[] = []
  for (const uid of existing.split(',').map(s => s.trim()).filter(Boolean)) {
    const { documentId } = EXISTING_ID_REGEXP.exec(uid)?.groups ?? {}
    if (documentId === undefined) {
      errors.push({ row: rowIndex, column, level: 'error', code: 'errorInvalidContactId', params: { uid }, value: uid })
      continue
    }
    // eslint-disable-next-line no-await-in-loop -- sequential is fine; IDs per row are typically 1
    const result = await verifyLinkedRecord(uid, api)
    if (!result.exists) {
      errors.push({ row: rowIndex, column, level: 'error', code: 'errorContactIdNotFound', params: { uid }, value: uid })
    } else if (result.schema !== SCHEMAS.CONTACT) {
      errors.push({ row: rowIndex, column, level: 'error', code: 'errorContactSchemaMismatch', params: { uid }, value: uid })
    }
  }
  return errors
}

async function validateContact (
  row: RawRow,
  rowIndex: number,
  prefix: typeof CONTACT_PREFIXES[number],
  api: KmDocumentsApi
): Promise<ValidationError[]> {
  // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- computed key destructuring not recognised by rule
  const existing = row[`${prefix}.existing`]
  const hasExisting = typeof existing === 'string' && existing.trim() !== ''

  if (!hasExisting) {
    return CONTACT_REQUIRED_FIELDS
      .filter(field => Schema.isEmpty(row[`${prefix}.${field}`]))
      .map(field => ({ row: rowIndex, column: `${prefix}.${field}`, level: 'error' as const, code: 'errorFieldRequired' }))
  }

  const column = `${prefix}.existing`
  const hasContactInfo = CONTACT_DETAIL_FIELDS.some(field => !Schema.isEmpty(row[`${prefix}.${field}`]))
  if (hasContactInfo) {
    return [{ row: rowIndex, column, level: 'error', code: 'errorContactIdOrDetails' }]
  }

  return await validateExistingIds(existing, column, rowIndex, api)
}

async function resolveUniqueCnaIds (rows: RawRow[], api: KmDocumentsApi): Promise<Map<string, LinkedRecordVerification>> {
  const uids = new Set<string>()
  for (const row of rows) {
    const { absCNAId: value } = row
    if (typeof value !== 'string' || value.trim() === '') continue
    uids.add(value.trim())
  }

  const results = new Map<string, LinkedRecordVerification>()
  await Promise.all([...uids].map(async uid => {
    results.set(uid, await verifyLinkedRecord(uid, api))
  }))
  return results
}

function validateCna (
  row: RawRow,
  rowIndex: number,
  cnaResults: Map<string, LinkedRecordVerification>,
  userGovernment?: string
): ValidationError[] {
  const { absCNAId: cnaValue } = row
  if (typeof cnaValue !== 'string' || cnaValue.trim() === '') return []

  const uid = cnaValue.trim()
  function cnaError (code: string): ValidationError[] {
    return [{ row: rowIndex, column: 'absCNAId', level: 'error', code, params: { uid }, value: uid }]
  }

  const { documentId } = EXISTING_ID_REGEXP.exec(uid)?.groups ?? {}
  if (documentId === undefined) {
    return cnaError('errorInvalidCnaFormat')
  }

  const cnaResult = cnaResults.get(uid)
  if (cnaResult?.exists !== true) {
    return cnaError('errorCnaNotFound')
  }
  if (cnaResult.schema !== SCHEMAS.AUTHORITY) {
    return cnaError('errorCnaSchemaMismatch')
  }
  if (!isUserRecordOwner(cnaResult, userGovernment)) {
    return cnaError('errorCnaGovernmentMismatch')
  }
  return []
}

async function validateRows (rows: RawRow[], ctx: ValidateRowsContext): Promise<ValidationError[]> {
  const { tokenReader, realm, userGovernment } = ctx
  const errors: ValidationError[] = []
  const api = new KmDocumentsApi({ tokenReader, realm })

  const cnaResults = await resolveUniqueCnaIds(rows, api)

  await Promise.all(rows.map(async (row, rowIndex) => {
    await Promise.all(COUNTRY_COLUMNS.map(async (key) => {
      const value = typeof row[key] === 'string' ? row[key] : undefined
      if (value === undefined || value === '') return
      const resolved = await Schema.resolveCountryIso(value)
      if (resolved === undefined) {
        errors.push({ row: rowIndex, column: key, level: 'error', code: 'errorUnrecognizedCountry', params: { value }, value })
      } else if (key === 'country' && userGovernment !== undefined && resolved !== userGovernment.toLowerCase()) {
        errors.push({ row: rowIndex, column: key, level: 'error', code: 'errorCountryGovernmentMismatch', params: { value }, value })
      }
    }))

    errors.push(...validateCna(row, rowIndex, cnaResults, userGovernment))

    const contactErrors = await Promise.all(CONTACT_PREFIXES.map(async prefix => await validateContact(row, rowIndex, prefix, api)))
    errors.push(...contactErrors.flat())
  }))

  return errors
}

export const irccDocumentType: DocumentTypeDefinition = {
  Schema: IrccSchema,
  getLanguage: (row) => typeof row['language'] === 'string' ? row['language'] : '',
  attributesMap,
  messages: irccMessages,
  validateRows,
  // each document type can have diff header rows,
  // incase of ircc there are 2 header rows.
  headerRows: [0, 1],
  pinnedColumns: ['permitEquivalent'],
  columnGroups: [
    { translationKey: 'general', keys: ['language', 'country'] },
    { translationKey: 'issuingAuthority', keys: ['absCNAId'] },
    { translationKey: 'permitDetails', keys: ['dateOfIssuance', 'dateOfExpiry'] },
    {
      translationKey: 'providerSection',
      keys: ['provider.type', 'provider.existing', 'provider.orgName', 'provider.acronym', 'provider.address', 'provider.city', 'provider.country', 'provider.email']
    },
    {
      translationKey: 'picSection',
      keys: ['pic.consent', 'pic.type', 'pic.existing', 'pic.orgName', 'pic.acronym', 'pic.address', 'pic.city', 'pic.country', 'pic.email']
    },
    { translationKey: 'mat', keys: ['matEstablished'] },
    { translationKey: 'geneticResource', keys: ['subjectMatter', 'keywords', 'specimens', 'taxonomies'] },
    { translationKey: 'usesConditions', keys: ['usage', 'usageDescription', 'conditionsThirdPartyTransfer'] },
    { translationKey: 'documentation', keys: ['permitFiles', 'additionalInformation'] }
  ]
}
