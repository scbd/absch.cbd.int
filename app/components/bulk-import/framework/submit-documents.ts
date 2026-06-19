import type { LinkedRecordStore, ApiClient, RowProgress } from './types'
import type { DocumentRequest } from '~/types/common/documents'

export interface SubmitResult {
  imported: number
  failed: number
}

export async function submitDocuments (
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  api: ApiClient,
  onProgress: (progress: RowProgress)=> void
): Promise<SubmitResult> {
  // Submit linked records first (contacts, etc.) — fire-and-wait, not fire-and-forget
  for (const record of linkedRecords) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have header.identifier/schema at runtime
    const { header } = record as unknown as { header: { identifier: string; schema: string } }
    try {
      // eslint-disable-next-line no-await-in-loop -- sequential linked-record submit
      await api.saveDraft(header.identifier, record, header.schema)
    } catch (err: unknown) {
      // Log but don't abort — a missing contact degrades the record, it doesn't block the import
      console.warn('[bulk-import] linked record failed:', err) // eslint-disable-line no-console -- intentional warning visible in dev tools
    }
  }

  let imported = 0
  let failed = 0

  for (const [rowIndex, doc] of documents.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- DocumentRequest always has header.identifier/schema set by schema builders
    const { header } = doc as unknown as { header: { identifier: string; schema: string } }
    try {
      // eslint-disable-next-line no-await-in-loop -- documents must be submitted sequentially to track per-row progress
      await api.saveDraft(header.identifier, doc, header.schema)
      imported += 1
      onProgress({ rowIndex, status: 'ok' })
    } catch (err: unknown) {
      failed += 1
      const message = err instanceof Error ? err.message : String(err)
      onProgress({ rowIndex, status: 'error', message })
    }
  }

  return { imported, failed }
}
