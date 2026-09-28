import type { LanguageCode, LString } from '../languages'

// Types
export interface Term {
  identifier?: string
  customValue?: LString
}

export interface NrResponse {
  value?: string
  additionalInformation?: LString
}

export interface Faq {
  question?: LString
  answer?: LString
}

export interface Link {
  url?: string
  name?: LString
  tag?: string
  language?: string
}

export interface LegalFrameworkDocument {
  notes?: string
  title: string | LString
  header: {
    identifier: string,
    schema: string,
    languages: LanguageCode[]
  }
  status: string

  government?: Term
  jurisdiction?: Term
  jurisdictionImplementation?: LString

  establishedMeasure?: NrResponse

  agrSubjectToPic?: NrResponse
  agrCommercialPermitRequired?: NrResponse
  agrCommercialPermitException?: NrResponse
  agrNonCommercialPermitRequired?: NrResponse
  agrNonCommercialPermitException?: NrResponse

  iplcPresent?: NrResponse
  tkSubjectToPic?: NrResponse
  tkCommercialPermitRequired?: NrResponse
  tkCommercialPermitException?: NrResponse
  tkNonCommercialPermitRequired?: NrResponse
  tkNonCommercialPermitException?: NrResponse

  iplcDomesticLawRecognizesRight?: NrResponse
  iplcAccessBasedOnPic?: NrResponse
  iplcCommercialPermitRequired?: NrResponse
  iplcCommercialPermitException?: NrResponse
  iplcNonCommercialPermitRequired?: NrResponse
  iplcNonCommercialPermitException?: NrResponse

  article8ResearchSupport?: NrResponse
  article8SimplifiedAccessMeasures?: NrResponse
  article8Emergencies?: NrResponse
  article8FoodSecurity?: NrResponse

  article15Implemented?: NrResponse
  article16Implemented?: NrResponse
  article17Implemented?: NrResponse

  faqs?: Faq[]

  additionalInformation?: LString
  additionalDocuments?: Link[]
}

export type Inject = (arg0: { getCleanDocument: (doc: LegalFrameworkDocument)=> LegalFrameworkDocument | undefined })=> undefined
