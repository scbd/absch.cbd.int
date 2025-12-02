// @ts-ignore
import KmDocumentApi from '../../../../../api/km-document'
import { DocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import { 
  KeywordType, ELink, UsageKey,
  DocumentRequest, Keywords,
  SubDocument, UsageMapping
} from '~/types/common/documents'

import {
  languages, englishLanguages
} from '~/app-data/un-languages'
import { LanguageCode } from '~/types/languages'
import { StandardError } from '~/types/errors'
import { THESAURUS_TERMS } from '~/constants/thesaurus' 

const kmDocumentApi = new KmDocumentApi()

export default class Schema {
  language: LanguageCode = 'en' // Default
  documentAttributes: DocumentAttributes
  documentNumber: number = 1
  keywordsMap: Array<KeywordType> = []

  constructor (documentAttrs: DocumentAttributes, keywordsMap: Array<KeywordType>) {
    this.documentAttributes = documentAttrs
    this.language = Schema.getLanguageCode(this.documentAttributes['language'] as string)
    this.keywordsMap = keywordsMap
  }

  /**
  * Wrap string from excel sheet in a div.
  */
  static getAsHtmlElement (value: string): string {
    if (String(value).trim() === '') { return '' }

    return `<div>${value}</div>`
  }

  /**
  * Map language from human-readable string in the excel sheet to a language code.
  */
  static getLanguageCode (langValue: string): LanguageCode {
    const lang: string = `${String(langValue).toLowerCase()}`
    const languageMap = [...Object.entries(languages), ...Object.entries(englishLanguages)]

    const langKey = languageMap
      .find(entry => entry[1].toLowerCase() === lang.toLowerCase())

    if (!langKey) { return 'en' }

    return langKey[0] as LanguageCode
  }

  /**
  * Get GUID for usage map from usage map document attribute string.
  */
  static getUsageMapping (usage: string): string {
    if (Schema.getIsConfidential(usage)) { return '' }
    const usageMapping :UsageMapping = THESAURUS_TERMS
    return usageMapping[usage.replace('-', '').toUpperCase() as UsageKey]
  }

  static getELinkData (value: string): Array<ELink> {
    if (!value || value === '') { return [] }
    const links: Array<string> = value.split(',')
    return links.map((url: string) => ({ url }))
  }

  /**
  * Map all keywords from their description in the excel sheet to
  * a GUID determined by a keywords list.
  */
  getKeywords (keywordsValue: string): Keywords {
    if (!keywordsValue || keywordsValue === '') {
      return { processedKeywords: [], otherKeywords: '' }
    }

    const keywords = keywordsValue.trim().split(',')

    const processedKeywords :Array<SubDocument> = []
    let otherKeywords = ''

    keywords.forEach((keywordVal: string) => {
      const keywordValue = keywordVal.toLowerCase().trim()
      if (keywordValue === '') { return }

      // TODO: Improve keyword mapping
      const keyword = this.keywordsMap
        .find((keyword) => {
          if (keyword.identifier === keywordVal.trim()) { return true }

          const name = typeof keyword.title === 'object'
            ? keyword.title[this.language]
            : keyword.name
          return name.toLowerCase().trim() === keywordValue
        })

      if (keyword) {
        return processedKeywords.push({ identifier: keyword.identifier.toUpperCase() })
      }

      // TODO: Fix magic string. Find out how to generate this string
      processedKeywords
        .push({ identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' })
      otherKeywords += ` ${keywordVal}`
    })

    return { processedKeywords, otherKeywords }
  }

  /**
  * Fetch a document it's GUID from our servers and return it's identifier.
  * TODO: Store this request to avoid repeatedly making a request for the same document type.
  */
  async getDocumentIdentifierByGUID (uniqueId: string): Promise<string> {
    const uid = String(uniqueId).trim().match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)

    const [currentColumn, currentValue] = Object.entries(this.documentAttributes)
      .find((entry) => entry[1] === uniqueId) || []

    const error = {
      reason: 'cannotFindRelevantDocumentError',
      column: currentColumn,
      value: currentValue,
      level: 'error'
    }
    if (uid === null) {
      throw error
    }

    const data = await kmDocumentApi.getDocument(uid[4] || '')
      .catch((serverError: StandardError) => {
        console.warn(serverError)
        throw error
      })

    return data.header.identifier + '@' + uid[5]
  }

  /**
  * Generate a GUID using the Math.random function.
  */
  static generateGUID () {
    const S4 = (): string => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (`SIMP-${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`).toUpperCase()
  }

  /**
  * Find a contact by its GUID or create a GUID for the new contact.
  */
  async findOrCreateContact (contacts: string) {
    if (!!contacts && (contacts).trim() !== '') {
      const existingContacts = contacts.split(',')

      return existingContacts
        .map(async (contactUid) => ({ identifier: await this.getDocumentIdentifierByGUID(contactUid) }))
    }

    const contact = {
      identifier: Schema.generateGUID()
    }
    return [contact]
  }

  /**
  * Covert Date to correct time zone.
  * In case the date format is not correct in the XLSX sheet
  * attempt to parse the date in order to still get a date as a backup.
  */
  static parseDate (dateValue: string | Date): string {
    if (!dateValue) { return '' }
    const dateString = typeof dateValue === 'string' ? dateValue : dateValue.toUTCString()
    const date:Date = new Date(Date.parse(`${dateString} GMT-05:00`))
    const options :Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const dateFormat = 'fr-CA'

    return date.toLocaleDateString(dateFormat, options)
  }

  /**
  * Map confidential string from excel sheet to a boolean.
  */
  static getIsConfidential (value: string): boolean {
    return (value || '').toLowerCase() === 'confidential'
  }

  /**
  * Map yes or no string from excel sheet to a boolean.
  */
  static parseTextToBoolean (columnValue: string | undefined) {
    return String(columnValue).toLowerCase() === 'yes'
  }

  /**
  * Parse the string document attributes taken from the excel sheet to
  * document JSON used to create a document draft in our system.
  * To be overridden by the document schema class extending this class.
  */
  async parseXLSXFileToDocumentJson () :Promise<DocumentRequest> {
    return { header: { identifier: '' } }
  }
}
