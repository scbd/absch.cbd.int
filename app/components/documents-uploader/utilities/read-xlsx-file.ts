import * as XLSX from 'xlsx'
import { StandardError } from '~/types/errors'

type ReadFileResult = {
  workbook: XLSX.WorkBook
  errors: Array<StandardError>
}

/**
 * Read XLSX Workbook
 *
 * Stores data parsed from xlsx file.
 */
async function loadXLSXFile (file: File): Promise<XLSX.WorkBook> {
  const data = await file.arrayBuffer()
  return XLSX.read(data, { type: 'array' })
}

export async function readXLSXFIle (fileChangeEvent: Event): Promise<ReadFileResult> {
  const target = fileChangeEvent.target as HTMLInputElement
  const errors = []

  const files = target.files || []

  const file = files[0]

  if (!file) {
    const message = 'fileParseError'
    errors.push({ message })
  }

  const workbook = await loadXLSXFile(file as File)
    .catch(error => {
      console.warn(error)
      errors.push(error)
    })

  return { workbook: workbook as XLSX.WorkBook, errors }
}
