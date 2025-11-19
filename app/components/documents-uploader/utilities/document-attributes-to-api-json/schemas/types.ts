import { DocumentTypes } from '../../../data/document-types-list'
import { DocumentAttributesMap, KeywordType } from '../../xlsx-file-to-document-attributes/types'

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

export type ApiDocumentType = {
  header: {
    identifier: string
  }
}

export type MapToJsonParams = {
  documents: Array<DocumentAttributesMap>
  documentType: DocumentTypes
  languageMap: Array<LanguageMapType>
  keywordsMap: Array<KeywordType>
}
