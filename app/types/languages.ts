export type LanguageCode = 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh'

export type EnglishLanguageType = 'Arabic' | 'English' | 'Spanish' | 'French'
| 'Russian' | 'Chinese'

// TODO: Fix Francai typo
export type LanguageType = 'العربية' | '中文' | 'Español' | 'Françai' | 'Русский' | 'English'

export type LanguagesType = {
  [key in LanguageCode]: LanguageType
}

export type EnglishLanguagesType = {
  [key in LanguageCode]: EnglishLanguageType
}

export type LanguageMapType = {
  identifier: string
  name: LanguageType
}

export type Translations = (arg: string) => string
