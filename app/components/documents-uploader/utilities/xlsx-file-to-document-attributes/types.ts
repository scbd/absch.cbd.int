import { type ApiDocumentType } from '../document-attributes-to-api-json/schemas/types'

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
  documentsJson: Array<ApiDocumentType>
  errors: Array<DocError>
}
