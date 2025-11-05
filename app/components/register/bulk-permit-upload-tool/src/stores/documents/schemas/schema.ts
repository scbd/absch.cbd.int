import type { LanguageCode, LanguageType } from '../../../mappings/types'
import type {
  IDocumentMap, SubjectMatter, IContactFields,
  IFileData, IMapData, FileReference
} from './types'

import languageMapping from '../../../mappings/languageMapping'
type DocumentKeys = keyof IDocumentMap

export default class Schema {
  language: LanguageCode = 'en'
  xlsxFileData: IFileData = { X: { w: '' } }
  documentNumber: number = 1

  constructor (xlsxData: IFileData) {
    this.xlsxFileData = xlsxData
  }

  getColumnValue (col: string): string {
    const location = `${col}${this.documentNumber + 2}`
    return (this.xlsxFileData[location] || {}).w || ''
  }

  getSubjectMatter (col: string): SubjectMatter {
    const subjectMatter: string = this.getColumnValue(col) || ''

    if (subjectMatter.trim() === '') { return { [this.language]: '' } as SubjectMatter }

    return {
      [this.language]: `<div>${subjectMatter} </div>`,
    } as SubjectMatter
  }

  getLanguageCode (col: string): LanguageCode {
    const langValue: string = this.getColumnValue(col)
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

  getProviderMap (): IContactFields {
    return {
      type: 'G',
      existing: 'H',
      orgName_firstName: 'I',
      acronym_lastName: 'J',
      address: 'K',
      city: 'L',
      country: 'M',
      email: 'N',
    }
  }

  getPICMap (): IContactFields {
    return {
      consent: 'O',
      type: 'P',
      existing: 'Q',
      orgName_firstName: 'R',
      acronym_lastName: 'S',
      address: 'T',
      city: 'U',
      country: 'V',
      email: 'W',
    }
  }

  getDocumentMap (): IDocumentMap {
    return {
      language: 'A',
      title: 'D',
      dateOfIssuance: 'E',
      dateOfExpiry: 'F',
      provider: this.getProviderMap(),
      pic: this.getPICMap(),
      matEstablished: 'X',
      subjectMatter: 'Y',
      keywords: 'Z',
      specimens: 'AA',
      taxonomies: 'AB',
      usage: 'AC',
      usageDescription: 'AD',
      conditionsThirdPartyTransfer: 'AE',
      permitFiles: 'AF',
      additionalInformation: 'AG',
    }
  }

  mapXLSXFileDataToAttributeNames (documentMap: IDocumentMap): IDocumentMap {
    const mapKeyToColumn = (map: IContactFields | IDocumentMap): IDocumentMap => {
      const mappedObject: IDocumentMap = this.getDocumentMap()
      Object.entries(map).forEach(([k, value]) => {
        const key: DocumentKeys = k as DocumentKeys
        if (typeof value === 'string') {
          mappedObject[key] = this.getColumnValue(value)
          return
        }
        if (typeof value === 'object') {
          mappedObject[key] = mapKeyToColumn(value)
        }
      })
      return mappedObject
    }

    return mapKeyToColumn(documentMap)
  }
}
