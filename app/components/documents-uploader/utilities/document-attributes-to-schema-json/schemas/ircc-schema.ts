import Schema from './schema'
import type { DocError, DocumentAttributes, IIRCCDocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import type {
  DocumentStore, EmptyDocumentRequest, SubDocument,
  DocumentRequest, CreateMethod
} from '~/types/common/documents'

interface ParseError extends DocError {
  store: DocumentStore
}

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson (): Promise<DocumentStore> {
    const sheet: DocumentAttributes<IIRCCDocumentAttributes> = this.documentAttributes

    const Schema = IrccSchema

    let error: DocError | null = null
    const getError = (): DocError | null => error
    const handleError = (e: unknown): undefined => {
      const err: DocError = Object.assign({ row: -1, reason: '', name: 'Parse Error', message: '' }, e)

      error = err
    }

    const keywords = this.getKeywords(sheet.keywords)
    const { processedKeywords } = keywords
    const { otherKeywords } = keywords

    const absCNAIdentifier = await this.getDocumentIdentifierByGUID(sheet.absCNAId)
      .catch(handleError)
    const providers: SubDocument[] = await this.findContactOrGenerateId(sheet.provider)
      .catch((error: unknown) => { handleError(error); return [] })
    const entitiesToWhomPICGranted: SubDocument[] = await this.findContactOrGenerateId(sheet.pic)
      .catch((error: unknown) => { handleError(error); return [] })

    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateGUID(),
        schema: 'absPermit',
        languages: [this.language]
      },
      government: Schema.getSubDocument(sheet.country?.toLowerCase()),
      absCNA: Schema.getSubDocument(absCNAIdentifier),
      title: this.getLocaleValue(sheet.permitEquivalent),
      dateOfIssuance: Schema.parseDate(sheet.dateOfIssuance),
      dateOfExpiry: Schema.parseDate(sheet.dateOfExpiry),
      providersConfidential: Schema.getIsConfidential(sheet.provider?.type),
      entitiesToWhomPICGrantedConfidential: Schema.getIsConfidential(sheet.pic?.type),
      picGranted: Schema.parseTextToBoolean(sheet.pic?.consent),
      subjectMatter: this.getLocaleElement(sheet.subjectMatter),
      keywords: processedKeywords,
      otherKeywords,
      providers,
      entitiesToWhomPICGranted,
      matEstablished: Schema.parseTextToBoolean(sheet.matEstablished),
      usages: [
        {
          identifier: Schema.getUsageMapping(sheet.usage)
        }
      ],
      usagesConfidential: Schema.getIsConfidential(sheet.usage),
      usagesDescription: this.getLocaleElement(sheet.usageDescription),
      thirdPartyTransferCondition: this.getLocaleElement(sheet.conditionsThirdPartyTransfer),
      specimens: Schema.getELinkData(sheet.specimens),
      taxonomies: Schema.getELinkData(sheet.taxonomies),
      relevantInformation: sheet.additionalInformation
    }

    const doc = Schema.removeEmptyValues(data)
    const providerDocuments = providers.map((provider) => this.getContactSchema(sheet.provider, provider.identifier))
    const contactDocuments = entitiesToWhomPICGranted.map((contact) => this.getContactSchema(sheet.pic, contact.identifier))

    // To be called when the user as confirmed they want to create the document
    const create = async (create: CreateMethod, createDraft: CreateMethod): Promise<DocumentRequest> => {
      // Create contacts before attempting to create the document draft
      // NOTE: PIC is being created published document not as a draft.
      await Promise.all(contactDocuments.map(async (pic) => await create(pic)))
      // Create providers before attempting to create the document draft
      // NOTE: Provider is being created published document not as a draft.
      await Promise.all(providerDocuments.map(async (provider) => await create(provider)))
      return await createDraft(doc)
    }

    const store: DocumentStore = { create }

    if (getError() !== null) {
      const errorBase = { store, name: 'parse error', message: 'parse error' }
      const parseError: ParseError = Object.assign(errorBase, getError())
      console.warn(error) // eslint-disable-line no-console -- show error in console
      throw parseError
    }

    return store
  }
}
