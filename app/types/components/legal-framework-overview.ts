import type { LanguageCode, LString } from '../languages'
export interface ETerm {
  identifier: string
}
// Types
export interface LegalFrameworkDocument {
  notes?: string
  government?: ETerm
  title: string | LString
  jurisdiction?: ETerm
  jurisdictionImplementation: LString
  countryEstablished: string
  geneticResources: string
  establishedMesasure: string
  agrSubjectToPic: string
  agrCommercialPermitRequired: string
  agrCommercialPermitException: string
  agrNonCommercialPermitRequired: string
  agrNonCommercialPermitException: string
  tkSubjectToPic: string
  tkMesasureForAccess: string
  tkCommercialPermitRequired: string
  tkCommercialPermitException: string
  tkNonCommercialPermitRequired: string
  tkNonCommercialPermitException: string
  article53Implemented: string
  article55Implemented: string
  header: {
    identifier: string,
    schema: string,
    languages: LanguageCode[]
  }
  status: string
}

export type Inject = (arg0: { getCleanDocument: (doc: LegalFrameworkDocument)=> LegalFrameworkDocument | undefined })=> undefined
