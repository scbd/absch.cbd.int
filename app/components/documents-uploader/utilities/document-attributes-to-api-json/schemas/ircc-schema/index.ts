import Schema from '../schema'
import type { IIRCCDocumentAttributes } from './types'

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson () {
    const sheet: IIRCCDocumentAttributes = this.documentAttributes as IIRCCDocumentAttributes

    const Schema = IrccSchema

    return {
      type: 'organization',
      header: {
        identifier: Schema.generateUID(),
        schema: 'absPermit',
        languages: [Schema.getLanguageCode(sheet.language)]
      },
      absCNA: {
        identifier: await Schema.getDocumentIdentifierByUid(sheet.absCNAId)
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
      keywords: Schema.getKeywords(sheet.keywords).processedKeywords,
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
