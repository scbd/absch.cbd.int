import IrccSchema from '../utilities/document-attributes-to-api-json/schemas/ircc-schema/index'
import Schema from '../utilities/document-attributes-to-api-json/schemas/schema'
import irccAttributesMap from '../utilities/xlsx-file-to-document-attributes/maps/ircc-document.json'

type AttributesMap = {
  [key: string]: string | AttributesMap
}

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

type DocumentInfo = {
  ApiSchema: typeof Schema
  attributesMap: AttributesMap 
}

export type DocumentsList = {
  [key: string]: DocumentInfo
}

export const documentsList: DocumentsList = {
  ircc: { ApiSchema: IrccSchema, attributesMap: irccAttributesMap }
}
