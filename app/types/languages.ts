export type LanguageCode = 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh'

export type EnglishLanguageType = 'Arabic' | 'English' | 'Spanish' | 'French'
| 'Russian' | 'Chinese'

// TODO: Fix Francai typo
export type LanguageType = 'العربية' | '中文' | 'Español' | 'Françai' | 'Русский' | 'English'

export type LanguagesType = Record<LanguageCode, LanguageType>

export type EnglishLanguages = Record<LanguageCode, EnglishLanguageType>

export interface LanguageMapType {
  identifier: string
  name: LanguageType
}

export type Translations = (arg: string, message?: { msg: string })=> string
