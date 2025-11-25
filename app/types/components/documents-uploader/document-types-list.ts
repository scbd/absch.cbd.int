import Schema from '~/components/documents-uploader/utilities/document-attributes-to-schema-json/schemas/schema'
import { DocumentAttributesMap } from './document-schema'

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

type DocumentInfo = {
  DocumentSchema: typeof Schema
  attributesMap: DocumentAttributesMap
  keywordDomains: Array<string>
}

export type DocumentsList = {
  [key in DocumentTypes]: DocumentInfo
}
