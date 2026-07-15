import type {
  SubDocument, SupportingDocument, SubDocumentTypes,
  IContactFields, EmptyDocumentRequest, DocumentRequest, TextValue
} from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'
import type { LinkedRecordStore } from './types'
import { Schema } from './schema'
import { escape as solrEscape } from '~/services/solr/queries'

function normalize (value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed.toLowerCase()
}

// A built contact's name field may be a plain string (person first/last name) or
// a locale-keyed TextValue object (organization name); collect the comparable strings.
function localeValues (value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (value !== null && typeof value === 'object') {
    return Object.values(value).filter((v): v is string => typeof v === 'string')
  }
  return []
}

// Whether the uploaded contact's name matches an already-built record. A blank
// uploaded name is not compared (email + government alone decide the match); a
// present name must match so a same-email contact with a different name is not merged.
function contactMatchesRecord (contact: SupportingDocument<IContactFields>, record: Record<string, unknown>): boolean {
  if (contact.type === 'organization') {
    const target = normalize(contact.orgName)
    if (target === undefined) return true
    return localeValues(record['organization']).some(v => normalize(v) === target)
  }
  const first = normalize(contact.orgName)
  const last = normalize(contact.acronym)
  const firstMatches = first === undefined || normalize(record['firstName']) === first
  const lastMatches = last === undefined || normalize(record['lastName']) === last
  return firstMatches && lastMatches
}

export function findContactInLinkedRecords (contact: SupportingDocument<IContactFields>, linkedRecords: LinkedRecordStore): string | undefined {
  const { email } = contact
  if (typeof email !== 'string') return undefined
  const match = linkedRecords.find((rec: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
    const record = rec as Record<string, unknown>
    const { emails } = record
    if (!Array.isArray(emails) || !emails.includes(email)) return false
    return contactMatchesRecord(contact, record)
  })
  if (match === undefined) return undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
  const { header: h } = match as unknown as Record<string, { identifier?: string }>
  return h?.identifier
}

export async function resolveExistingContactIds (
  existing: string,
  getDocumentByUid: (uid: string)=> Promise<string>
): Promise<SubDocument[]> {
  const ids = await Promise.all(
    existing.split(',').map(async uid => await getDocumentByUid(uid.trim()))
  )
  return ids.map(identifier => ({ identifier }))
}

// Name clauses added to the contact lookup so a match also requires the name,
// not just email + government (person names are exact-string fields, organization
// name is analyzed text).
function buildContactVerificationQuery (contact: SupportingDocument<IContactFields>): string[] {
  if (contact.type === 'organization') {
    const org = contact.orgName?.trim()
    if (Schema.isEmpty(org)) return []
    return [`organization_EN_t:"${solrEscape(org)}"`]
  }
  const clauses: string[] = []
  const first = contact.orgName?.trim()
  const last = contact.acronym?.trim()
  if (!Schema.isEmpty(first)) clauses.push(`firstName_s:"${solrEscape(first)}"`)
  if (!Schema.isEmpty(last)) clauses.push(`lastName_s:"${solrEscape(last)}"`)
  return clauses
}

export async function findExistingContact (
  contact: SupportingDocument<IContactFields>,
  governmentRaw: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- SolrApi is a JS module with no type declarations
  solrApi: any
): Promise<string | undefined> {
  const { email } = contact
  if (Schema.isEmpty(email) || Schema.isEmpty(governmentRaw)) return undefined
  const governmentIso = await Schema.resolveCountryIso(governmentRaw)
  if (governmentIso === undefined) return undefined
  const query = [
    'schema_s:contact',
    `text_EN_txt:"${solrEscape(email)}"`,
    `government_s:${solrEscape(governmentIso)}`,
    ...buildContactVerificationQuery(contact)
  ].join(' AND ')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-type-assertion -- SolrApi is a JS module
  const data = await (solrApi.query({ query, fields: 'identifier_s,_revision_i' })) as { response: { docs: Array<{ identifier_s?: string; _revision_i?: number }> } }
  const { response: { docs: [doc] } } = data
  if (doc?.identifier_s === undefined) return undefined
  return `${doc.identifier_s}@${doc._revision_i ?? 1}`
}

export async function buildContactDocument (
  contact: SupportingDocument<SubDocumentTypes>,
  opts: {
    language: LanguageCode
    countryIso: string | undefined
    getLocaleValue: (value: string | undefined | null)=> TextValue | undefined
  }
): Promise<DocumentRequest> {
  const { language, countryIso, getLocaleValue } = opts
  const contactFields = contact
  const data: EmptyDocumentRequest = {
    header: {
      identifier: Schema.generateId(),
      schema: 'contact',
      languages: [language]
    },
    type: contactFields.type,
    government: Schema.toETerm(countryIso),
    country: Schema.toETerm(await Schema.resolveCountryIso(contactFields.country ?? undefined)),
    city: getLocaleValue(contactFields.city),
    address: getLocaleValue(contactFields.address),
    emails: typeof contactFields.email === 'string' ? [contactFields.email] : undefined
  }

  if (contactFields.type === 'organization') {
    data['organization'] = getLocaleValue(contactFields.orgName)
    data['organizationAcronym'] = getLocaleValue(contactFields.acronym)
  } else {
    data['type'] = 'person'
    data['firstName'] = (contactFields.orgName ?? '').trim()
    data['lastName'] = (contactFields.acronym ?? '').trim()
  }

  return Schema.removeEmptyValues(data)
}

export async function findContactOrCreate (
  contact: SupportingDocument<IContactFields> | undefined,
  linkedRecords: LinkedRecordStore,
  opts: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- SolrApi is a JS module with no type declarations
    solrApi: any
    countryIso: string | undefined
    language: LanguageCode
    getLocaleValue: (value: string | undefined | null)=> TextValue | undefined
    getDocumentByUid: (uid: string)=> Promise<string>
  }
): Promise<SubDocument[]> {
  if (contact === undefined) return []

  const { existing } = contact
  if (typeof existing === 'string' && existing.trim().length > 0) {
    return await resolveExistingContactIds(existing, opts.getDocumentByUid)
  }

  // Newly created records are published as revision 1, so references to them use @1.
  const linkedId = findContactInLinkedRecords(contact, linkedRecords)
  if (linkedId !== undefined) return [{ identifier: `${linkedId}@1` }]

  const solrIdentifier = await findExistingContact(contact, opts.countryIso, opts.solrApi)
  if (solrIdentifier !== undefined) return [{ identifier: solrIdentifier }]

  const doc = await buildContactDocument(contact, {
    language: opts.language,
    countryIso: opts.countryIso,
    getLocaleValue: opts.getLocaleValue
  })
  linkedRecords.push(doc)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SupportingDocument has dynamic shape at runtime
  const { header: h } = doc as unknown as Record<string, { identifier?: string }>
  return [{ identifier: `${h?.identifier ?? ''}@1` }]
}
