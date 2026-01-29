import type { LanguageCode } from '../languages'
export interface ETerm {
  identifier: string
}

export interface Header {
  identifier: string,
  schema: string,
  languages: LanguageCode[]
}
