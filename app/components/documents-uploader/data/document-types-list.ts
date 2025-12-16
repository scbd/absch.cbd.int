import IrccSchema from '../utilities/document-attributes-to-schema-json/schemas/ircc-schema'
import irccAttributesMap from './maps/ircc-document'
import { THESAURUS_DOMAINS } from '~/constants/thesaurus'
import type { DocumentsList } from '~/types/components/documents-uploader/document-types-list'

export const documentsList: DocumentsList = {
  ircc: {
    DocumentSchema: IrccSchema,
    attributesMap: irccAttributesMap,
    keywordDomains: [THESAURUS_DOMAINS.ABS_PERMIT_KEYWORD],
    headerRows: [0, 1]
  }
}
