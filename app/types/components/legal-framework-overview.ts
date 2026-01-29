import type { LString } from '../languages'
import type { ETerm, Header } from '../common/documents'
// Types
export interface LegalFrameworkDocument {
  notes?: string
  government?: ETerm
  title: string | LString
  jurisdiction?: ETerm
  jurisdictionImplementation: LString
  countryEstablished: string
  geneticResources: string
  establishedMeasure: string
  agrMeasureForAccess: string
  agrSubjectToPic: string
  agrCommercialPermitRequired: string
  agrCommercialPermitException: string
  agrNonCommercialPermitRequired: string
  agrNonCommercialPermitException: string
  tkSubjectToPic: string
  tkMeasureForAccess: string
  tkCommercialPermitRequired: string
  tkCommercialPermitException: string
  tkNonCommercialPermitRequired: string
  tkNonCommercialPermitException: string
  article53Implemented: string
  article55Implemented: string
  header: Header
  status: string
}

export type Inject = (arg0: { getCleanDocument: (doc: LegalFrameworkDocument)=> LegalFrameworkDocument | undefined })=> undefined
