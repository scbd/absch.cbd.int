import type Schema from '~/components/documents-uploader/utilities/document-attributes-to-schema-json/schemas/schema'
import type { DocumentAttributesMap } from './document-schema'

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

interface DocumentInfo {
  DocumentSchema: typeof Schema
  attributesMap: DocumentAttributesMap
  keywordDomains: string[]
  headerRows: number[]
}

export type DocumentsList = Record<DocumentTypes, DocumentInfo>
