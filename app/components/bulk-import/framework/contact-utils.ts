import type {
  SubDocument, SupportingDocument, SubDocumentTypes,
  IContactFields, EmptyDocumentRequest, DocumentRequest, TextValue
} from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'
import type { LinkedRecordStore } from './types'
import { Schema } from './schema'
// @ts-expect-error js module
import { escape as solrEscape } from '~/services/solr/queries'

export function findEmailInLinkedRecords (email: string | undefined, linkedRecords: LinkedRecordStore): string | undefined {
  if (typeof email !== 'string') return undefined
  const match = linkedRecords.find((rec: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
    const { emails } = rec as Record<string, unknown>
    return Array.isArray(emails) && emails.includes(email)
  })
  if (match === undefined) return undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
  const { header: h } = match as unknown as Record<string, { identifier?: string }>
  return h?.identifier
}

export async function resolveExistingContactIds (
  existing: string,
  resolveDocumentIdentifier: (uid: string)=> Promise<string>
): Promise<SubDocument[]> {
  const ids = await Promise.all(
    existing.split(',').map(async uid => await resolveDocumentIdentifier(uid.trim()))
  )
  return ids.map(identifier => ({ identifier }))
}

export async function findExistingContactByEmail (
  email: string | undefined,
  governmentRaw: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- SolrApi is a JS module with no type declarations
  solrApi: any
): Promise<string | undefined> {
  if (Schema.isEmpty(email) || Schema.isEmpty(governmentRaw)) return undefined
  const governmentIso = await Schema.resolveCountryIso(governmentRaw)
  if (governmentIso === undefined) return undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- solrEscape is a JS function
  const escapedEmail: unknown = solrEscape(email)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- solrEscape is a JS function
  const escapedGov: unknown = solrEscape(governmentIso)
  if (typeof escapedEmail !== 'string' || typeof escapedGov !== 'string') return undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-type-assertion -- SolrApi is a JS module
  const data = await (solrApi.query({
    query: `schema_s:contact AND text_EN_txt:"${escapedEmail}" AND government_s:${escapedGov}`,
    fields: 'identifier_s'
  })) as { response: { docs: Array<{ identifier_s?: string }> } }
  return data.response.docs[0]?.identifier_s
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
    resolveDocumentIdentifier: (uid: string)=> Promise<string>
  }
): Promise<SubDocument[]> {
  if (contact === undefined) return []

  const { existing } = contact
  if (typeof existing === 'string' && existing.trim().length > 0) {
    return await resolveExistingContactIds(existing, opts.resolveDocumentIdentifier)
  }

  const email = contact.email ?? undefined
  const linkedId = findEmailInLinkedRecords(email, linkedRecords)
  if (linkedId !== undefined) return [{ identifier: linkedId }]

  const solrIdentifier = await findExistingContactByEmail(email, opts.countryIso, opts.solrApi)
  if (solrIdentifier !== undefined) return [{ identifier: solrIdentifier }]

  const doc = await buildContactDocument(contact, {
    language: opts.language,
    countryIso: opts.countryIso,
    getLocaleValue: opts.getLocaleValue
  })
  linkedRecords.push(doc)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SupportingDocument has dynamic shape at runtime
  const { header: h } = doc as unknown as Record<string, { identifier?: string }>
  return [{ identifier: h?.identifier ?? '' }]
}
