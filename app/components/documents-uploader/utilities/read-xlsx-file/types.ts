import * as XLSX from 'xlsx'

export type DocErrorsType = {
  fileRead: string | null
}

export type EmptyWorkBook = {
  Sheets: object
  SheetNames: Array<string>
}

export type DocStateType = {
  parsedFile: XLSX.WorkBook | EmptyWorkBook;
  errors: DocErrorsType;
  isLoading: boolean;
  selectedSheetIndex: number;
  multipleImportSheets: Array<string>;
  progressTracking: number | null;
}

export type ReadFileResult = {
  workbook: XLSX.WorkBook
  error: boolean
}
