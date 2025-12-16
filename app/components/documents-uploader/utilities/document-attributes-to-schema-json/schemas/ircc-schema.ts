import Schema from './schema'
import type { DocError, IIRCCDocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import type { DocumentRequest, EmptyDocumentRequest } from '~/types/common/documents'

let error: DocError | null = null
interface ParseError extends Error {
  data: EmptyDocumentRequest
}

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson (): Promise<DocumentRequest> {
    const sheet: IIRCCDocumentAttributes = this.documentAttributes as IIRCCDocumentAttributes

    const Schema = IrccSchema

    error = null
    const handleError = (err: DocError): undefined => {
      error = err
    }

    const keywords = this.getKeywords(sheet.keywords)
    const { processedKeywords } = keywords
    const { otherKeywords } = keywords

    const absCNAIdentifier = await this.getDocumentIdentifierByGUID(sheet.absCNAId)
      .catch(handleError)
    const provider = await this.findOrCreateContact(sheet.provider.existing)
      .catch(handleError)
    const entitiesToWhomPICGranted = await this.findOrCreateContact(sheet.pic.existing)
      .catch(handleError)

    const data: EmptyDocumentRequest = {
      header: {
        identifier: Schema.generateGUID(),
        schema: 'absPermit',
        languages: [this.language]
      },
      absCNA: { identifier: absCNAIdentifier },
      title: {
        [this.language]: sheet.permitEquivalent
      },
      dateOfIssuance: Schema.parseDate(sheet.dateOfIssuance),
      dateOfExpiry: Schema.parseDate(sheet.dateOfExpiry),
      providersConfidential: Schema.getIsConfidential(sheet.provider.type),
      entitiesToWhomPICGrantedConfidential: Schema.getIsConfidential(sheet.pic.type),
      picGranted: Schema.parseTextToBoolean(sheet.pic.consent),
      subjectMatter: {
        [this.language]: Schema.getAsHtmlElement(sheet.subjectMatter)
      },
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
      usagesDescription: {
        [this.language]: Schema.getAsHtmlElement(sheet.usageDescription)
      },
      thirdPartyTransferCondition: {
        [this.language]: Schema.getAsHtmlElement(sheet.conditionsThirdPartyTransfer)
      },
      specimens: Schema.getELinkData(sheet.specimens),
      taxonomies: Schema.getELinkData(sheet.taxonomies),
      relevantInformation: sheet.additionalInformation
    }

    if (error !== null) {
      const parseError: ParseError = Object.assign(error, { data })
      throw parseError
    }

    return data
  }
}
