import Schema from './schema'
import type { IIRCCDocumentAttributes } from '~/types/components/documents-uploader/document-schema'

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson () {
    const sheet: IIRCCDocumentAttributes = this.documentAttributes as IIRCCDocumentAttributes

    const Schema = IrccSchema

    const keywords = this.getKeywords(sheet.keywords)
    const processKeywords = await keywords.processedKeywords
    const { otherKeywords } = keywords
    return {
      type: 'organization',
      header: {
        identifier: Schema.generateGUID(),
        schema: 'absPermit',
        languages: [this.language]
      },
      absCNA: {
        identifier: await Schema.getDocumentIdentifierByGUID(sheet.absCNAId)
      },
      title: {
        [this.language]: sheet.permitEquivalent
      },
      dateOfIssuance: Schema.parseDate(sheet.dateOfIssuance),
      dateOfExpiry: Schema.parseDate(sheet.dateOfExpiry),
      providers: await Schema.findOrCreateContact(sheet.provider.existing),
      providersConfidential: Schema.getIsConfidential(sheet.provider.type),
      entitiesToWhomPICGranted: await Schema.findOrCreateContact(sheet.pic.existing),
      entitiesToWhomPICGrantedConfidential: Schema.getIsConfidential(sheet.pic.type),
      picGranted: Schema.parseTextToBoolean(sheet.pic.consent),
      subjectMatter: {
        [this.language]: Schema.getAsHtmlElement(sheet.subjectMatter)
      },
      keywords: processKeywords,
      otherKeywords,
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
  }
}
