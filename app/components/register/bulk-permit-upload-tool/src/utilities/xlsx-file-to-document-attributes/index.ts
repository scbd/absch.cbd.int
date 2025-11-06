import type {
  IDocumentMap, IContactFields,
  DocumentKeys, IFileData
} from './types'
function getColumnValue (sheet: IFileData, col: string, documentNumber: number): string {
  const location = `${col}${documentNumber + 2}`
  return (sheet[location] || {}).w || ''
}

export default function mapXLSXFileDataToAttributeNames (documentMap: IDocumentMap, sheet: IFileData): IDocumentMap {
  const documentNumber :number = 1
  const mapKeyToColumn = (map: IContactFields | IDocumentMap): IDocumentMap => {
    const mappedObject: IDocumentMap = documentMap
    Object.entries(map).forEach(([k, value]) => {
      const key: DocumentKeys = k as DocumentKeys
      if (typeof value === 'string') {
        mappedObject[key] = getColumnValue(sheet, value, documentNumber)
        return
      }
      if (typeof value === 'object') {
        mappedObject[key] = mapKeyToColumn(value)
      }
    })
    return mappedObject
  }

  return mapKeyToColumn(documentMap)
}
