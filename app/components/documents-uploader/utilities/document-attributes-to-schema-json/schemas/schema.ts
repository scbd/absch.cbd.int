import type {
  DocError, DocumentAttributes,
  DocValue, AttrTypes,
  GridValue
} from '~/types/components/documents-uploader/document-schema'
import type {
  KeywordType, ELink, UsageKey, SupportingDocument,
  Keywords, DocumentValue, SubDocumentTypes,
  SubDocument, EmptyDocumentRequest, IContactFields, SubDocumentStore,
  TextValue, EmptyDocumentValue, DocumentRequest
} from '~/types/common/documents'
// @ts-expect-error importing js file
import KmDocumentApi from '../../../../../api/km-document'
import {
  languages, englishLanguages
} from '~/app-data/un-languages'
import type { LanguageCode } from '~/types/languages'
import { THESAURUS_TERMS } from '~/constants/thesaurus'

const kmDocumentApi = new KmDocumentApi()

export default class Schema {
  language: LanguageCode = 'en' // Default
  documentAttributes: DocumentAttributes<AttrTypes>
  subDocumentStore: SubDocumentStore
  keywordsMap: KeywordType[] = []
  constructor (documentAttrs: DocumentAttributes<AttrTypes>, keywordsMap: KeywordType[], subDocumentStore: SubDocumentStore) {
    this.documentAttributes = documentAttrs
    this.language = Schema.getLanguageCode(this.documentAttributes.language)
    this.keywordsMap = keywordsMap
    this.subDocumentStore = subDocumentStore
  }

  /**
  * Wrap string from excel sheet in a div.
  */
  static getAsHtmlElement (value: string | undefined): string {
    if (typeof value !== 'string') { return '' }
    if (value.trim() === '') { return '' }
    return `<div>${value}</div>`
  }

  /**
  * Map language from human-readable string in the excel sheet to a language code.
  */
  static getLanguageCode (langValue: string): LanguageCode {
    const getKeys = Object.keys as <T extends object>(obj: T)=> Array<keyof T>

    let langKey = getKeys(englishLanguages)
      .find(key => englishLanguages[key].toLowerCase() === langValue.toLowerCase())
    if (typeof langKey === 'string') { return langKey }

    langKey = getKeys(languages)
      .find(key => languages[key].toLowerCase() === langValue.toLowerCase())
    if (typeof langKey === 'string') { return langKey }

    return 'en'
  }

  /**
  * Check if attribute value is empty null, undefined, empty Array, or empty string.
  */
  static isEmpty (value: EmptyDocumentValue | GridValue): value is null | undefined {
    if (Array.isArray(value)) {
      return value.length < 1
    }
    return value === null || value === '' || value === undefined
  }

  /**
  * Get GUID for usage map from usage map document attribute string.
  */
  static getUsageMapping (usage: string | undefined): string {
    if (Schema.isEmpty(usage)) { return '' }
    if (Schema.getIsConfidential(usage)) { return '' }
    const key = usage.replace('-', '').toUpperCase()
    const usageKey: UsageKey = (key === 'NONCOMMERCIAL' || key === 'COMMERCIAL') ? key : 'NONCOMMERCIAL'

    return THESAURUS_TERMS[usageKey]
  }

  static getELinkData (value: string | undefined): ELink[] {
    if (Schema.isEmpty(value)) { return [] }
    const links: string[] = value.split(',')
    return links.map((url: string) => ({ url }))
  }

