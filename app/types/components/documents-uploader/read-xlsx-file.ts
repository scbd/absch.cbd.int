import * as XLSX from 'xlsx'

type ReadError = {
  index: number
  value: { message: string }
}
export type ReadFileResult = {
  workbook: XLSX.WorkBook
  errors: Array<ReadError>
}
