import readExcelFile from 'read-excel-file'
import { documentsList } from '../data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import {
  DocumentAttributes, CellValue,
  AttributeDefinition, DocError
} from '~/types/components/documents-uploader/document-schema'

type Schema<T> = { [x: string]: T; }
type Row = CellValue[]

interface ParseWithSchemaOptions<T> {
  schema: Schema<T>
  transformData?: (rows: Row[]) => Row[]
}

type ReadExcelOptions = {
  schema: Schema<AttributeDefinition>
  transformData: (rows: Row[]) => Row[]
}

export type ReadFileResult = {
  data: Array<DocumentAttributes>
  errors: Array<DocError>
}

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
export async function readXLSXFile (file: File, documentType: DocumentTypes): Promise<ReadFileResult> {
  const documentInfo = documentsList[documentType] || { attributesMap: {}, headerRows: [0] }
  const { attributesMap, headerRows } = documentInfo

  const options: ReadExcelOptions = {
    schema: attributesMap,
    transformData (data: Row[]) {
      // Do not parse the rows in the Excel sheet that are marked as headers
      // because they will not be parsed as a part of a document.
      data = data
        .filter((_val, index) => !headerRows.includes(index))

      // Set the first column of data as an index so that we can map the indices
      // in the document schema to Excel columns.
      const columnsIndex = Array.from((data[0] || []).keys())
      data.unshift(columnsIndex.map(String))
      return data
    }
  }

  const readResult = await readExcelFile(file as File, options as ParseWithSchemaOptions<ReadExcelOptions>)
  const data = readResult.rows as Array<DocumentAttributes>
  const readErrors = readResult.errors as Array<DocError>

  const errors = readErrors.map((error) => {
    if (error.reason) { return error }
    error.reason = error.error as string
    error.column = parseInt(error.column as string, 10)
    error.row = error.row - headerRows.length
    return error
  })

  return { data, errors }
}
