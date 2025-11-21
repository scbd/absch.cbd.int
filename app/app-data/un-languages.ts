export const languages = {
  ar: 'العربية',
  zh: '中文',
  en: 'English',
  es: 'Español',
  fr: 'Françai', // TODO: Fix this typo
  ru: 'Русский'
} as LanguagesType

export const englishLanguages = {
  ar: 'Arabic',
  zh: 'Chinese',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  ru: 'Russian'
} as EnglishLanguagesType

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