  /**
  * Map all keywords from their description in the excel sheet to
  * a GUID determined by a keywords list.
  */
  getKeywords (keywordsValue: string | undefined): Keywords {
    if (Schema.isEmpty(keywordsValue)) {
      return { processedKeywords: [], otherKeywords: '' }
    }

    const keywords = keywordsValue.trim().split(',')

    const processedKeywords: SubDocument[] = []
    let otherKeywords = ''

    keywords.forEach((keywordVal: string) => {
      const keywordValue = keywordVal.toLowerCase().trim()
      if (keywordValue === '') { return }

      const keyword = this.keywordsMap
        .find((keyword: KeywordType) => {
          if (keyword.identifier === keywordVal.trim()) { return true }

          const name = typeof keyword.title === 'object'
            ? keyword.title[this.language]
            : keyword.name

          return String(name).toLowerCase().trim() === keywordValue
        })

      if (typeof keyword === 'object') {
        return processedKeywords.push({ identifier: keyword.identifier.toUpperCase() })
      }

      processedKeywords
        .push({ identifier: THESAURUS_TERMS.ABS_OTHER_KEYWORD })
      otherKeywords += ` ${keywordVal}`
    })

    return { processedKeywords, otherKeywords }
  }

  /**
  * Fetch a document it's GUID from our servers and return it's identifier.
  * TODO: Store this request to avoid repeatedly making a request for the same document type.
  */
  async getDocumentIdentifierByGUID (uniqueId: string | undefined): Promise<string> {
    if (uniqueId === undefined) { return '' }
    const regExp = /^(?<p1>[a-z]+)-(?<p2>[a-z]+)-(?<p3>[a-z]+)-(?<p4>\d+)-(?<p5>\d+)$/i
    const documentUIDOffset = 4
    const uid = regExp.exec(uniqueId.trim())

    const entry: [string, DocValue | IContactFields | undefined] | undefined = Object.entries(this.documentAttributes)
      .find(([_key, value]) => value === uniqueId)

    const [currentColumn, currentValue] = Array.isArray(entry) ? entry : []

    const value = typeof currentValue === 'string' ? currentValue : ''

    const error: DocError = {
      reason: 'cannotFindRelevantDocumentError',
      column: currentColumn,
      value,
      level: 'warning',
      message: 'warning',
      name: 'cannotFindRelevantDocumentError'
    }

    if (uid === null) {
      console.warn('Error: Uid value not provided') // eslint-disable-line no-console -- Show error in console
      return ''
    }

    const documentId = typeof uid[documentUIDOffset] === 'string' ? uid[documentUIDOffset] : ''
    const data = await kmDocumentApi.getDocument(documentId)
      .catch((serverError: unknown) => {
        console.warn(serverError) // eslint-disable-line no-console -- Show error in console
        throw error
      })

    if (typeof data !== 'object' || data === null) {
      throw error
    }
    const finalUidSectionIndex = 5
    return data.header.identifier + '@' + uid[finalUidSectionIndex]
  }

  /**
  * Generate return Object containing string wrapped in an HTML element with the language code as the key.
  * to be stored in our system.
  */
  static removeEmptyValues (data: EmptyDocumentRequest): DocumentRequest {
    const documentRequest: Record<string, DocumentValue> = { header: { identifier: '' } }
    Object.entries(data).forEach(([key, value]) => {
      if (!Schema.isEmpty(value)) {
        documentRequest[key] = value
      }
    })
    return documentRequest
  }

  /**
  * Generate return Object containing string wrapped in an HTML element with the language code as the key.
  * to be stored in our system.
  */
  getLocaleElement (value: string | undefined): TextValue | undefined {
    if (typeof value !== 'string') { return undefined }
    return { [this.language]: Schema.getAsHtmlElement(value.trim()) }
  }

  /**
  * Generate return Object containing string with the language code as the key.
  * to be stored in our system.
  */
  getLocaleValue (value: string | undefined | null): TextValue | undefined {
    if (typeof value !== 'string') { return undefined }
    return { [this.language]: value.trim() }
  }

  /**
  * Generate a SubDocument Object with a given identifier.
  */
  static getSubDocument (identifier: string | undefined): SubDocument | undefined {
    if (typeof identifier !== 'string') {
      return undefined
    }
    return { identifier }
  }

  /**
  * Generate a GUID using the Math.random function.
  */
  static generateGUID (): string {
    const bitCount = 16
    const subStringCount = 1
    const hexOffset = 0x10000
    const bitWiseOrValue = 0
    const S4 = (): string => (((subStringCount + Math.random()) * hexOffset) | bitWiseOrValue)
      .toString(bitCount)
      .substring(subStringCount)
    return (`SIMP-${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`).toUpperCase()
  }

