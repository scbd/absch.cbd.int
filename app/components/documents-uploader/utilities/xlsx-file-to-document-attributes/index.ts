import * as XLSX from 'xlsx'
import type {
  DocumentAttributesMap,
  IFileData, MapParams
} from './types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'

function getColumnValue (sheet: XLSX.WorkSheet | IFileData, col: string, rowNumber: number): string {
  const location = `${col}${rowNumber}`
  return (sheet[location] || {}).w || ''
}

export function mapXLSXFileToAttributeNames ({ documentMap, sheet, rowNumber }: MapParams): DocumentAttributesMap {
  // Get the string value of a cell in the XLSX sheet given a column name and row number.
  const getColumnString = (value: string | undefined): string => {
    if (typeof value === 'string') {
      return getColumnValue(sheet, value, rowNumber) as string
    }
    return 'Column not readable'
  }

  // Iterate over each attribute in the document attribute map.
  // Match the attribute to the string stored in the XLSX sheet. Use the column name paired with the attribute.
  // If the attribute is an object recursively call this function in order to match nested object attributes
  // with the correct string.
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

function isRowEmpty (rowNumber: number, map: DocumentAttributesMap, sheet: XLSX.Sheet) {
  return !Object.values(map)
    .some((col) => {
      if (typeof col === 'object') { return false }
      return getColumnValue(sheet, col as string, rowNumber).length > 0
    })
}

export default function mapXLSXFileToDocumentAttributes (documentType: DocumentTypes, sheet: XLSX.WorkSheet | Array<string>): Array<DocumentAttributesMap> {
  if (!documentType) {
    console.warn('No document type defined')
    return [{}]
  }
  // Get the map between XLSX sheet columns and document attributes
  // matching the current document type.
  const documentMap = documentsList[documentType]?.attributesMap as DocumentAttributesMap

  if (documentMap === undefined) { return [{}] }

  const range = sheet['!ref']
  const headerCount: number = 3
  const rangeEnd = XLSX.utils.decode_range(range).e.r
  const rangeStart = XLSX.utils.decode_range(range).s.r + headerCount

  const documents = []

  // Iterate over each XLSX sheet row and map the data
  // in that row to get a list of document attributes with their names i.e. document.title, etc.
  for (let i = rangeStart; i < rangeEnd; i += 1) {
    if (isRowEmpty(i, documentMap, sheet)) { continue }

    documents.push(mapXLSXFileToAttributeNames({ documentMap, sheet, rowNumber: i }))
  }

  return documents
}
