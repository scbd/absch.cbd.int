import type {
  RawRow, LinkedRecordStore, TokenReader, SchemaInstance
} from './types'
import { KmDraftsApi } from '~/api/km-document'
import type {
  DocumentRequest, EmptyDocumentRequest, DocumentValue,
  TextValue, SubDocument, ELink, UsageKey, SupportingDocument,
  SubDocumentTypes, IContactFields
} from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'
import { languages, englishLanguages } from '~/app-data/un-languages'
import { THESAURUS_TERMS } from '~/constants/thesaurus'
// @ts-expect-error js module
import { getCountries } from '~/api/countries'

interface CountryRecord { code: string; name: Partial<Record<LanguageCode, string>> }

export interface KeywordType {
  name: string
  title: Partial<Record<LanguageCode, string>>
  identifier: string
}

export interface Keywords {
  processedKeywords: SubDocument[]
  otherKeywords: string
}

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

  // todo move to schema, this is specific to IRCC
  static getIsConfidential (value: string | undefined | null): boolean {
    if (typeof value !== 'string') return true
    return value.toLowerCase() === 'confidential'
  }

  static parseTextToBoolean (value: string | undefined | null): boolean {
    return String(value).toLowerCase() === 'yes'
  }

  // todo move to schema, this is specific to IRCC
  static getUsageMapping (usage: string | undefined): string {
    if (Schema.isEmpty(usage)) return ''
    if (Schema.getIsConfidential(usage)) return ''
    const key = usage.replace('-', '').toUpperCase()
    const usageKey: UsageKey = (key === 'NONCOMMERCIAL' || key === 'COMMERCIAL') ? key : 'NONCOMMERCIAL'
    return THESAURUS_TERMS[usageKey]
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

  getKeywords (keywordsValue: string | undefined, keywordsMap: KeywordType[]): Keywords {
    // match keywords to thesaurus terms, and return any unmatched keywords as a string
    if (Schema.isEmpty(keywordsValue)) return { processedKeywords: [], otherKeywords: '' }

    const processedKeywords: SubDocument[] = []
    let otherKeywords = ''

    for (const raw of keywordsValue.trim().split(',')) {
      const val = raw.toLowerCase().trim()
      if (val === '') continue

      const match = keywordsMap.find(kw => {
        if (kw.identifier === raw.trim()) return true
        const name = typeof kw.title === 'object' ? kw.title[this.language] : kw.name
        return String(name).toLowerCase().trim() === val
      })

      if (match === undefined) {
        processedKeywords.push({ identifier: THESAURUS_TERMS.ABS_OTHER_KEYWORD })
        otherKeywords += ` ${raw}`
      } else {
        processedKeywords.push({ identifier: match.identifier.toUpperCase() })
      }
    }

    return { processedKeywords, otherKeywords }
  }

  async getContactSchema (contact: SupportingDocument<SubDocumentTypes> | undefined): Promise<SupportingDocument<SubDocumentTypes>> {
    if (contact === undefined) return {}
    const contactFields = contact
    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateId(),
        schema: 'contact',
        languages: [this.language]
      },
      type: contactFields.type,
      government: Schema.toETerm(await Schema.resolveCountryIso(this.columnValue('country'))),
      country: Schema.toETerm(await Schema.resolveCountryIso(contactFields.country ?? undefined)),
      city: this.getLocaleValue(contactFields.city),
      address: this.getLocaleValue(contactFields.address),
      emails: typeof contactFields.email === 'string' ? [contactFields.email] : undefined
    }

    if (contactFields.type === 'organization') {
      data['organization'] = this.getLocaleValue(contactFields.orgName)
      data['organizationAcronym'] = this.getLocaleValue(contactFields.acronym)
    } else {
      data['type'] = 'person'
      data['firstName'] = (contactFields.orgName ?? '').trim()
      data['lastName'] = (contactFields.acronym ?? '').trim()
    }

    return Schema.removeEmptyValues(data)
  }

  async findContactOrCreate (
    contact: SupportingDocument<IContactFields> | undefined
  ): Promise<SubDocument[]> {
    if (contact === undefined) return []

    const { existing } = contact
    if (typeof existing === 'string' && existing.trim().length > 0) {
      const hasContactInfo = (['orgName', 'acronym', 'address', 'city', 'country', 'email', 'type', 'consent'] as const)
        .some(field => !Schema.isEmpty(contact[field]))
      if (hasContactInfo) {
        throw new Error('Provide either an existing contact ID or contact details, not both')
      }
      const ids = await Promise.all(
        existing.split(',').map(async uid => await this.resolveDocumentIdentifier(uid.trim()))
      )
      return ids.map(identifier => ({ identifier }))
    }

    const schema = await this.getContactSchema(contact)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SupportingDocument has dynamic shape at runtime
    const { header: _h, ...body } = schema as unknown as Record<string, unknown>
    const existing_ = this.linkedRecords.find(rec => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
      const { header: _h2, ...b } = rec as unknown as Record<string, unknown>
      return JSON.stringify(b) === JSON.stringify(body)
    })

    if (existing_ !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have dynamic shape
      const { header: h } = existing_ as unknown as Record<string, { identifier?: string }>
      return [{ identifier: h?.identifier ?? '' }]
    }

    this.linkedRecords.push(schema)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SupportingDocument has dynamic shape at runtime
    const { header: h } = schema as unknown as Record<string, { identifier?: string }>
    return [{ identifier: h?.identifier ?? '' }]
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
