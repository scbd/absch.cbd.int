import * as XLSX from 'xlsx'
import type {
  DocumentAttributesMap,
  IFileData
} from './types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'

function getColumnValue (sheet: XLSX.WorkSheet | IFileData, col: string, documentNumber: number): string {
  const location = `${col}${documentNumber + 2}`
  return (sheet[location] || {}).w || ''
}

export function mapXLSXFileToAttributeNames (documentMap: DocumentAttributesMap, sheet: XLSX.WorkSheet | IFileData): DocumentAttributesMap {
  const documentNumber :number = 1

  const getColumnString = (value: string | undefined): string => {
    if (typeof value === 'string') {
      return getColumnValue(sheet, value, documentNumber) as string
    }
    return 'Column not readable'
  }

  const mapColumnToDocumentAttribute = (attributesMap: DocumentAttributesMap): DocumentAttributesMap => {
    const map = { language: '' } as DocumentAttributesMap
    Object.entries(attributesMap).forEach(([key, value]) => {
      if (typeof value === 'object') {
        map[key] = mapColumnToDocumentAttribute(value)
        return
      }
      map[key] = getColumnString(value)
    })

    return map
  }

  return mapColumnToDocumentAttribute(documentMap)
}

export default function mapXLSXFileToDocumentAttributes (documentType: DocumentTypes, sheet: XLSX.WorkSheet | Array<string>): DocumentAttributesMap {
  console.log('documentType', documentType)
  console.log('documentType', documentsList[documentType])

  const documentAttributesMap = documentsList[documentType]?.attributesMap
  console.log('documentsList[documentType]', documentsList[documentType]?.attributesMap)
  console.log('documentsList[documentType]', documentsList[documentType]?.ApiSchema)

  console.log('documentsList', documentsList)

  console.log('documentAttributesMap', documentAttributesMap?.language)


  if (documentAttributesMap === undefined) { return {} }

  return mapXLSXFileToAttributeNames(documentAttributesMap as DocumentAttributesMap, sheet)
}
