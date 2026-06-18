import type { DocumentTypeDefinition } from '../../framework/types'
import { IrccSchema } from './schema'
import attributesMap from './attributes-map'
import messages from './messages.json'

export const irccDocumentType: DocumentTypeDefinition = {
  Schema: IrccSchema,
  attributesMap,
  messages,
  headerRows: [0, 1],
  keywordDomains: []
}
