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
  return new Promise((resolve, reject) => {
    const error = { message: 'fileReadError' }
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const data = e.target?.result
      try {
        const workbook = XLSX.read(data, { type: 'binary' })
        resolve(workbook)
      } catch (fileError) {
        console.warn(fileError)
        reject(error)
      }
    }
    reader.onerror = (readerError) => {
      console.warn(readerError)
      reject(error)
      return error
    }
  })
}

export async function readXLSXFIle (fileChangeEvent: Event): Promise<ReadFileResult> {
  const target = fileChangeEvent.target as HTMLInputElement
  const errors = []

  const files = target.files

  const file = files[0]

  if (!file) {
    const message = 'fileParseError'
    errors.push({ message })
  }

  const workbook = await loadXLSXFile(file)
    .catch(error => errors.push(error))

  return { workbook: workbook as XLSX.WorkBook, errors }
}