  /**
  * Find a contact by its GUID or create a GUID for the new contact.
  */
  async findContactOrGenerateId (data: IContactFields | undefined | null): Promise<SubDocument[]> {
    if (data === undefined || data === null) { return [] }
    const { existing } = data

    // If the spreadsheet contains an identifier for an existing contact.
    if (typeof existing === 'string' && existing.trim().length > 0) {
      const existingContacts = existing.split(',')
      const createContactPromises = existingContacts
        .map(async (contactUid: string) => await this.getDocumentIdentifierByGUID(contactUid))

      const fetchedContacts = await Promise.all(createContactPromises)

      const subDocuments: SubDocument[] = fetchedContacts
        .filter(identifier => typeof identifier === 'string')
        .map(identifier => ({ identifier }))

      return subDocuments
    }

    const contactSchema = this.getContactSchema(data)

    // If the spreadsheet contains multiple of the same contact
    // and we have already generated data for that contact
    // don't re-create the contact to avoid creating duplicate db entries.
    const { header: _header, ...schema } = contactSchema
    const subDocument = this.subDocumentStore.find(subDoc => {
      const { header: _header, ...doc } = subDoc
      return JSON.stringify(doc) === JSON.stringify(schema)
    })
    const subDocumentExists = typeof subDocument === 'object'
    if (subDocumentExists) {
      return [{ identifier: subDocument.header?.identifier ?? '' }]
    }

    this.subDocumentStore.push(contactSchema)
    // If no existing contact can be found
    return [{ identifier: contactSchema.header?.identifier ?? '' }]
  }

  /**
  * Covert Date to correct time zone.
  * In case the date format is not correct in the XLSX sheet
  * attempt to parse the date in order to still get a date as a backup.
  */
  static parseDate (dateValue: string | Date | undefined | null): string {
    if (dateValue === null || dateValue === undefined) { return '' }
    const dateString = typeof dateValue === 'string' ? dateValue : dateValue.toUTCString()
    const date: Date = new Date(Date.parse(`${dateString} GMT-05:00`))
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const dateFormat = 'fr-CA'

    return date.toLocaleDateString(dateFormat, options)
  }

  /**
  * Get the schema object for a contact linked to the document, such as a PIC or provider.
  */
  getContactSchema (contact: SupportingDocument<SubDocumentTypes> | undefined): SupportingDocument<SubDocumentTypes> {
    if (contact === undefined) { return {} }
    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateGUID(),
        schema: 'contact',
        languages: [
          this.language
        ]
      },
      type: contact.type,
      government: Schema.getSubDocument(this.documentAttributes.country?.toLowerCase()),
      country: Schema.getSubDocument(this.documentAttributes.country?.toLowerCase()),
      city: this.getLocaleValue(contact.city),
      address: this.getLocaleValue(contact.address),
      emails: typeof contact.email === 'string' ? [contact.email] : undefined
    }

    if (contact.type === 'organization') {
      data['organization'] = this.getLocaleValue(contact.orgName)
      data['organizationAcronym'] = this.getLocaleValue(contact.acronym)
    } else {
      data['type'] = 'person'
      data['firstName'] = (contact.orgName ?? '').trim()
      data['lastName'] = (contact.acronym ?? '').trim()
    }

    return Schema.removeEmptyValues(data)
  }

  /**
  * Map confidential string from excel sheet to a boolean.
  */
  static getIsConfidential (value: string | undefined | null): boolean {
    if (typeof value !== 'string') { return true }
    return value.toLowerCase() === 'confidential'
  }

  /**
  * Map yes or no string from excel sheet to a boolean.
  */
  static parseTextToBoolean (columnValue: string | undefined | null): boolean {
    return String(columnValue).toLowerCase() === 'yes'
  }

  async parseXLSXFileToDocumentJson (): Promise<DocumentRequest> {
    const identifier = await this.getDocumentIdentifierByGUID(Schema.generateGUID())
    return { header: { identifier } }
  }
}
