import type { LanguageCode, LanguageType } from '../../../mappings/types'
import type { SubjectMatter, FileReference } from './types'

import languageMapping from '../../../mappings/languageMapping'

export default class Schema {
  language: LanguageCode = 'en'
  xlsxFileData: IFileData = { X: { w: '' } }
  documentNumber: number = 1

  constructor (xlsxData: IFileData) {
    this.xlsxFileData = xlsxData
  }

  getSubjectMatter (subjectMatter: string): SubjectMatter {
    if (subjectMatter.trim() === '') { return { [this.language]: '' } as SubjectMatter }

    return {
      [this.language]: `<div>${subjectMatter} </div>`,
    } as SubjectMatter
  }

  getLanguageCode (langValue: string): LanguageCode {
    const lang: string = langValue.toLowerCase()
    return languageMapping[lang as LanguageType]
  }

  getDocumentIdentifierByUid (col: string): string {
    // TODO: Implement
    return col
  }

  getDocumentIdentifier (document: IContactFields): string {
    // TODO: Implement
    return document.email
  }

  parseDate (col: string): string {
    // TODO: Implement
    return col
  }

  getProviderIdentifier (provider: IContactFields): string {
    // TODO: Implement
    return provider.type
  }

  getIsConfidential (providerType: string): boolean {
    return providerType === 'confidential'
  }

  parseFileReference (col: string): FileReference {
    return {
      url: this.xlsxFileData[col] || '',
      name: this.xlsxFileData[col] || '',
      [this.language]: this.xlsxFileData[col] || 'en'
    } as FileReference
  }
}
