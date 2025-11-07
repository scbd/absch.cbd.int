import type { LanguageCode, LanguageType } from '../../../mappings/types'
import type { SubjectMatter, FileReference } from './types'
import type { AttributeValue, IContactFields, IIRCCDocumentAttributes } from '../../../utilities/xlsx-file-to-document-attributes/types'

import languageMapping from '../../../mappings/languageMapping'

export default class Schema {
  language: LanguageCode = 'en'
  xlsxFileData: IIRCCDocumentAttributes
  documentNumber: number = 1

  constructor (xlsxData: IIRCCDocumentAttributes) {
    this.xlsxFileData = xlsxData
  }

  getSubjectMatter (subjectMatter: AttributeValue): SubjectMatter {
    if (String(subjectMatter).trim() === '') { return { [this.language]: '' } as SubjectMatter }

    return {
      [this.language]: `<div>${subjectMatter} </div>`,
    } as SubjectMatter
  }

  static getLanguageCode (langValue: AttributeValue): LanguageCode {
    const lang: string = String(langValue).toLowerCase()
    return languageMapping[lang as LanguageType]
  }

  static getDocumentIdentifierByUid (col: AttributeValue): AttributeValue {
    // TODO: Implement
    return col
  }

  static getDocumentIdentifier (document: IContactFields): string {
    // TODO: Implement
    return document.email
  }

  static parseDate (col: string): string {
    // TODO: Implement
    return col
  }

  static getProviderIdentifier (provider: IContactFields): string {
    // TODO: Implement
    return provider.type
  }

  static getIsConfidential (subDocument: IContactFields): boolean {
    const providerType: string = subDocument.type
    return providerType === 'confidential'
  }
  static parseTextToBoolean(columnValue: AttributeValue) {
    return String(columnValue).toLowerCase() === 'yes'
  }

  parseFileReference (reference: AttributeValue): FileReference {
    return {
      url: reference || '',
      name: reference || '',
      [this.language]: reference 'en'
    } as FileReference
  }
}
