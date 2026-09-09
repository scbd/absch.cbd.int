import SolrApi from '~/api/solr'
import { escape } from '~/services/solr/queries.js'
// @ts-expect-error import js file
import { getCountry } from '~/api/countries'
import type KmDocumentApi from '~/api/km-document'
import { documentIdWithoutRevision } from '~/components/scbd-angularjs-services/services/utilities.js'
import { lstring } from '~/services/filters/lstring.js'

// country.name is an lstring object (e.g. { en: 'India', fr: 'Inde', ... }),
// not a plain string — see app/components/documents-uploader/utilities/import-documents.ts's
// `country.name[this.locale]` for the same shape used elsewhere.
type GetCountry = (code: string)=> Promise<{ name?: unknown }>
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- getCountry is an untyped legacy .js export
const getCountryTyped = getCountry as unknown as GetCountry

const solrApi = new SolrApi()

export async function resolveGovernmentNames (codes: string[], locale: string): Promise<Record<string, string>> {
  const entries = await Promise.all(codes.map(async (code): Promise<[string, string]> => {
    const country = await getCountryTyped(code)
    const name = lstring(country.name, locale)
    return [code, name === '' ? code : name]
  }))
  return Object.fromEntries(entries)
}

const HTTP_NOT_FOUND = 404

function isNotFoundError (error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false
  if ('statusCode' in error && error.statusCode === HTTP_NOT_FOUND) return true
  return 'code' in error && error.code === 'notFound'
}

// Published record first; a workflow's referenced organization may still be
// a draft (not yet published), so fall back to the draft on a 404.
async function fetchOrganizationName (kmDocumentApi: KmDocumentApi, identifier: string, locale: string): Promise<string | undefined> {
  try {
    const doc = await kmDocumentApi.getDocument(identifier)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- getDocument returns unknown; name exists at runtime
    return lstring((doc as { name?: unknown }).name, locale)
  } catch (error) {
    if (!isNotFoundError(error)) throw error
  }

  try {
    const draft = await kmDocumentApi.getDocumentDraft(identifier)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- getDocumentDraft returns unknown; name exists at runtime
    return lstring((draft as { name?: unknown }).name, locale)
  } catch (error) {
    if (!isNotFoundError(error)) throw error
    return undefined
  }
}

export async function resolveOrganizationNames (identifiers: string[], kmDocumentApi: KmDocumentApi, locale: string): Promise<Record<string, string>> {
  const entries = await Promise.all(identifiers.map(async (rawId): Promise<[string, string]> => {
    const id = documentIdWithoutRevision(rawId)
    const name = await fetchOrganizationName(kmDocumentApi, id, locale)
    return [rawId, name === undefined || name === '' ? rawId : name]
  }))
  return Object.fromEntries(entries)
}

export async function resolveNotificationNames (identifiers: string[]): Promise<Record<string, string>> {
  if (identifiers.length === 0) return {}

  const ids = identifiers.map(escape)
  const result = await solrApi.query({
    query: `identifier_s:(${ids.join(' ')}) OR symbol_s:(${ids.join(' ')})`,
    fields: 'identifier_s,symbol_s,title_s'
  })

  const names: Record<string, string> = {}
  for (const doc of result.response?.docs ?? []) {
    const { identifier_s: identifierS, symbol_s: symbolS, title_s: titleS } = doc
    const name = titleS ?? symbolS
    if (name === undefined) continue
    if (identifierS !== undefined) names[identifierS] = name
    if (symbolS !== undefined) names[symbolS] = name
  }
  return names
}
