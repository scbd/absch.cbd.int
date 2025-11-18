import * as XLSX from 'xlsx'
import type {
  ReadFileResult
} from './types'

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
async function loadXLSXFile (file: File): Promise<XLSX.WorkBook> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      resolve(workbook)
    }
  })
}

async function handleFileError (): Promise<ReadFileResult> {
  const a :BlobPart = '' as BlobPart
  const emptyFile: File = new File([a], 'error')
  // TODO: Get this this error message from translations
  const message = 'Error: The uploaded Excel file could not be parsed. Please reformat the excel file and try again.'
  const error = { value: { message }, index: 1 }
  return { workbook: await loadXLSXFile(emptyFile), errors: [error] }
}

export async function readXLSXFIle (fileChangeEvent: Event): Promise<ReadFileResult> {
  const target = fileChangeEvent.target as HTMLInputElement

  const files: FileList | null = target.files
  if (!files) { return await handleFileError() }
  const file: File | undefined = files[0]

  if (!file) { return await handleFileError() }
  const readFileResult: ReadFileResult = { workbook: await loadXLSXFile(file), errors: [] }

  return readFileResult
}
