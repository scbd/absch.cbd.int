type SubDocument = {
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
  identifier: string
}

export type Keywords = {
  processedKeywords: Array<SubDocument>
  otherKeywords: string
}

export type UsageKey = 'COMMERCIAL' | 'NONCOMMERCIAL'

export type UsageMapping = {
  [key in UsageKey]: string 
}
