import * as XLSX from 'xlsx'
import { StandardError } from '../../errors'

export type DocumentAttributesMap = { [key: string]: string | DocumentAttributesMap }

export type CellValue = {
  w: string;
}

export interface IFileData {
  [key: string]: CellValue;
}

export type DocError = {
  message: string
  index: number
  value?: string
  column?: number
}

export type KeywordType = {
  name: string
  identifier: string
}

export type MapParams = {
  documentMap: DocumentAttributesMap
  sheet: XLSX.WorkSheet | IFileData
  rowNumber: number
}

export type DocumentsMapResult = {
  documents: Array<DocumentAttributesMap>
  errors: Array<StandardError>
}

export type MapResult = {
  document: DocumentAttributesMap
  errors: Array<StandardError>
}
