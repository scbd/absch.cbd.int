import type { LanguagesType, EnglishLanguages } from '~/types/languages'

export const languages: LanguagesType = {
  ar: 'العربية',
  zh: '中文',
  en: 'English',
  es: 'Español',
  fr: 'Françai', // TODO: Fix this typo
  ru: 'Русский'
} as const

export const englishLanguages: EnglishLanguages = {
  ar: 'Arabic',
  zh: 'Chinese',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  ru: 'Russian'
} as const
