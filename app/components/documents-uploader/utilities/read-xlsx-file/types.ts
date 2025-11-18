import * as XLSX from 'xlsx'

export type DocErrorsType = {
  fileRead: string | null
}

export type EmptyWorkBook = {
  Sheets: object
  SheetNames: Array<string>
}

type ReadError = {
  index: number
  value: { message: string }
}
export type ReadFileResult = {
  workbook: XLSX.WorkBook
  errors: Array<ReadError>
}
