import { DocumentTypes } from './document-types-list'
import { KeywordType, DocumentRequest } from '~/types/common/documents'


export type CellValue = string | number | boolean | typeof Date

export type DocumentAttributesMap = { [key: string]: AttributeDefinition }

export type DocumentAttributes = { [key: string]: CellValue }

export type AttributeDefinition = {
  column?: string
  required?: boolean
  schema?: DocumentAttributesMap
}

export type DocError = {
  reason: string
  row: number
  value?: string
  column?: string
  error?: string
}

export type DocumentsJson = {
  documentsJson: Array<DocumentRequest>
  errors: Array<DocError>
}

export type DocumentsJsonArray = Array<DocumentRequest>

export type MapToJsonParams = {
  attributesList: Array<DocumentAttributes>
  documentType: DocumentTypes
  keywordsMap: Array<KeywordType>
}

export interface IContactFields {
  type: string;
  existing: string;
  orgName: string;
  acronym: string;
  address: string;
  city: string;
  country: string;
  email: string;
  consent: string;
}

// Extend Record to allow the generic DocumentAttributes type to be asserted as this type.
// Necessary for having different types of document schemas for different document types.
export interface IIRCCDocumentAttributes extends Record<string, string | IContactFields> {
  language: string;
  absCNAId: string;
  permitEquivalent: string;
  dateOfIssuance: string;
  dateOfExpiry: string;
  provider: IContactFields;
  pic: IContactFields;
  matEstablished: string;
  subjectMatter: string;
  keywords: string;
  specimens: string;
  taxonomies: string;
  usage: string;
  usageDescription: string;
  conditionsThirdPartyTransfer: string;
  permitFiles: string;
  additionalInformation: string;
}
