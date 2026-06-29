import type { LinkedRecordStore, TokenReader, RowProgress } from './types'
import type { DocumentRequest } from '~/types/common/documents'
import { KmDraftsApi } from '~/api/km-document'

export interface SubmitResult {
  imported: number
  failed: number
}

async function publishLinkedRecords (
  linkedRecords: LinkedRecordStore,
  api: KmDraftsApi
): Promise<Set<string>> {
  const failedIds = new Set<string>()
  for (const record of linkedRecords) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have header.identifier/schema at runtime
    const { header } = record as unknown as { header: { identifier: string; schema: string } }
    try {
      // eslint-disable-next-line no-await-in-loop -- sequential linked-record publish
      await api.publishDraft(header.schema, header.identifier, record)
    } catch {
      failedIds.add(header.identifier)
    }
  }
  return failedIds
}

function referencesFailedLinkedRecord (doc: DocumentRequest, failedIds: Set<string>): boolean {
  function walk (value: unknown): boolean {
    if (value === null || value === undefined) return false
    if (Array.isArray(value)) return value.some(walk)
    if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- walking arbitrary document values at runtime
      const obj = value as Record<string, unknown>
      if (typeof obj['identifier'] === 'string' && failedIds.has(obj['identifier'])) return true
      return Object.values(obj).some(walk)
    }
    return false
  }
  return walk(doc)
}

export async function submitDocuments (
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  tokenReader: TokenReader,
  onProgress: (progress: RowProgress)=> void
): Promise<SubmitResult> {
  const api = new KmDraftsApi({ tokenReader })
  const failedLinkedIds = await publishLinkedRecords(linkedRecords, api)

  let imported = 0
  let failed = 0

  for (const [rowIndex, doc] of documents.entries()) {
    if (failedLinkedIds.size > 0 && referencesFailedLinkedRecord(doc, failedLinkedIds)) {
      failed += 1
      onProgress({ rowIndex, status: 'error', message: 'A linked record (e.g. contact) failed to publish' })
      continue
    }

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
