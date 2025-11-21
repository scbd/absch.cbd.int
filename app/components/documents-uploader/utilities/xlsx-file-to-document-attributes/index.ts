import * as XLSX from 'xlsx'
import type {
  DocumentAttributesMap, DocumentAttributes,
  IFileData, MapParams, AttributeDefinition,
  MapResult, DocumentsMapResult
} from '~/types/components/documents-uploader/xlsx-file-to-document-attributes'
import { documentsList } from '../../data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { DocError } from '~/types/components/documents-uploader/xlsx-file-to-document-attributes'

/**
* Map XLSX File to Document Attriubutes
*
* Map columns in an Excel sheet to named attributes of a given document type.
*/

// Get a string column value for a given row number and column name.
function getColumnValue (sheet: XLSX.WorkSheet | IFileData, col: string, rowNumber: number): string {
  const location = `${col}${rowNumber}`
  return (sheet[location] || {}).w || ''
}

/**
* Match excel columns to document attributes using a map object i.e. { attributeName: 'C' }.
*/
export function mapXLSXFileToAttributeNames ({ documentMap, sheet, rowNumber }: MapParams): MapResult {
  const errors :Array<DocError> = []
  // Get the string value of a cell in the XLSX sheet given a column name and row number.
  const getColumnString = (column: string | undefined): string => {
    if (typeof column === 'string') {
      return getColumnValue(sheet, column, rowNumber) as string
    }
    const err = { message: 'attributeMapError', index: rowNumber, column }
    throw err
  }

  // Iterate over each attribute in the document attribute map.
  // Match the attribute to the string stored in the XLSX sheet. Use the column name paired with the attribute.
  // If the attribute is an object recursively call this function in order to match nested object attributes
  // with the correct string.
  const mapColumnToDocumentAttribute = (attributesMap: DocumentAttributesMap) :DocumentAttributes => {
    const map = { language: '' } as DocumentAttributes

    Object.entries(attributesMap).forEach((entry) => {
      const key :string = entry[0]
      const value :AttributeDefinition = entry[1] as AttributeDefinition

      if (typeof value.schema === 'object') {
        map[key] = mapColumnToDocumentAttribute(value.schema)
        return
      }
      const attributeValue = getColumnString(value.column)

      if (attributeValue.length < 1 && value.required) {
        const err = { message: 'attributeRequiredError', index: rowNumber, column: key }
        throw err
      }
      map[key] = attributeValue
    })

    return map
  }

  return { document: mapColumnToDocumentAttribute(documentMap), errors }
}

function isRowEmpty (rowNumber: number, map: DocumentAttributesMap, sheet: XLSX.Sheet) {
  return !Object.values(map)
    .some((attributeDef) => {
      if (typeof attributeDef.schema === 'object') { return false }
      return getColumnValue(sheet, attributeDef.column as string, rowNumber).length > 0
    })
}

function handleError (message: string) {
  const error = { message }
  throw error
}

function mapToDocumentAttributes (documentType: DocumentTypes, sheet: XLSX.WorkSheet) :DocumentsMapResult {
  if (!documentType) {
    handleError('noDocumentTypeError')
  }
  // Get the map between XLSX sheet columns and document attributes
  // matching the current document type.
  const documentMap = documentsList[documentType]?.attributesMap as DocumentAttributesMap

  if (documentMap === undefined) {
    handleError('noDocumentMapError')
  }

  const range = sheet['!ref']
  const headerCount: number = 3
  const rangeEnd = XLSX.utils.decode_range(range as string).e.r
  const rangeStart = XLSX.utils.decode_range(range as string).s.r + headerCount

  const documents = []
  const errors = []

  // Iterate over each XLSX sheet row and map the data
  // in that row to get a list of document attributes with their names i.e. document.title, etc.
  for (let i = rangeStart; i < rangeEnd; i += 1) {
    if (isRowEmpty(i, documentMap, sheet)) { continue }

    try {
      const mapResult = mapXLSXFileToAttributeNames({ documentMap, sheet, rowNumber: i })
      documents.push(mapResult.document)
    } catch (error) {
      errors.push(error as DocError)
    }
  }

  // Handle empty document
  if (documents.length < 1) { handleError('documentEmptyError') }

  return { documents, errors }
}

export default function mapXLSXFileToDocumentAttributes (documentType: DocumentTypes, sheet: XLSX.WorkSheet | Array<string>) :DocumentsMapResult {
  try {
    return mapToDocumentAttributes(documentType, sheet)
  } catch (error) {
    return { documents: [], errors: [error as DocError] }
  }
}
