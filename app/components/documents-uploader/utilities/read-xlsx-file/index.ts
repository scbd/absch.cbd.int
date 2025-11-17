import * as XLSX from 'xlsx'
import type {
  DocStateType, ReadFileResult
} from './types'

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
export const state: DocStateType = ({
  parsedFile: { Sheets: {}, SheetNames: [] },
  errors: { fileRead: null },
  isLoading: false,
  selectedSheetIndex: 0,
  multipleImportSheets: [],
  progressTracking: null
})

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
  return { workbook: await loadXLSXFile(emptyFile), error: true }
}

async function readXLSXFIle (fileChangeEvent: Event): Promise<ReadFileResult> {
  const target = fileChangeEvent.target as HTMLInputElement

  const files: FileList | null = target.files
  if (!files) { return await handleFileError() }
  const file: File | undefined = files[0]

  if (!file) { return await handleFileError() }
  const readFileResult: ReadFileResult = { workbook: await loadXLSXFile(file), error: false }

  return readFileResult
}

async function parseFile (changeEvent: Event): Promise<XLSX.WorkBook> {
  const readFileResult = await readXLSXFIle(changeEvent)

  if (readFileResult.error) {
    state.errors = { fileRead: 'An error occurred while reading the file.' }
  }
  return readFileResult.workbook
}

export default async function readFile (changeEvent: Event): Promise<XLSX.WorkBook> {
  // this.$reset()
  state.isLoading = false
  state.parsedFile = await parseFile(changeEvent)

  return state.parsedFile as XLSX.WorkBook
}
