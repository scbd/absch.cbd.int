import IrccSchema from '../utilities/document-attributes-to-api-json/schemas/ircc-schema/index'
import Schema from '../utilities/document-attributes-to-api-json/schemas/schema'
import { irccAttributesMap, IRCCAttributesMap } from '../utilities/xlsx-file-to-document-attributes/maps/ircc-document'


type AttributesMap = {
  [key: string]: string | AttributesMap
}

export type DocumentTypes = 'ircc' // | 'cpc' | 'contact'

type DocumentInfo = {
  ApiSchema: typeof Schema
  attributesMap: IRCCAttributesMap
}

export type DocumentsList = {
  [key: string]: DocumentInfo
}

console.log('irccAttributesMap', irccAttributesMap)

export const documentsList: DocumentsList = {
  ircc: { ApiSchema: IrccSchema, attributesMap: irccAttributesMap }
}
