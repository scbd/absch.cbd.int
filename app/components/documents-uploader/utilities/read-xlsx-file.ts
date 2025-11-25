import readExcelFile from 'read-excel-file'
import { documentsList } from '../data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { DocumentAttributes, CellValue, AttributeDefinition, DocError } from '~/types/components/documents-uploader/document-schema'

type Schema<T> = { [x: string]: T; }
type Row = CellValue[]

interface ParseWithSchemaOptions<Object> {
  schema: Schema<Object>
  transformData?: (rows: Row[]) => Row[]
}

type ReadFileResult = {
  workbook: Array<DocumentAttributes>
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
export async function readXLSXFIle (fileChangeEvent: Event, documentType: DocumentTypes): Promise<ReadFileResult> {
  const target = fileChangeEvent.target as HTMLInputElement
  const fileErrors = []

  const files = target.files || []

  const file = files[0]

  if (!file) {
    const reason = 'fileParseError'
    fileErrors.push({ reason })
  }

  const { attributesMap } = documentsList[documentType]

  const options: ReadExcelOptions = {
    schema: attributesMap,
    // Replace the first header rows of the document with
    // the column letters to allow for mapping attribute names to
    // column letters.
    // NOTE: This will have to be removed if we intened on mapping
    // column header values to attribute names
    transformData (data: Row[]) {
      const letterBreak = 26
      const firstRow :Row = data[0] || []
      const letters = firstRow.map((_value: CellValue, index: number) => {
        const getChar = (n: number) => String.fromCharCode(96 + n)
        const charCode = index % letterBreak
        const columnLetterCount = Math.floor(index / letterBreak)

        let char = getChar(charCode + 1)
        // If we extend past column Z return with AA AB etc.
        for (let i = 0; i < columnLetterCount; i += 1) {
          char = `${getChar(columnLetterCount)}${char}`
        }
        return char.toUpperCase() as CellValue
      })
      data.splice(0, 2)
      return [letters].concat(data)
    }
  }

  const readResult = await readExcelFile(file as File, options as ParseWithSchemaOptions<ReadExcelOptions>)
  const workbook = readResult.rows as Array<DocumentAttributes>
  const readErrors = readResult.errors as Array<DocError>

  const errors = readErrors.map((error) => {
    if (error.reason) { return error }
    error.reason = error.error as string
    return error
  })

  return { workbook, errors }
}
