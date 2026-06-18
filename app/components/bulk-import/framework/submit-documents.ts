import type { LinkedRecordStore, ApiClient, RowProgress } from './types'
import type { DocumentRequest, SupportingDocument, SubDocumentTypes } from '~/types/common/documents'

export interface SubmitResult {
  imported: number
  failed: number
}

export async function submitDocuments(
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  api: ApiClient,
  onProgress: (progress: RowProgress) => void
): Promise<SubmitResult> {
  // Submit linked records first (contacts, etc.) — fire-and-wait, not fire-and-forget
  for (const record of linkedRecords) {
    try {
      await api.createDocumentDraft(record as DocumentRequest)
    } catch (err: unknown) {
      // Log but don't abort — a missing contact degrades the record, it doesn't block the import
      console.warn('[bulk-import] linked record failed:', err) // eslint-disable-line no-console
    }
  }

  let imported = 0
  let failed = 0

  for (let rowIndex = 0; rowIndex < documents.length; rowIndex++) {
    const doc = documents[rowIndex]
    try {
      await api.createDocumentDraft(doc)
      imported++
      onProgress({ rowIndex, status: 'ok' })
    } catch (err: unknown) {
      failed++
      const message = err instanceof Error ? err.message : String(err)
      onProgress({ rowIndex, status: 'error', message })
    }
  }

  return { imported, failed }
}
