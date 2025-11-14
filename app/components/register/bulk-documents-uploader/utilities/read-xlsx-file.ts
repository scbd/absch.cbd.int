import * as XLSX from 'xlsx'

type ReadFileResult = {
  workbook: XLSX.WorkBook
  error: boolean
}

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

export default readXLSXFIle
