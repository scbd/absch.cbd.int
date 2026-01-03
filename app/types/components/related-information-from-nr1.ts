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

export interface AnalyzerMap {
  type: string
  dataUrl: string
}

export interface RelatedQuestionsList {
  questions: string[]
  key: string
}
