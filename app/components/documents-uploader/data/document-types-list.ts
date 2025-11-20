import IrccSchema from '../utilities/document-attributes-to-schema-json/schemas/ircc-schema/index'
import Schema from '../utilities/document-attributes-to-schema-json/schemas/schema'
import irccAttributesMap from '../utilities/xlsx-file-to-document-attributes/maps/ircc-document'

type AttributesMap = {
  [key: string]: string | AttributesMap
}

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

type DocumentInfo = {
  DocumentSchema: typeof Schema
  attributesMap: AttributesMap
  keywordDomains: Array<string>
}

export type DocumentsList = {
  [key: string]: DocumentInfo
}

export const documentsList: DocumentsList = {
  ircc: {
    DocumentSchema: IrccSchema,
    attributesMap: irccAttributesMap,
    keywordDomains: ['1A22EAAB-9BBC-4543-890E-DEF913F59E98'] // TODO: Remove magic string by fetching the ABS Permit Keyword category. Possible fetch from env variable
  }
}
