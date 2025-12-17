import Schema from './schema'
import type { DocError, DocumentAttributes, IIRCCDocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import type { DocumentRequest, EmptyDocumentRequest } from '~/types/common/documents'

interface ParseError extends DocError {
  data: EmptyDocumentRequest
}

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson (): Promise<DocumentRequest> {
    const sheet: DocumentAttributes<IIRCCDocumentAttributes> = this.documentAttributes

    const Schema = IrccSchema

    let error: DocError | null = null
    const getError = (): DocError | null => error
    const handleError = (err: DocError): undefined => {
      error = err
    }

    const keywords = this.getKeywords(sheet.keywords)
    const { processedKeywords } = keywords
    const { otherKeywords } = keywords

    const absCNAIdentifier = await this.getDocumentIdentifierByGUID(sheet.absCNAId)
      .catch(handleError)
    const provider = await this.findOrCreateContact(sheet.provider)
      .catch(handleError)
    const entitiesToWhomPICGranted = await this.findOrCreateContact(sheet.pic)
      .catch(handleError)

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
      provider,
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

    if (getError() !== null) {
      const errorBase = { data, name: 'parse error', message: 'parse error' }
      const parseError: ParseError = Object.assign(errorBase, getError())
      console.warn(error) // eslint-disable-line no-console -- show error in console
      throw parseError
    }

    return Schema.removeEmptyValues(data)
  }
}
