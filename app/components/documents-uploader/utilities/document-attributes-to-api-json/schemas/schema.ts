import KmDocumentApi from "../../../../../api/km-document";
import langMapping from '../data/languageMapping.json'
import keywordMapping from '../data/keywordMapping.json'
import usageMapping from '../data/usageMapping.json'

import type {
  LanguageCode, LanguageType,
  ELink, Keywords, LanguageMapType,
  ApiDocumentType
} from './types'
import type { DocumentAttributesMap } from '../../../utilities/xlsx-file-to-document-attributes/types'

const languageMapping = langMapping as LanguageMapType
const kmDocumentApi = new KmDocumentApi()


export default class Schema {
  language: LanguageCode = 'en' // Default
  documentAttributes: DocumentAttributesMap
  documentNumber: number = 1

  constructor (documentAttrs: DocumentAttributesMap) {
    this.documentAttributes = documentAttrs
    this.language = Schema.getLanguageCode(this.documentAttributes.language as string)
  }

  static getAsHtmlElement (value: string): string {
    if (String(value).trim() === '') { return '' }

    return `<div>${value}</div>`
  }

  static getLanguageCode (langValue: string): LanguageCode {
    const lang: string = String(langValue).toLowerCase()
    return languageMapping[lang as LanguageType]
  }

  static getUsageMapping (usage: string): string {
    if (Schema.getIsConfidential(usage)) { return undefined }
    return usageMapping[usage.replace('-', '')]
  }

  static getELinkData (value: string): Array<ELink> {
    if (value === '') { return [] }
    const links: Array<string> = value.split(',')
    return links.map((url: string) => ({ url }))
  }

  static getKeywords (keywordsValue: string): Keywords {
    const keywords = keywordsValue.trim().split(',')
    return keywords.reduce((acc: Keywords, keyword: string): Keywords => {
      if (keyword.trim() === '') { return acc }

      const mapping = keywordMapping
        .find((map) => map.name.toLowerCase() === keyword.toLowerCase().trim())

      if (mapping) {
        acc.processedKeywords.push({ identifier: mapping.identifier })
        return acc
      }

      acc.processedKeywords
        .push({ identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' }) // TODO Fix magic string. Find out how to generate this string
      acc.otherKeywords += ` ${keyword}`

      return acc
    }, { processedKeywords: [], otherKeywords: '' })
  }

  static async getDocumentIdentifierByUid (uniqueId: string): Promise<string> {
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
