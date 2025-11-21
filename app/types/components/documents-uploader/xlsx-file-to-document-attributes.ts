import * as XLSX from 'xlsx'
import { DocumentJsonType } from '~/types/components/documents-uploader/document-schema'
import { StandardError } from '../../errors'

export type AttributeDefinition = {
  column: string
  required?: boolean
  schema?: DocumentAttributesMap
}

export type DocumentAttributesMap = { [key: string]: AttributeDefinition | DocumentAttributesMap }

export type DocumentAttributes = { [key: string]: string | DocumentAttributes }

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

export type DocumentsMapResult = {
  documents: Array<DocumentAttributes | StandardError>
  errors: Array<DocError>
}

export type MapResult = {
  document: DocumentAttributes
  errors: Array<StandardError>
}
