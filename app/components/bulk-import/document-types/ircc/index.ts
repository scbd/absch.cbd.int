import type { DocumentTypeDefinition } from '../../framework/types'
import { IrccSchema } from './schema'
import attributesMap from './attributes-map'
import irccMessages from '~/app-text/components/bulk-import/document-types/ircc.json'

export const irccDocumentType: DocumentTypeDefinition = {
  Schema: IrccSchema,
  getLanguage: (row) => typeof row['language'] === 'string' ? row['language'] : '',
  attributesMap,
  messages: irccMessages,
  // each document type can have diff header rows,
  // incase of ircc there are 2 header rows.
  headerRows: [0, 1],
  pinnedColumns: ['permitEquivalent'],
  columnGroups: [
    { translationKey: 'general', keys: ['language', 'country'] },
    { translationKey: 'issuingAuthority', keys: ['absCNAId'] },
    { translationKey: 'permitDetails', keys: ['dateOfIssuance', 'dateOfExpiry'] },
    {
      translationKey: 'providerSection',
      keys: ['provider.type', 'provider.existing', 'provider.orgName', 'provider.acronym', 'provider.address', 'provider.city', 'provider.country', 'provider.email']
    },
    {
      translationKey: 'picSection',
      keys: ['pic.consent', 'pic.type', 'pic.existing', 'pic.orgName', 'pic.acronym', 'pic.address', 'pic.city', 'pic.country', 'pic.email']
    },
    { translationKey: 'mat', keys: ['matEstablished'] },
    { translationKey: 'geneticResource', keys: ['subjectMatter', 'keywords', 'specimens', 'taxonomies'] },
    { translationKey: 'usesConditions', keys: ['usage', 'usageDescription', 'conditionsThirdPartyTransfer'] },
    { translationKey: 'documentation', keys: ['permitFiles', 'additionalInformation'] }
  ]
}
