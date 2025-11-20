import { DocumentTypes } from './document-types-list'
import { DocumentAttributesMap, KeywordType } from './xlsx-file-to-document-attributes'

export interface IKeyword {
  identifier: string;
  name: string;
  title: { [key: string]: string };
  shortTitle: { [key: string]: string };
  description: string;
  source: string;
  broaderTerms: string[];
  narrowerTerms: string[];
  relatedTerms: string[];
  nonPreferedTerms: string[];
}

export type LanguageCode = 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh'

export type LanguageType = 'arabic' | 'english' | 'spanish' | 'french' | 'russian' | 'chinese'

export type LanguageMapType = {
  identifier: string
  name: LanguageType
}

export interface IMapData {
  [key: string]: string | IMapData;
}

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
  languageMap: Array<LanguageMapType>
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

export type DocumentKeys = keyof IIRCCDocumentAttributes
export type AttributeValue = string | IContactFields

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
