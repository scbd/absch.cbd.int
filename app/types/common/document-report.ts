import type { LanguageCode, LString } from '../languages'
import type { DocumentData, QuestionData, ETerm, Header } from './documents'

export interface Validation {
  question: keyof DocumentData
  values: Array<string | ETerm | LString | Header | Partial<Record<LanguageCode, string>>>
  trigger: string
  type: string
}

export interface QuestionMap<Map extends DocumentData> {
  validations?: Validation[]
  key: keyof Map
  type: string
  number?: string
  title?: string
  options?: QuestionData[]
  multiple?: boolean
  section?: string
  bold?: boolean
  mandatory?: boolean
}

export interface Question {
  values: QuestionData[],
  data: QuestionMap<DocumentData>
}

export interface ReportSection {
  key: string
  title: string
  questions?: Array<QuestionMap<DocumentData> | ReportSection>
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

export interface QuestionProps {
  value?: LString | number | string
  locales?: string[] | LanguageCode[]
  html?: boolean
  title?: string
}
