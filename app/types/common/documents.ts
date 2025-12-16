import type { LanguageCode } from '../languages'

type KeywordTitle = Record<LanguageCode, string>

type DocumentData = Record<string, string>

type DocumentValue = string | number | boolean | SubDocument |
  DocumentData | DocumentData[] | SubDocument[] | Date | Header | ELink[]

export type EmptyDocumentValue = DocumentValue | undefined | EmptySubDocument

export interface Header {
  identifier: string
  schema?: string,
  languages?: LanguageCode[]
}

export interface EmptySubDocument {
  identifier?: string
}

export interface SubDocument {
  identifier: string
}

export interface ELink {
  url: string
}
export interface DocumentRequest extends Record<string, DocumentValue> {
  header: Header
}

export type EmptyDocumentRequest = Record<string, EmptyDocumentValue>

export interface KeywordType {
  name: string
  title: KeywordTitle
  identifier: string
}

export interface Keywords {
  processedKeywords: SubDocument[]
  otherKeywords: string
}
export type UsageKey = 'COMMERCIAL' | 'NONCOMMERCIAL'
