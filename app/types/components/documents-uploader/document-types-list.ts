import Schema from '~/components/documents-uploader/utilities/document-attributes-to-schema-json/schemas/schema'
import { AttributeDefinition } from './xlsx-file-to-document-attributes'

type AttributesMap = {
  [key: string]: AttributeDefinition | AttributesMap
}

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

type DocumentInfo = {
  DocumentSchema: typeof Schema
  attributesMap: AttributesMap
  keywordDomains: Array<string>
}

export type DocumentsList = {
  [key in DocumentTypes]: DocumentInfo
}
