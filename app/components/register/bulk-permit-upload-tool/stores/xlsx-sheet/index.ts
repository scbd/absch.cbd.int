// import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'
import readXLSXFile from '../../utilities/read-xlsx-file'

type DocErrorsType = {
  fileRead: string | null
}

type EmptyWorkBook = {
  Sheets: object
  SheetNames: Array<string>
}

/**
 * XLSX Sheet Store
 *
 * Stores data parsed from xlsx file.
 */
type DocStateType = {
  parsedFile: XLSX.WorkBook | EmptyWorkBook;
  errors: DocErrorsType;
  isLoading: boolean;
  selectedSheetIndex: number;
  multipleImportSheets: Array<string>;
  progressTracking: number | null;
}
// 
// export const useXlSXSheetStore = defineStore('xlsx-sheet', {
//
const state: DocStateType = ({
  parsedFile: { Sheets: {}, SheetNames: [] },
  errors: { fileRead: null },
  isLoading: false,
  selectedSheetIndex: 0,
  multipleImportSheets: [],
  progressTracking: null
})

async function parseFile (changeEvent: Event): Promise<XLSX.WorkBook> {
  const readFileResult = await readXLSXFile(changeEvent)

  if (readFileResult.error) {
    state.errors = { fileRead: 'An error occurred while reading the file.' }
  }
  return readFileResult.workbook
}

export async function readFile (changeEvent: Event): Promise<XLSX.WorkBook> {
  // this.$reset()
  state.isLoading = false
  console.log('parsedFile', state.parsedFile.SheetNames.length > 0)
  state.parsedFile = await parseFile(changeEvent)

  return state.parsedFile as XLSX.WorkBook
}

function handleClearFile () {
  // this.$reset()
}

const storeObject = {
   getters: {
     hasParsedFiles: (state: DocStateType) => state.parsedFile.SheetNames.length > 0
   },
 
}
