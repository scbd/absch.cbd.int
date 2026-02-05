import type { DocumentData, ETerm, Header, QuestionData } from '../common/documents'
import type { LString } from '../languages'
// Types
export interface LegalFrameworkDocument extends DocumentData {
  government?: ETerm
  title: QuestionData
  jurisdiction?: ETerm
  customValue?: LString
  jurisdictionImplementation: LString
  countryEstablished: QuestionData
  geneticResources: QuestionData
  establishedMeasure: QuestionData
  agrMeasureForAccess: QuestionData
  agrSubjectToPic: QuestionData
  agrCommercialPermitRequired: QuestionData
  agrCommercialPermitException: QuestionData
  agrNonCommercialPermitRequired: QuestionData
  agrNonCommercialPermitException: QuestionData
  tkSubjectToPic: QuestionData
  tkMeasureForAccess: QuestionData
  tkCommercialPermitRequired: QuestionData
  tkCommercialPermitException: QuestionData
  tkNonCommercialPermitRequired: QuestionData
  tkNonCommercialPermitException: QuestionData
  article53Implemented: QuestionData
  article55Implemented: QuestionData
  header: Header
  status: QuestionData
}

export type Inject = (arg0: { getCleanDocument: (doc: LegalFrameworkDocument)=> LegalFrameworkDocument | undefined })=> undefined
