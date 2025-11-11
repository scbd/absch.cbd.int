import { getDocument } from '../../../api/make-api-request'
import languageMapping from './languageMapping'
import type {
  LanguageCode, LanguageType,
  SubjectMatter, FileReference,
  SubDocument
} from './types'
import type { DocumentAttributesMap } from '../../../utilities/xlsx-file-to-document-attributes/types'

export default class Schema {
  language: LanguageCode = 'en'
  xlsxFileData: DocumentAttributesMap
  documentNumber: number = 1

  constructor (xlsxData: DocumentAttributesMap) {
    this.xlsxFileData = xlsxData
  }

  getSubjectMatter (subjectMatter: string): SubjectMatter {
    if (String(subjectMatter).trim() === '') { return { [this.language]: '' } as SubjectMatter }

    return {
      [this.language]: `<div>${subjectMatter} </div>`,
    } as SubjectMatter
  }

  static getLanguageCode (langValue: string): LanguageCode {
    const lang: string = String(langValue).toLowerCase()
    return languageMapping[lang as LanguageType]
  }

  static async getDocumentIdentifierByUid (uniqueId: string): Promise<string> {
    const uid = String(uniqueId).trim().match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
    console.log('uid', uid)

    if (uid === null) {
      const error = 'getDocumentIdentifierByUid: No valid uid provided.'
      console.warn(error)
      return error
    }

    const { data } = await getDocument(uid[4] || '')
    if (!data) {
      const error = `getDocumentIdentifierByUid: No valid document found or uid: ${uid}`
      console.warn(error)
      return error
    }

    return data.header.identifier + '@' + uid[5]
  }

  static getDocumentIdentifier (document: object): string {
    // TODO: Implement
    return 'document.email'
  }

  static parseDate (dateValue: string): string {
    // TODO: Test to ensure it is correct 
    const date = new Date(Date.parse(dateValue))
    const options :Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateFormat = 'en-US'
    console.log('date.toLocaleDateString(dateFormat, options)', date.toLocaleDateString(dateFormat, options))
    return date.toLocaleDateString(dateFormat, options)
  }

  static getProviderIdentifier (provider: object): string {
    // TODO: Implement
    return 'provider.type'
  }

  static getIsConfidential (subDocument: SubDocument): boolean {
    const providerType: string = String(subDocument.type)
    return providerType === 'confidential'
  }

  static parseTextToBoolean (columnValue: string | undefined) {
    return String(columnValue).toLowerCase() === 'yes'
  }

  parseFileReference (reference: string): FileReference {
    return {
      url: reference || '',
      name: reference || '',
      [this.language]: reference || 'en'
    } as FileReference
  }

  async parseXLSXFileToDocumentJson () {
    return {}
  }
}
