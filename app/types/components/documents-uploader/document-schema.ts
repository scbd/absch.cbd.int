import type { DocumentTypes } from './document-types-list'
import type {
  KeywordType, SupportingDocument,
  IContactFields, SubDocumentTypes,
  DocumentStore, DocumentRequest
} from '~/types/common/documents'
import type { ErrorLevel } from '~/types/errors'

export type CellValue = string | number | boolean | typeof Date

export type DocsResp = DocumentRequest[]

export interface CellEntry {
  index: number
  value: CellValue
}

export type DocValue = CellEntry | CellValue

// For Excel Parser
export type DocumentAttributesMap = Record<string, AttributeDefinition>
export interface AttributeDefinition {
  column?: string
  required?: boolean
  schema?: DocumentAttributesMap
  translationKey?: string
}

export interface DocError extends Error {
  reason: string
  row?: number
  value?: string
  column?: string | number
  error?: string
  level?: ErrorLevel
}

// Type generics for forming document request objects
// Generic documents, interaces for IRCC, CPC, etc.
export interface GenericAttributes extends Record<string, DocValue> {
  language: string
}
export type AttrTypes = GenericAttributes | IIRCCDocumentAttributes

export type DocumentAttributes<T extends AttrTypes> =
  T extends IIRCCDocumentAttributes ? IIRCCDocumentAttributes : GenericAttributes

export type AttrsList = Array<DocumentAttributes<AttrTypes>>

export interface DocumentsJson {
  documentsJson: DocumentStore[]
  errors: DocError[]
}

export interface MapToJsonParams {
  attributesList: AttrsList
  documentType: DocumentTypes
  keywordsMap: KeywordType[]
}

// Extend Record to allow the generic DocumentAttributes type to be asserted as this type.
// Necessary for having different types of document schemas for different document types.
export interface IIRCCDocumentAttributes extends Record<string, string | SupportingDocument<IContactFields> | DocValue | undefined> {
  language: string;
  absCNAId?: string;
  country?: string;
  permitEquivalent?: string;
  dateOfIssuance?: string;
  dateOfExpiry?: string;
  provider?: SupportingDocument<IContactFields>;
  pic?: SupportingDocument<IContactFields>;
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

// For Displaying
type DocumentData = Record<string, string>

export type GridValue = undefined | SupportingDocument<SubDocumentTypes> | DocValue | DocumentData | GridValue[]

export type DocumentAttrsList = Array<[string, GridValue]>

// For uploading files
export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}
