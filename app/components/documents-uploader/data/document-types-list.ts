import IrccSchema from '../utilities/document-attributes-to-schema-json/schemas/ircc-schema'
import irccAttributesMap from './maps/ircc-document'
import { DocumentsList } from '~/types/components/documents-uploader/document-types-list'

export const documentsList: DocumentsList = {
  ircc: {
    DocumentSchema: IrccSchema,
    attributesMap: irccAttributesMap,
    keywordDomains: ['1A22EAAB-9BBC-4543-890E-DEF913F59E98'] // TODO: Remove magic string by fetching the ABS Permit Keyword category. Possible fetch from env variable
  }
}
