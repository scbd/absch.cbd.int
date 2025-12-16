import type { DocumentTypes } from './document-types-list'
import type { KeywordType, DocumentRequest } from '~/types/common/documents'

export type CellValue = string | number | boolean | typeof Date

export interface CellEntry {
  index: number
  value: CellValue
}

export type DocValue = CellEntry | CellValue

export type DocumentAttributesMap = Record<string, AttributeDefinition>

export interface DocumentAttributes extends Record<string, DocValue> {
  language: string
}

export type Sheet = Record<string, unknown>

export interface AttributeDefinition {
  column?: string
  required?: boolean
  schema?: DocumentAttributesMap
  translationKey?: string
}

export type ErrorLevel = 'warning' | 'error' | 'info'

export interface DocError extends Error {
  reason: string
  row?: number
  value?: string
  column?: string | number
  error?: string
  level?: ErrorLevel
}

export interface DocumentsJson {
  documentsJson: DocumentRequest[]
  errors: DocError[]
}

export type DocumentsJsonArray = DocumentRequest[]

export interface MapToJsonParams {
  attributesList: DocumentAttributes[]
  documentType: DocumentTypes
  keywordsMap: KeywordType[]
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
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
export interface IIRCCDocumentAttributes extends Record<string, string | IContactFields | undefined> {
  language: string;
  absCNAId?: string;
  permitEquivalent?: string;
  dateOfIssuance?: string;
  dateOfExpiry?: string;
  provider: IContactFields;
  pic: IContactFields;
  matEstablished?: string;
  subjectMatter?: string;
  keywords?: string;
  specimens?: string;
  taxonomies?: string;
  usage?: string;
  usageDescription?: string;
  conditionsThirdPartyTransfer?: string;
  permitFiles?: string;
  additionalInformation?: string;
}
