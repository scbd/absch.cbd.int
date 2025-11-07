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
  [key in LanguageType]: LanguageCode;
}

export interface IMapData {
  [key: string]: string | IMapData;
}

export type SubjectMatter = {
  [key in LanguageCode]: string;
}

export type FileReference = {
  url: string;
  name: string;
  language: LanguageCode;
}
