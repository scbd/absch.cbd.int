import Schema from './schema'
import type { IIRCCDocumentMap, IDocumentMap } from './types'

export default class IrccSchema extends Schema {
  getDocumentMap (): IIRCCDocumentMap {
    return {
      ...super.getDocumentMap(),
      absCNA: 'C',
    }
  }

  async parseXLSXFileToDocumentJson () {
    const map: IDocumentMap = this.mapXLSXFileDataToAttributeNames(this.getDocumentMap())
    const sheet :IIRCCDocumentMap = map as IIRCCDocumentMap
    return {
      header: {
        identifier: 'CB51626B-CF45-2AA0-3A24-459669DDCC34',
      },
      schema: 'absPermit',
      languages: [
        this.getLanguageCode(sheet.language)
      ],
      absCNA: {
        identifier: this.getDocumentIdentifierByUid(sheet.absCNA)
      },
      title: sheet.title,
      referenceToNationalPermit: {
        en: 'strsgfsgfdxgf'
      },
      dateOfIssuance: sheet.dateOfIssuance,
      providers: [
        {
          identifier: this.getProviderIdentifier(sheet.provider)
        }
      ],
      providersConfidential: this.getIsConfidential(sheet.provider.type),
      entitiesToWhomPICGranted: [
        {
          identifier: this.getDocumentIdentifier(sheet.pic)
        }
      ],
      entitiesToWhomPICGrantedConfidential: this.getIsConfidential(sheet.pic.type),
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
      picGranted: (sheet.pic.consent || '').toLowerCase() === 'yes',
      picInformation: {
        en: '<div><!--block-->asdfasdfasdf</div>'
      },
      picDocuments: [
        {
          url: 'https://www.google.com',
          name: 'Google',
          language: 'en'
        }
      ],
      matEstablished: sheet.matEstablished.toLowerCase() === 'yes',
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
      notes: this.getColumnValue(sheet.additionalInformation)
    }
  }
}
