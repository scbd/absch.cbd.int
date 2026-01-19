import type { LanguageCode } from '../languages'

type FieldValue = string | null

export type TextValue = Partial<Record<LanguageCode, string>>

export type DocumentValue = string | number | boolean | SubDocument | TextValue |
 SubDocument[] | Date | Header | ELink[] | string[] | Array<SupportingDocument<SubDocumentTypes>>

export type EmptyDocumentValue = DocumentValue | undefined | null

export interface Header {
  identifier: string
  schema?: string,
  languages?: LanguageCode[]
}

export interface SubDocument {
  identifier: string
}

export interface ELink {
  url: string
}
export type DocumentRequest = Record<string, DocumentValue>

export type EmptyDocumentRequest = Record<string, EmptyDocumentValue>

export interface KeywordType {
  name: string
  title: TextValue
  identifier: string
}

export interface Keywords {
  processedKeywords: SubDocument[]
  otherKeywords: string
}
export type UsageKey = 'COMMERCIAL' | 'NONCOMMERCIAL'

// Generic Sub-documents
interface GenericDocument {
  type?: string
}
export type SubDocumentTypes = IContactFields | GenericDocument
export type SupportingDocument<T extends SubDocumentTypes> =
  T extends IContactFields ? IContactFields : SubDocumentTypes

export interface IContactFields {
  header?: { identifier?: string, schema?: string, language?: string[] };
  type?: FieldValue;
  existing?: FieldValue;
  orgName?: FieldValue;
  acronym?: FieldValue;
  address?: FieldValue;
  city?: FieldValue;
  country?: FieldValue;
  email?: FieldValue;
  consent?: FieldValue;
}

export type SubDocumentStore = Array<SupportingDocument<SubDocumentTypes>>

export interface DocumentStore {
  documents: DocumentRequest[]
  subDocuments: SubDocumentStore
}
