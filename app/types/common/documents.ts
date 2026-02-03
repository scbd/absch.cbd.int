import type { LanguageCode, LString } from '../languages'
<<<<<<< HEAD
export interface Link {
  url?: string
  language: string
  target?: string
  icon?: string
  name?: string
  tag?: string
=======
export interface ETerm {
  identifier: string
>>>>>>> 569404052 (initial setup of review page CHM-879)
}

// Document value that is fetched from the server.
export interface QuestionData {
  value: string | LString
  additionalInformation?: string | LString,
  title?: string | LString
  type?: string
  caption?: string
  details?: LString | string
  links?: Link[]
}

export type DocumentData = Record<string, QuestionData | QuestionData[] | undefined | LString>

export interface ETerm extends QuestionData {
  identifier: string
  name?: string
  customValue?: string
}

export interface Header extends QuestionData {
  identifier: string,
  schema: string,
  languages: LanguageCode[]
}

export interface QuestionData {
  value: number | string | LString | undefined | null,
  additionalInformation?: string | LString,
  details?: string | LString,
  title?: string
}
