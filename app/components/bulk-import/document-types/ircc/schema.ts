import { Schema } from '../../framework/schema'
import { findContactOrCreate } from '../../framework/contact-utils'
import type { DocumentRequest, EmptyDocumentRequest, IContactFields, SubDocument, UsageKey } from '~/types/common/documents'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error js module
import SolrApi from '~/api/solr'
import { THESAURUS_DOMAINS, THESAURUS_TERMS } from '~/constants/thesaurus'
import type { LanguageCode } from '~/types/languages'

interface KeywordType {
  name: string
  title: Partial<Record<LanguageCode, string>>
  identifier: string
}

let keywordsCache: KeywordType[] | null = null

async function fetchKeywords (): Promise<KeywordType[]> {
  if (keywordsCache !== null) return keywordsCache
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- ThesaurusApi is a JS module
  const api = new ThesaurusApi()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- ThesaurusApi is a JS module
  const terms = await api.getDomainTerms(THESAURUS_DOMAINS.ABS_PERMIT_KEYWORD) as KeywordType[]
  keywordsCache = Array.isArray(terms) ? terms : []
  return keywordsCache
}

export class IrccSchema extends Schema {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- SolrApi is a JS module
  private readonly solrApi = new SolrApi({})

  static getIsConfidential (value: string | undefined | null): boolean {
    if (typeof value !== 'string') return true
    return value.toLowerCase() === 'confidential'
  }

  static getUsageMapping (usage: string | undefined): string {
    if (Schema.isEmpty(usage)) return ''
    if (IrccSchema.getIsConfidential(usage)) return ''
    const key = usage.replace('-', '').toUpperCase()
    const usageKey: UsageKey = (key === 'NONCOMMERCIAL' || key === 'COMMERCIAL') ? key : 'NONCOMMERCIAL'
    return THESAURUS_TERMS[usageKey]
  }

  private getKeywords (keywordsValue: string | undefined, keywordsMap: KeywordType[]): { processedKeywords: SubDocument[]; otherKeywords: string } {
    if (Schema.isEmpty(keywordsValue)) return { processedKeywords: [], otherKeywords: '' }

    const processedKeywords: SubDocument[] = []
    let otherKeywords = ''

    for (const raw of keywordsValue.trim().split(',')) {
      const val = raw.toLowerCase().trim()
      if (val === '') continue

      const match = keywordsMap.find(kw => {
        if (kw.identifier === raw.trim()) return true
        const name = typeof kw.title === 'object' ? kw.title[this.language] : kw.name
        return String(name).toLowerCase().trim() === val
      })

      if (match === undefined) {
        processedKeywords.push({ identifier: THESAURUS_TERMS.ABS_OTHER_KEYWORD })
        otherKeywords += ` ${raw}`
      } else {
        processedKeywords.push({ identifier: match.identifier.toUpperCase() })
      }
    }

    return { processedKeywords, otherKeywords }
  }

  override async buildSchemaDocument (): Promise<DocumentRequest> {
    const keywordsMap = await fetchKeywords()

    const countryIso = await Schema.resolveCountryIso(this.columnValue('country'))
    const contactOpts = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- SolrApi is a JS module
      solrApi: this.solrApi,
      countryIso,
      language: this.language,
      getLocaleValue: this.getLocaleValue.bind(this),
      resolveDocumentIdentifier: this.resolveDocumentIdentifier.bind(this)
    }

    const providers = await findContactOrCreate(this.contactFromRow('provider'), this.linkedRecords, contactOpts)
    const entitiesToWhomPICGranted = await findContactOrCreate(this.contactFromRow('pic'), this.linkedRecords, contactOpts)
    const { processedKeywords, otherKeywords } = this.getKeywords(this.columnValue('keywords'), keywordsMap)

    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateId(),
        schema: 'absPermit',
        languages: [this.language]
      },
      government: Schema.toETerm(countryIso),
      absCNA: Schema.toEReference(await this.resolveAbsCna()),
      title: this.getLocaleValue(this.columnValue('permitEquivalent')),
      dateOfIssuance: Schema.parseDate(this.columnValue('dateOfIssuance')),
      dateOfExpiry: Schema.parseDate(this.columnValue('dateOfExpiry')),
      providersConfidential: IrccSchema.getIsConfidential(this.nestedColumnValue('provider', 'type')),
      entitiesToWhomPICGrantedConfidential: IrccSchema.getIsConfidential(this.nestedColumnValue('pic', 'type')),
      picGranted: Schema.parseTextToBoolean(this.nestedColumnValue('pic', 'consent')),
      subjectMatter: this.getTextToHtml(this.columnValue('subjectMatter')),
      keywords: processedKeywords,
      keywordOther: this.getLocaleValue(otherKeywords.trim() === '' ? undefined : otherKeywords.trim()),
      providers,
      entitiesToWhomPICGranted,
      matEstablished: Schema.parseTextToBoolean(this.columnValue('matEstablished')),
      usages: [{ identifier: IrccSchema.getUsageMapping(this.columnValue('usage')) }],
      usagesConfidential: IrccSchema.getIsConfidential(this.columnValue('usage')),
      usagesDescription: this.getTextToHtml(this.columnValue('usageDescription')),
      thirdPartyTransferCondition: this.getTextToHtml(this.columnValue('conditionsThirdPartyTransfer')),
      specimens: Schema.getELinkData(this.columnValue('specimens')),
      taxonomies: Schema.getELinkData(this.columnValue('taxonomies')),
      relevantInformation: this.getTextToHtml(this.columnValue('additionalInformation'))
    }

    return Schema.removeEmptyValues(data)
  }

  private contactFromRow (prefix: string): IContactFields | undefined {
    const type = this.nestedColumnValue(prefix, 'type')
    if (Schema.isEmpty(type)) return undefined
    return {
      type,
      existing: this.nestedColumnValue(prefix, 'existing'),
      orgName: this.nestedColumnValue(prefix, 'orgName'),
      acronym: this.nestedColumnValue(prefix, 'acronym'),
      address: this.nestedColumnValue(prefix, 'address'),
      city: this.nestedColumnValue(prefix, 'city'),
      country: this.nestedColumnValue(prefix, 'country'),
      email: this.nestedColumnValue(prefix, 'email'),
      consent: this.nestedColumnValue(prefix, 'consent')
    }
  }

  private async resolveAbsCna (): Promise<string | undefined> {
    const id = this.columnValue('absCNAId')
    if (Schema.isEmpty(id)) return undefined
    try {
      const result = await this.resolveDocumentIdentifier(id)
      return result === '' ? undefined : result
    } catch {
      return undefined
    }
  }
}
