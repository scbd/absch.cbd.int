import KmDocumentApi from '../../../../../api/km-document'

import type {
  LanguageCode,
  ELink, Keywords,
  ApiDocumentType
} from './types'
import {
  type LanguagesType, languages, englishLanguages,
} from '~/app-data/un-languages'
import type { DocumentAttributesMap } from '../../../utilities/xlsx-file-to-document-attributes/types'

const kmDocumentApi = new KmDocumentApi()

export default class Schema {
  language: LanguageCode = 'en' // Default
  documentAttributes: DocumentAttributesMap
  documentNumber: number = 1
  keywordsMap = []

  constructor (documentAttrs: DocumentAttributesMap, keywordsMap) {
    this.documentAttributes = documentAttrs
    this.language = Schema.getLanguageCode(this.documentAttributes.language as string)
    this.keywordsMap = keywordsMap
  }

  static getAsHtmlElement (value: string): string {
    if (String(value).trim() === '') { return '' }

    return `<div>${value}</div>`
  }

  static getLanguageCode (langValue: string): LanguageCode {
    const lang: string = `${String(langValue).toLowerCase()}`
    const languageMap = [...Object.entries(languages), ...Object.entries(englishLanguages)]

    const langKey = languageMap
      .find(entry => entry[1].toLowerCase() === lang.toLowerCase())

    if (!langKey) { return null }

    return langKey[0] as LanguageCode
  }

  static getUsageMapping (usage: string): string {
    // TODO: Possibly move to API call to avoid magic strings
    const usageMapping = {
      commercial: '5E833A3F-87D1-4ADD-8701-9F1B76383017',
      noncommercial: '60EA2F49-A9DD-406F-921A-8A1C9AA8DFDD'
    }

    if (Schema.getIsConfidential(usage)) { return undefined }
    return usageMapping[usage.replace('-', '')]
  }

  static getELinkData (value: string): Array<ELink> {
    if (value === '') { return [] }
    const links: Array<string> = value.split(',')
    return links.map((url: string) => ({ url }))
  }

  getKeywords (keywordsValue: string): Keywords {
    // TODO: Handle errors
    const keywords = keywordsValue.trim().split(',')

    const processedKeywords = []
    let otherKeywords = ''

    keywords.forEach((keywordVal: string) => {
      const keywordValue = keywordVal.toLowerCase().trim()
      if (keywordValue === '') { return }

      // TODO Improve keyword mapping
      const keyword = this.keywordsMap
        .find((keyword) => {
          if (keyword.identifier === keywordVal.trim()) { return true }

          const name = keyword.title === 'object' ? keyword.title[this.language] : keyword.name
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
    return { processedKeywords: Promise.all(processedKeywords), otherKeywords }
  }

  // TODO: Store this request to avoid repeatedly making a request for the same document type
  static async getDocumentIdentifierByUid (uniqueId: string): Promise<string> {
    // TODO: Handle errors
    const uid = String(uniqueId).trim().match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)

    if (uid === null) {
      const error = 'getDocumentIdentifierByUid: No valid uid provided.'
      console.warn(error)
      return error
    }

    const data = await kmDocumentApi.getDocument(uid[4] || '')
    if (!data) {
      const error = `getDocumentIdentifierByUid: No valid document found or uid: ${uid}`
      console.warn(error)
      return error
    }

    return data.header.identifier + '@' + uid[5]
  }

  static generateUID () {
    const S4 = (): string => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (`SIMP-${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`).toUpperCase()
  }

  static async findOrCreateContact (contacts: string) {
    if ((contacts).trim() !== '') {
      const existingContacts = contacts.split(',')

      return existingContacts
        .map(async (contactUid) => ({ identifier: await Schema.getDocumentIdentifierByUid(contactUid) }))
    }

    const contact = {
      identifier: Schema.generateUID()
    }
    return [contact]
  }

  // In case the date format is not correct in the XLSX sheet
  // attempt to parse the date inorder to still get a date as a backup
  static parseDate (dateValue: string): string {
    const date:Date = new Date(Date.parse(`${dateValue} GMT-05:00`))
    const options :Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const dateFormat = 'fr-CA'

    return date.toLocaleDateString(dateFormat, options)
  }

  static getIsConfidential (value: string): boolean {
    return value === 'confidential'
  }

  static parseTextToBoolean (columnValue: string | undefined) {
    return String(columnValue).toLowerCase() === 'yes'
  }

  async parseXLSXFileToDocumentJson () :Promise<ApiDocumentType> {
    return { header: { identifier: '' } }
  }
}
