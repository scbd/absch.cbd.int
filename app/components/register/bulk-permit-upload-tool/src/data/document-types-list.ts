import IrccSchema from '../stores/documents/schemas/ircc-schema/index'
import Schema from '../stores/documents/schemas/schema'
import irccAttributesMap from '../utilities/xlsx-file-to-document-attributes/maps/ircc-document.json'

type AttributesMap = {
  [key: string]: string | AttributesMap
}

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
