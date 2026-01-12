import type { LanguageCode } from '../languages'

export interface Link {
  url?: string
  language: string
  target?: string
  icon?: string
  name?: string
  tag?: string
}

export interface QuestionMap {
  key: string
  number: string
  type: string
  title?: string
  options?: DocumentValue[]
  multiple: boolean
}

export interface DocumentValue {
  value: string | Record<string, string>
  title?: string
  type?: string
  caption?: string
  details?: string | Record<string, string>
  additionalInformation?: string | Record<string, string>
  url?: string
  name?: string
  tag?: string
  links?: Link[]
}

interface QuestionData { value: string | Record<LanguageCode, string> }

export type DocumentData = Record<string, QuestionData | QuestionData[]>

export interface Question {
  values: DocumentValue[],
  data: QuestionMap
}

export interface ReportSection {
  key: string
  title: string
  questions?: Array<QuestionMap | ReportSection>
}

interface CountryRecordDoc {
  id: string
  url_ss: string
  rec_date: string
  uniqueIdentifier_s: string
}

export interface CountryRecord {
  key: string
  docs: CountryRecordDoc[]
  shortCode: string
}
