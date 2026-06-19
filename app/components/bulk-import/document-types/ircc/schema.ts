import { Schema, type KeywordType } from '../../framework/schema'
import type { RawRow, LinkedRecordStore, ApiClient } from '../../framework/types'
import type { DocumentRequest, EmptyDocumentRequest, IContactFields } from '~/types/common/documents'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
import { THESAURUS_DOMAINS } from '~/constants/thesaurus'

let keywordsCache: KeywordType[] | null = null

async function fetchKeywords(): Promise<KeywordType[]> {
  if (keywordsCache !== null) return keywordsCache
  const api = new ThesaurusApi()
  const terms = await api.getDomainTerms(THESAURUS_DOMAINS.ABS_PERMIT_KEYWORD) as KeywordType[]
  keywordsCache = Array.isArray(terms) ? terms : []
  return keywordsCache
}

export class IrccSchema extends Schema {
  constructor(row: RawRow, linkedRecords: LinkedRecordStore, 
              api: ApiClient, rawLanguage: string) {
    super(row, linkedRecords, api, rawLanguage)
  }

  override async buildSchemaDocument(): Promise<DocumentRequest> {
    const keywordsMap = await fetchKeywords()

    const absCNAIdentifier = await this.resolveAbsCna()
    const providers = await this.findContactOrCreate(this.contactFromRow('provider'))
    const entitiesToWhomPICGranted = await this.findContactOrCreate(this.contactFromRow('pic'))
    const { processedKeywords, otherKeywords } = this.getKeywords(
      this.columnValue('keywords'), keywordsMap
    )

    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateId(),
        schema: 'absPermit',
        languages: [this.language]
      },
      government:                            Schema.toETerm(this.columnValue('country')?.toLowerCase()),
      absCNA:                                Schema.toEReference(absCNAIdentifier),
      title:                                 this.getLocaleValue(this.columnValue('permitEquivalent')),
      dateOfIssuance:                        Schema.parseDate(this.columnValue('dateOfIssuance')),
      dateOfExpiry:                          Schema.parseDate(this.columnValue('dateOfExpiry')),
      providersConfidential:                 Schema.getIsConfidential(this.nestedColumnValue('provider', 'type')),
      entitiesToWhomPICGrantedConfidential:  Schema.getIsConfidential(this.nestedColumnValue('pic', 'type')),
      picGranted:                            Schema.parseTextToBoolean(this.nestedColumnValue('pic', 'consent')),
      subjectMatter:                         this.getLocaleElement(this.columnValue('subjectMatter')),
      keywords:                              processedKeywords,
      keywordOther:                          this.getLocaleValue(otherKeywords.trim() || undefined),
      providers,
      entitiesToWhomPICGranted,
      matEstablished:                        Schema.parseTextToBoolean(this.columnValue('matEstablished')),
      usages:                                [{ identifier: Schema.getUsageMapping(this.columnValue('usage')) }],
      usagesConfidential:                    Schema.getIsConfidential(this.columnValue('usage')),
      usagesDescription:                     this.getLocaleElement(this.columnValue('usageDescription')),
      thirdPartyTransferCondition:           this.getLocaleElement(this.columnValue('conditionsThirdPartyTransfer')),
      specimens:                             Schema.getELinkData(this.columnValue('specimens')),
      taxonomies:                            Schema.getELinkData(this.columnValue('taxonomies')),
      relevantInformation:                   this.columnValue('additionalInformation')
    }

    return Schema.removeEmptyValues(data)
  }

  private contactFromRow(prefix: string): IContactFields | undefined {
    const type = this.nestedColumnValue(prefix, 'type')
    if (Schema.isEmpty(type)) return undefined
    return {
      type,
      existing:  this.nestedColumnValue(prefix, 'existing'),
      orgName:   this.nestedColumnValue(prefix, 'orgName'),
      acronym:   this.nestedColumnValue(prefix, 'acronym'),
      address:   this.nestedColumnValue(prefix, 'address'),
      city:      this.nestedColumnValue(prefix, 'city'),
      country:   this.nestedColumnValue(prefix, 'country'),
      email:     this.nestedColumnValue(prefix, 'email'),
      consent:   this.nestedColumnValue(prefix, 'consent')
    }
  }

  private async resolveAbsCna(): Promise<string | undefined> {
    const id = this.columnValue('absCNAId')
    if (Schema.isEmpty(id)) return undefined
    try {
      const result = await this.resolveDocumentIdentifier(id!)
      return result || undefined
    } catch {
      return undefined
    }
  }
}
