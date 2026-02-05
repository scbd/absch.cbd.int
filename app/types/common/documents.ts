import type { LanguageCode, LString } from '../languages'
export interface Link {
  url?: string
  language: string
  target?: string
  icon?: string
  name?: string
  tag?: string
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
