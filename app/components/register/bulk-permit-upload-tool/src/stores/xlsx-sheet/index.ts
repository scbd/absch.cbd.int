import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'
import readXLSXFile from '../../utilities/read-xlsx-file'

type DocErrorsType = {
  fileRead: string | null
}

type EmptyWorkBook = {
  Sheets: object
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
  multipleImportSheets: Array<any>;
  progressTracking: number | null;
}

export const useXlSXSheetStore = defineStore('xlsx-sheet', {
  state: (): DocStateType => ({
    parsedFile: { Sheets: {} },
    errors: { fileRead: null },
    isLoading: false,
    selectedSheetIndex: 0,
    multipleImportSheets: [],
    progressTracking: null
  }),

  getters: {
    hasParsedFiles: (state) => typeof state.parsedFile.Sheets === 'object'
  },

  actions: {
    async parseFile (changeEvent: Event): Promise<XLSX.WorkBook> {
      const readFileResult = await readXLSXFile(changeEvent)

      if (readFileResult.error) {
        this.errors = { fileRead: 'An error occurred while reading the file.' }
      }
      return readFileResult.workbook
    },

    async readFile (changeEvent: Event): Promise<XLSX.WorkBook> {
      this.$reset()
      this.isLoading = false
      const parsedFile = await this.parseFile(changeEvent)
      return parsedFile
    },

    handleClearFile () {
      this.$reset()
    },

    handleSelectedSheetChange () {
      try {
        if (this.selectedSheetIndex == null) { return }
        this.errors = { fileRead: null }
        this.progressTracking = null
      } catch (err) {
        console.warn('ERR', err)
        this.parsedFile = {}
        this.errors = { fileRead: 'An error occurred while reading the file.' }
      }
      this.isLoading = false
    }
  },
})
