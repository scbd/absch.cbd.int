import { LanguageCode } from "../languages"

type KeywordTitle = {
  [key in LanguageCode]: string 
}

export type SubDocument = {
  identifier: string
}

export type ELink = {
  url: string
}

export type DocumentRequest = {
  header: {
    identifier: string
  }
}

export type KeywordType = {
  name: string
  title: KeywordTitle
  identifier: string
}

export type Keywords = {
  processedKeywords: Array<SubDocument>
  otherKeywords: string
}
export type UsageKey = 'commercial' | 'noncommercial'

export type UsageMapping = {
  [key in UsageKey]: string 
}
