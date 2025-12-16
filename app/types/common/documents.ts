import type { LanguageCode } from '../languages'

export type TextValue = Partial<Record<LanguageCode, string>>

export type DocumentValue = string | number | boolean | SubDocument | TextValue |
 SubDocument[] | Date | Header | ELink[]

export type EmptyDocumentValue = DocumentValue | undefined | SubDocument | null | Header

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
