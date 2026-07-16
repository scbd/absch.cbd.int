import type { KmDocumentsApi } from '~/api/km-document'

export const EXISTING_ID_REGEXP = /^[a-z]+-[a-z]+-[a-z]+-(?<documentId>\d+)(?:-(?<revision>\d{1,3}))?$/i

export interface LinkedRecordVerification {
  exists: boolean
  government?: string
  schema?: string
}

// Verifies a uid that references an existing published record (e.g. "ABSCH-CNA-XX-123456-1"):
// confirms the document exists on the server and reports its government and schema so
// callers can cross-check ownership and record type.
export async function verifyLinkedRecord (uid: string, api: KmDocumentsApi): Promise<LinkedRecordVerification> {
  const { documentId } = EXISTING_ID_REGEXP.exec(uid)?.groups ?? {}
  if (documentId === undefined) return { exists: false }
  const doc = await api.get(documentId).catch(() => undefined)
  if (doc === undefined || doc === null || typeof doc !== 'object') {
    return { exists: false }
  }
  const { government, header } = doc as { government?: { identifier?: string }, header?: { schema?: string } }
  return { exists: true, government: government?.identifier, schema: header?.schema }
}

// When either government is unknown, ownership can't be verified — assume owner.
export function isUserRecordOwner (record: LinkedRecordVerification, userGovernment?: string): boolean {
  if (userGovernment === undefined || record.government === undefined) return true
  return record.government.toLowerCase() === userGovernment.toLowerCase()
}
