import { defineStore } from 'pinia'
import readXLSXFile from '../../utilities/read-xlsx-file'
import { type IWorkBook } from 'xlsx'

type DocErrorsType = {
  fileRead: string | null
}

/**
 * XLSX Sheet Store
 *
 * Stores data parsed from xlsx file.
 */
type DocStateType = {
  parsedFile: IWorkBook | object;
  errors: DocErrorsType;
  isLoading: boolean;
  selectedSheetIndex: number;
  multipleImportSheets: Array<any>;
  progressTracking: number | null;
}

export const useXlSXSheetStore = defineStore('xlsx-sheet', {
  state: (): DocStateType => ({
    parsedFile: {},
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
    async parseFile (changeEvent: Event) {
      let parsedFile = {}
      try {
        parsedFile = await readXLSXFile(changeEvent)
      } catch {
        parsedFile = {}
        this.errors = { fileRead: 'An error occurred while reading the file.' }
      }
      return parsedFile
    },

    async readFile (changeEvent: Event) {
      this.$reset()
      this.isLoading = false
      const parsedFile = await this.parseFile(changeEvent)
      this.parsedFile = parsedFile
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
