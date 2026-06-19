import type { DocumentTypeDefinition } from '../../framework/types'
import { IrccSchema } from './schema'
import attributesMap from './attributes-map'
import irccMessages from '~/app-text/components/bulk-import/document-types/ircc.json'

export const irccDocumentType: DocumentTypeDefinition = {
  Schema: IrccSchema,
  getLanguage: (row) => typeof row['language'] === 'string' ? row['language'] : '',
  attributesMap,
  messages: { en: irccMessages },
  // each document type can have diff header rows,
  // incase of ircc there are 2 header rows.
  headerRows: [0, 1],
}
