import Schema from '../schema'
import type { IContactFields, IIRCCDocumentAttributes } from './types'

export default class IrccSchema extends Schema {
  async parseXLSXFileToDocumentJson () {
    const sheet: IIRCCDocumentAttributes = this.xlsxFileData as IIRCCDocumentAttributes

    const Schema = IrccSchema
    return {
      header: {
        identifier: 'CB51626B-CF45-2AA0-3A24-459669DDCC34',
      },
      Schema: 'absPermit',
      languages: [
        Schema.getLanguageCode(sheet.language)
      ],
      absCNA: {
        identifier: await Schema.getDocumentIdentifierByUid(sheet.absCNAId)
      },
      title: sheet.permitEquivalent,
      referenceToNationalPermit: {
        [this.language]: 'strsgfsgfdxgf'
      },
      dateOfIssuance: sheet.dateOfIssuance,
      providers: [
        {
          identifier: Schema.getProviderIdentifier(sheet.provider as IContactFields)
        }
      ],
      providersConfidential: Schema.getIsConfidential(sheet.provider as IContactFields),
      entitiesToWhomPICGranted: [
        {
          identifier: Schema.getDocumentIdentifier(sheet.pic as IContactFields)
        }
      ],
      entitiesToWhomPICGrantedConfidential: Schema.getIsConfidential(sheet.pic as IContactFields),
      subjectMatter: {
        [this.language]: this.getSubjectMatter(sheet.subjectMatter)
      },
      subjectMatterConfidential: true,
      keywords: [
        {
          identifier: '357DBB22-6A6C-4C49-BA1F-037320B09247'
        }
      ],
      specimens: this.parseFileReference(sheet.specimens),
      taxonomies: this.parseFileReference(sheet.taxonomies),
      picGranted: Schema.parseTextToBoolean(((sheet.pic as IContactFields).consent)),
      picInformation: {
        [this.language]: '<div><!--block-->asdfasdfasdf</div>'
      },
      picDocuments: [
        {
          url: 'https://www.google.com',
          name: 'Google',
          language: 'en'
        }
      ],
      matEstablished: Schema.parseTextToBoolean(sheet.matEstablished as string),
      matInformation: {
        en: '<div><!--block-->asdf</div>'
      },
      matDocuments: this.parseFileReference(sheet.matEstablished),
      usages: [
        {
          identifier: '5E833A3F-87D1-4ADD-8701-9F1B76383017'
        }
      ],
      usagesConfidential: true,
      usagesDescription: {
        en: '<div><!--block-->asdf</div>'
      },
      thirdPartyTransferCondition: {
        en: '<div><!--block-->asdf</div>'
      },
      dateOfExpiry: '2024-07-16',
      permitFiles: this.parseFileReference(sheet.permitFiles),
      notes: sheet.additionalInformation
    }
  }
}
