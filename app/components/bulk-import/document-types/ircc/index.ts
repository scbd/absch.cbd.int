import type { DocumentTypeDefinition, RawRow, SheetError, TokenReader } from '../../framework/types'
import { KmDocumentsApi } from '~/api/km-document'
import { Schema } from '../../framework/schema'
import { IrccSchema } from './schema'
import attributesMap from './attributes-map'
import irccMessages from '~/app-text/components/bulk-import/document-types/ircc.json'

const COUNTRY_COLUMNS = ['country', 'provider.country', 'pic.country']
const CONTACT_PREFIXES = ['provider', 'pic'] as const
const CONTACT_DETAIL_FIELDS = ['orgName', 'acronym', 'address', 'city', 'country', 'email'] as const
const CONTACT_REQUIRED_FIELDS = ['type', 'orgName', 'country', 'email'] as const

const EXISTING_ID_REGEXP = /^[a-z]+-[a-z]+-[a-z]+-(?<documentId>\d+)(?:-\d{1,3})?$/i

async function validateExistingIds (existing: string, column: string, rowIndex: number, api: KmDocumentsApi): Promise<SheetError[]> {
  const errors: SheetError[] = []
  for (const uid of existing.split(',').map(s => s.trim()).filter(Boolean)) {
    const { documentId } = EXISTING_ID_REGEXP.exec(uid)?.groups ?? {}
    if (documentId === undefined) {
      errors.push({ row: rowIndex, column, level: 'error', message: `Invalid contact ID format: "${uid}"`, value: uid })
      continue
    }
    // eslint-disable-next-line no-await-in-loop -- sequential is fine; IDs per row are typically 1
    const exists = await api.exists(documentId).catch(() => false)
    if (!exists) {
      errors.push({ row: rowIndex, column, level: 'error', message: `Contact ID not found: "${uid}"`, value: uid })
    }
  }
  return errors
}

async function validateContact (
  row: RawRow,
  rowIndex: number,
  prefix: typeof CONTACT_PREFIXES[number],
  api: KmDocumentsApi
): Promise<SheetError[]> {
  // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- computed key destructuring not recognised by rule
  const existing = row[`${prefix}.existing`]
  const hasExisting = typeof existing === 'string' && existing.trim() !== ''

  if (!hasExisting) {
    return CONTACT_REQUIRED_FIELDS
      .filter(field => Schema.isEmpty(row[`${prefix}.${field}`]))
      .map(field => ({ row: rowIndex, column: `${prefix}.${field}`, level: 'error' as const, message: 'This field is required' }))
  }

  const column = `${prefix}.existing`
  const hasContactInfo = CONTACT_DETAIL_FIELDS.some(field => !Schema.isEmpty(row[`${prefix}.${field}`]))
  if (hasContactInfo) {
    return [{ row: rowIndex, column, level: 'error', message: 'Provide either an existing contact ID or contact details, not both' }]
  }

  return await validateExistingIds(existing, column, rowIndex, api)
}

async function validateRows (rows: RawRow[], tokenReader: TokenReader): Promise<SheetError[]> {
  const errors: SheetError[] = []
  const api = new KmDocumentsApi({ tokenReader })

  await Promise.all(rows.map(async (row, rowIndex) => {
    await Promise.all(COUNTRY_COLUMNS.map(async (key) => {
      const value = typeof row[key] === 'string' ? row[key] : undefined
      if (value === undefined || value === '') return
      const resolved = await Schema.resolveCountryIso(value)
      if (resolved === undefined) {
        errors.push({ row: rowIndex, column: key, level: 'error', message: `Unrecognized country: "${value}"`, value })
      }
    }))

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
