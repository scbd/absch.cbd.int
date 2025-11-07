import documentMapIRCC from './maps/ircc-document.json'
import type { WorkSheet } from 'xlsx'
import type {
  IIRCCDocumentAttributes, IContactFields, AttributeValue,
  IIRCCDocumentMap, DocumentKeys,
  IFileData
} from './types'
import type { DocumentType } from '../../types'

type DocumentMapsList = {
  ircc: IIRCCDocumentMap;
}

function getColumnValue (sheet: WorkSheet | IFileData, col: string, documentNumber: number): AttributeValue {
  const location = `${col}${documentNumber + 2}`
  return (sheet[location] || {}).w || ''
}

export function mapXLSXFileToAttributeNames (documentMap: IIRCCDocumentMap, sheet: WorkSheet | IFileData): IIRCCDocumentAttributes {
  const documentNumber :number = 1

  const mapKeyToColumn = (map: IContactFields | IIRCCDocumentAttributes): IIRCCDocumentAttributes => {
    const mappedObject: IIRCCDocumentAttributes = documentMap as IIRCCDocumentAttributes
    Object.entries(map).forEach(([k, value]) => {
      const key: DocumentKeys = k as DocumentKeys
      if (typeof value === 'string') {
        mappedObject[key] = getColumnValue(sheet, value, documentNumber)
        return
      }
      if (typeof value === 'object') {
        mappedObject[key] = mapKeyToColumn(value)
      }
    })
    return mappedObject
  }

  return mapKeyToColumn(documentMap as IIRCCDocumentAttributes)
}

export default function mapXLSXFileToDocumentAttributes (documentType: DocumentType, sheet: WorkSheet | Array<string>): IIRCCDocumentAttributes {
  const documentMapsList: DocumentMapsList = {
    ircc: documentMapIRCC
  }

  const documentMap = documentMapsList[documentType]

  return mapXLSXFileToAttributeNames(documentMap, sheet)
}
