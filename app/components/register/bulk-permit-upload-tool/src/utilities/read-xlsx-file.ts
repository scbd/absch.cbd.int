import { read, type IWorkBook } from 'xlsx'

async function loadXLSXFile (file: File): Promise<IWorkBook> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = read(data, { type: 'binary' })
      const sheetNames = Object.keys(workbook.Sheets)
      resolve({ workbook, sheetNames, Sheets: workbook.Sheets })
    }
  })
}

async function readXLSXFIle (fileChangeEvent: Event): Promise<IWorkBook | object> {
  const target = fileChangeEvent.target as HTMLInputElement

  const files: FileList | null = target.files
  if (!files) { return {} }
  const file: File | undefined = files[0]

  if (!file) { return {} }

  return await loadXLSXFile(file)
}

export default readXLSXFIle
