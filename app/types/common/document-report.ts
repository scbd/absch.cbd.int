export interface QuestionMap {
  key: string
  number: string
  type: string
  title?: string
  options: Option[]
  multiple: boolean
}

export interface Option {
  value: string
  title: string
  type: string
  caption: string
  details?: string | Record<string, string>
  additionalInformation?: string | Record<string, string>
  url?: string
  name?: string
  tag?: string
  language?: string
  icon?: string
  target?: string
}

export type DocumentData = Record<string, { value: string }>

export interface Question {
  values: Option[],
  data: QuestionMap
}

export interface ReportSection {
  key: string
  title: string
  questions: QuestionMap[]
}
