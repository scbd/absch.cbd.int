import readExcelFile from 'read-excel-file'
import { documentsList } from '../data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import {
  DocumentAttributes, CellValue,
  AttributeDefinition, DocError
} from '~/types/components/documents-uploader/document-schema'

type Schema<T> = { [x: string]: T; }
type Row = CellValue[]

interface ParseWithSchemaOptions<Object> {
  schema: Schema<Object>
  transformData?: (rows: Row[]) => Row[]
}

type ReadFileResult = {
  data: Array<DocumentAttributes>
  errors: Array<DocError>
}

type ReadExcelOptions = {
  schema: Schema<AttributeDefinition>
  transformData: (rows: Row[]) => Row[]
}

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
export async function readXLSXFIle (file: File, documentType: DocumentTypes): Promise<ReadFileResult> {
  const { attributesMap } = (documentsList[documentType] || { attributesMap: {} })

  const options: ReadExcelOptions = {
    schema: attributesMap,
    transformData (data: Row[]) {
      // Set the first column of data as an index so that we can map the index
      // in the document schema to Excel columns.
      data.splice(0, 2)

      data.unshift(Object.keys(data[0]).map(String))
      return data
    }
  }

  const readResult = await readExcelFile(file as File, options as ParseWithSchemaOptions<ReadExcelOptions>)
  const data = readResult.rows as Array<DocumentAttributes>
  const readErrors = readResult.errors as Array<DocError>

  const errors = readErrors.map((error) => {
    if (error.reason) { return error }
    error.reason = error.error as string
    return error
  })

  return { data, errors }
}
