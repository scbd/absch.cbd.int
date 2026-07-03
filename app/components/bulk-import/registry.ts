import type { DocumentTypes, DocumentTypeDefinition } from './framework/types'
import { irccDocumentType } from './document-types/ircc/index'

export const registry: Record<DocumentTypes, DocumentTypeDefinition> = {
  ircc: irccDocumentType
}
