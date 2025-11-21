import { DocumentTypes } from './document-types-list'
import { DocumentAttributesMap, KeywordType } from './xlsx-file-to-document-attributes'

type SubDocument = {
  identifier: string
}

export type Keywords = {
  processedKeywords: Promise<Array<SubDocument>>
  otherKeywords: string
}

export type ELink = {
  url: string
}

export type DocumentJsonType = {
  header: {
    identifier: string
  }
}

export type MapToJsonParams = {
  attributesList: Array<DocumentAttributesMap>
  documentType: DocumentTypes
  keywordsMap: Array<KeywordType>
}

export interface IContactFields {
  type: string;
  existing: string;
  orgName: string;
  acronym: string;
  address: string;
  city: string;
  country: string;
  email: string;
  consent: string;
}

export interface IIRCCDocumentAttributes extends Record<string, string | IContactFields> {
  language: string;
  absCNAId: string;
  permitEquivalent: string;
  dateOfIssuance: string;
  dateOfExpiry: string;
  provider: IContactFields;
  pic: IContactFields;
  matEstablished: string;
  subjectMatter: string;
  keywords: string;
  specimens: string;
  taxonomies: string;
  usage: string;
  usageDescription: string;
  conditionsThirdPartyTransfer: string;
  permitFiles: string;
  additionalInformation: string;
}
