import * as XLSX from 'xlsx'

import { DocumentJsonType } from '~/types/components/documents-uploader/document-schema'
export type DocumentAttributesMap = { [key: string]: string | DocumentAttributesMap }

export type CellValue = {
  w: string;
}

export interface IFileData {
  [key: string]: CellValue;
}

export type DocError = {
  value: Error
  index: number
}

export type DocumentsJson = {
  documentsJson: Array<DocumentJsonType>
  errors: Array<DocError>
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
