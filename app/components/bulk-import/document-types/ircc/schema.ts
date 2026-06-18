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
  constructor(row: RawRow, linkedRecords: LinkedRecordStore, api: ApiClient, rawLanguage: string) {
    super(row, linkedRecords, api, rawLanguage)
  }

  override async buildSchemaDocument(): Promise<DocumentRequest> {
    const keywordsMap = await fetchKeywords()

    const absCNAIdentifier = await this.resolveAbsCna()
    const providers = await this.findContactOrCreate(this.contactFromRow('provider'))
    const entitiesToWhomPICGranted = await this.findContactOrCreate(this.contactFromRow('pic'))
    const { processedKeywords, otherKeywords } = this.getKeywords(
      this.str('keywords'), keywordsMap
    )

    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateId(),
        schema: 'absPermit',
        languages: [this.language]
      },
      government:                            Schema.getSubDocument(this.str('country')?.toLowerCase()),
      absCNA:                                Schema.getSubDocument(absCNAIdentifier),
      title:                                 this.getLocaleValue(this.str('permitEquivalent')),
      dateOfIssuance:                        Schema.parseDate(this.str('dateOfIssuance')),
      dateOfExpiry:                          Schema.parseDate(this.str('dateOfExpiry')),
      providersConfidential:                 Schema.getIsConfidential(this.nestedStr('provider', 'type')),
      entitiesToWhomPICGrantedConfidential:  Schema.getIsConfidential(this.nestedStr('pic', 'type')),
      picGranted:                            Schema.parseTextToBoolean(this.nestedStr('pic', 'consent')),
      subjectMatter:                         this.getLocaleElement(this.str('subjectMatter')),
      keywords:                              processedKeywords,
      keywordOther:                          this.getLocaleValue(otherKeywords.trim() || undefined),
      providers,
      entitiesToWhomPICGranted,
      matEstablished:                        Schema.parseTextToBoolean(this.str('matEstablished')),
      usages:                                [{ identifier: Schema.getUsageMapping(this.str('usage')) }],
      usagesConfidential:                    Schema.getIsConfidential(this.str('usage')),
      usagesDescription:                     this.getLocaleElement(this.str('usageDescription')),
      thirdPartyTransferCondition:           this.getLocaleElement(this.str('conditionsThirdPartyTransfer')),
      specimens:                             Schema.getELinkData(this.str('specimens')),
      taxonomies:                            Schema.getELinkData(this.str('taxonomies')),
      relevantInformation:                   this.str('additionalInformation')
    }

    return Schema.removeEmptyValues(data)
  }

  private str(key: string): string | undefined {
    const v = this.row[key]
    return typeof v === 'string' ? v : undefined
  }

  private nestedStr(group: string, key: string): string | undefined {
    const v = this.row[`${group}.${key}`]
    return typeof v === 'string' ? v : undefined
  }

  private contactFromRow(prefix: string): IContactFields | undefined {
    const type = this.nestedStr(prefix, 'type')
    if (Schema.isEmpty(type)) return undefined
    return {
      type,
      existing:  this.nestedStr(prefix, 'existing'),
      orgName:   this.nestedStr(prefix, 'orgName'),
      acronym:   this.nestedStr(prefix, 'acronym'),
      address:   this.nestedStr(prefix, 'address'),
      city:      this.nestedStr(prefix, 'city'),
      country:   this.nestedStr(prefix, 'country'),
      email:     this.nestedStr(prefix, 'email'),
      consent:   this.nestedStr(prefix, 'consent')
    }
  }

  private async resolveAbsCna(): Promise<string | undefined> {
    const id = this.str('absCNAId')
    if (Schema.isEmpty(id)) return undefined
    try {
      const result = await this.resolveDocumentIdentifier(id!)
      return result || undefined
    } catch {
      return undefined
    }
  }
}
