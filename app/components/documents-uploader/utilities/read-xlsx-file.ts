import readExcelFile from 'read-excel-file'
import { documentsList } from '../data/document-types-list'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  CellValue, DocumentAttributes,
  AttributeDefinition, DocError, AttrTypes
} from '~/types/components/documents-uploader/document-schema'

type Schema<T> = Record<string, T>

type Row = CellValue[]

interface ParseWithSchemaOptions<T> {
  schema: Schema<T>
  transformData?: (rows: Row[])=> Row[]
}

interface ReadExcelOptions {
  schema: Schema<AttributeDefinition>
  transformData?: (rows: Row[])=> Row[]
}

export interface ReadFileResult {
  data: Array<DocumentAttributes<AttrTypes>>
  errors: DocError[]
}

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
export async function readXLSXFile (file: File, documentType: DocumentTypes): Promise<ReadFileResult> {
  const { [documentType]: documentDefinitions } = documentsList
  const { attributesMap, headerRows } = documentDefinitions

  const options: ParseWithSchemaOptions<ReadExcelOptions> = {
    // @ts-expect-error Cannot import read-xlsx-file libaries types
    schema: attributesMap,
    transformData (rowData: Row[]) {
      // Do not parse the rows in the Excel sheet that are marked as headers
      // because they will not be parsed as a part of a document.
      const data = rowData
        .filter((_val, index) => !headerRows.includes(index))

      // Set the first column of data as an index so that we can map the indices
      // in the document schema to Excel columns.
      const firstRow = typeof data[0] === 'object' ? data[0] : []
      const columnsIndices = Array.from(firstRow.keys())
      data.unshift(columnsIndices.map(String))
      return data
    }
  }

  const readResult = await readExcelFile(file, options)
  const { rows: sheet } = readResult
  const { errors: readErrors } = readResult

  const errors = readErrors.map((e): DocError => {
    const error: DocError = { reason: '', row: -1, message: '', name: 'readError', level: 'warning' }
    const reason = e.reason === 'string' ? e.reason : e.error
    const { column, row } = e
    error.reason = reason
    error.column = parseInt(column, 10)
    error.row = row - headerRows.length
    return error
  })

  const result: ReadFileResult = {
    data: sheet as Array<DocumentAttributes<AttrTypes>>, // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion -- Cannot get read-xlsx libraries types
    errors
  }

  return result
}
