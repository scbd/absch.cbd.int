export type LanguageCode = 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh'

export type EnglishLanguageType = 'Arabic' | 'English' | 'Spanish' | 'French'
| 'Russian' | 'Chinese'

// TODO: Fix Francai typo
export type LanguageType = 'العربية' | '中文' | 'Español' | 'Françai' | 'Русский' | 'English'

export type GetKeys = ()=> LanguageCode[]

export interface ILanguagesType extends Record<LanguageCode, LanguageType> {
  keys?: GetKeys
}

export interface IEnglishLanguages extends Record<LanguageCode, EnglishLanguageType> {
  keys?: GetKeys
}

export interface LanguageMapType {
  identifier: string
  name: LanguageType
}
export type Translations = (arg: string)=> string
