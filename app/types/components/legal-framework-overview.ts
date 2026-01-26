import type { LanguageCode, LString } from '../languages'
// Types
export interface LegalFrameworkDocument {
  notes?: string
  countries: string
  title: string | LString
  header: {
    identifier: string,
    schema: string,
    languages: LanguageCode[]
  }
  status: string
}

export type Inject = (arg0: { getCleanDocument: (doc: LegalFrameworkDocument)=> LegalFrameworkDocument | undefined })=> undefined
