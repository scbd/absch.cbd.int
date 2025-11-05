
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

// export interface ILanguageMapType {
//      arabic: LanguageCode,
//      english: LanguageCode,
//  spanish: LanguageCode,
//  french: LanguageCode,
//  russian: LanguageCode,
//  chinese: LanguageCode
//}
