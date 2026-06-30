import type {
  RawRow, LinkedRecordStore, TokenReader, SchemaInstance
} from './types'
import { KmDraftsApi } from '~/api/km-document'
import type {
  DocumentRequest, EmptyDocumentRequest, DocumentValue,
  TextValue, SubDocument, ELink
} from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'
import { languages, englishLanguages } from '~/app-data/un-languages'
// @ts-expect-error js module
import { getCountries } from '~/api/countries'

interface CountryRecord { code: string; name: Partial<Record<LanguageCode, string>> }

export abstract class Schema implements SchemaInstance {
  protected readonly language: LanguageCode
  private static countriesCachePromise: Promise<CountryRecord[]> | undefined = undefined

  constructor (
    protected readonly row: RawRow,
    protected readonly linkedRecords: LinkedRecordStore,
    tokenReader: TokenReader,
    rawLanguage: string
  ) {
    this.language = Schema.getLanguageCode(rawLanguage)
    this.api = new KmDraftsApi({ tokenReader })
  }

  protected readonly api: KmDraftsApi

  abstract buildSchemaDocument (): Promise<DocumentRequest>

  // -------------------------------------------------------------------------
  // Static utilities
  // -------------------------------------------------------------------------

  static generateId (): string {
    return (`SIMP-${crypto.randomUUID()}`).toUpperCase()
  }

  static isEmpty (value: unknown): value is null | undefined {
    if (Array.isArray(value)) return value.length === 0
    return value === null || value === '' || value === undefined
  }

  static toETerm (identifier: string | undefined): SubDocument | undefined {
    if (typeof identifier !== 'string' || identifier.trim() === '') return undefined
    return { identifier }
  }

  static toEReference (identifier: string | undefined): SubDocument | undefined {
    if (typeof identifier !== 'string' || identifier.trim() === '') return undefined
    return { identifier }
  }

  static getELinkData (value: string | undefined): ELink[] {
    if (Schema.isEmpty(value)) return []
    return value.split(',').map(url => ({ url: url.trim() }))
  }

  static getAsHtmlElement (value: string | undefined): string {
    if (typeof value !== 'string' || value.trim() === '') return ''
    return `<div>${value}</div>`
  }

  static getLanguageCode (langValue: string): LanguageCode {
    const getKeys = Object.keys as <T extends object>(obj: T)=> Array<keyof T>

    // Try to match against English names first (e.g. "English" → "en")
    let key = getKeys(englishLanguages).find(
      k => (englishLanguages as Record<string, string>)[k as string]?.toLowerCase() === langValue.toLowerCase()
    )
    if (typeof key === 'string') return key

    // if language is not in english, try to match against native names (e.g. "Français" → "fr")
    key = getKeys(languages).find(
      k => (languages as Record<string, string>)[k as string]?.toLowerCase() === langValue.toLowerCase()
    )
    if (typeof key === 'string') return key

    return 'en'
  }

  static parseDate (dateValue: string | Date | undefined | null): string {
    if (dateValue === null || dateValue === undefined) return ''
    if (dateValue instanceof Date) {
      if (isNaN(dateValue.getTime())) return ''
      // fr-CA gives YYYY-MM-DD which the backend expects; Excel dates are UTC midnight
      return dateValue.toLocaleDateString('fr-CA', {
        year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
      })
    }
    // String: validate it parses as a date, then normalise to YYYY-MM-DD
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('fr-CA', {
      year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
    })
  }

  static parseTextToBoolean (value: string | undefined | null): boolean {
    return String(value).toLowerCase() === 'yes'
  }

  static removeEmptyValues (data: EmptyDocumentRequest): DocumentRequest {
    const result: Record<string, DocumentValue> = { header: { identifier: '' } }
    for (const [key, value] of Object.entries(data)) {
      if (!Schema.isEmpty(value)) result[key] = value
    }
    return result
  }

  // -------------------------------------------------------------------------
  // Instance utilities
  // -------------------------------------------------------------------------

  protected columnValue (key: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- computed key destructuring not recognised by rule
    const { [key]: v } = this.row
    return typeof v === 'string' ? v : undefined
  }

  protected nestedColumnValue (group: string, key: string): string | undefined {
    const nestedKey = `${group}.${key}`
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- computed key destructuring not recognised by rule
    const { [nestedKey]: v } = this.row
    return typeof v === 'string' ? v : undefined
  }

  static async resolveCountryIso (country: string | undefined): Promise<string | undefined> {
    if (typeof country !== 'string' || country.trim() === '') return undefined
    const value = country.trim()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- external API returns unknown shape
    Schema.countriesCachePromise ??= (getCountries as ()=> Promise<unknown>)() as Promise<CountryRecord[]>
    const countries = await Schema.countriesCachePromise
    const match: CountryRecord | undefined = /^[a-z]{2}$/i.test(value)
      ? countries.find((c: CountryRecord) => c.code.toLowerCase() === value.toLowerCase())
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Object.values on Partial<Record> can yield undefined at runtime
      : countries.find((c: CountryRecord) => Object.values(c.name).some(n => n?.toLowerCase() === value.toLowerCase()))
    return match?.code.toLowerCase()
  }

  getLocaleValue (value: string | undefined | null): TextValue | undefined {
    if (typeof value !== 'string') return undefined
    return { [this.language]: value.trim() }
  }

  getTextToHtml (value: string | undefined): TextValue | undefined {
    if (typeof value !== 'string') return undefined
    return { [this.language]: Schema.getAsHtmlElement(value.trim()) }
  }

  protected async resolveDocumentIdentifier (uniqueId: string): Promise<string> {
    const regExp = /^(?<p1>[a-z]+)-(?<p2>[a-z]+)-(?<p3>[a-z]+)-(?<p4>\d+)-(?<p5>\d+)$/i
    const match = regExp.exec(uniqueId)
    if (match?.[4] === undefined || match[5] === undefined) {
      throw new Error(`Invalid existing ID format: "${uniqueId}"`)
    }
    const [,,, , documentId] = match
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- external API returns unknown shape
    const data = await this.api.getDocument(documentId) as Record<string, { identifier: string }> | null
    if (data === null || typeof data !== 'object') {
      throw new Error(`Existing ID "${uniqueId}" could not be found`)
    }
    return `${data['header']?.identifier ?? ''}@${match[5]}`
  }
}
