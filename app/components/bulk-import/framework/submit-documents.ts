import type { LinkedRecordStore, TokenReader, RowProgress, PushProgress, DocBuildError } from './types'
import type { DocumentRequest } from '~/types/common/documents'
import { KmDraftsApi } from '~/api/km-document'

export interface SubmitResult {
  imported: number
  failed: number
}

function extractErrorMessage (err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'object' && err !== null && 'message' in err) return String((err as { message: unknown }).message)
  return String(err)
}

async function publishLinkedRecords (
  linkedRecords: LinkedRecordStore,
  api: KmDraftsApi,
  onPush?: (p: PushProgress)=> void
): Promise<Map<string, string>> {
  const failedIds = new Map<string, string>()
  const { length: total } = linkedRecords
  let current = 0
  for (const record of linkedRecords) {
    current += 1
    onPush?.({ label: 'linked', current, total })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- SubDocumentStore entries have header.identifier/schema at runtime
    const { header } = record as unknown as { header: { identifier: string; schema: string } }
    try {
      // eslint-disable-next-line no-await-in-loop -- sequential linked-record publish
      await api.publishDraft(header.schema, header.identifier, record, { isNew: true })
    } catch (err: unknown) {
      failedIds.set(header.identifier, err instanceof Error ? err.message : String(err))
    }
  }
  return failedIds
}

function referencesFailedLinkedRecord (doc: DocumentRequest, failedIds: Map<string, string>): string | undefined {
  function walk (value: unknown): string | undefined {
    if (value === null || value === undefined) return undefined
    if (Array.isArray(value)) return value.reduce<string | undefined>((acc, v) => acc ?? walk(v), undefined)
    if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- walking arbitrary document values at runtime
      const obj = value as Record<string, unknown>
      if (typeof obj['identifier'] === 'string' && failedIds.has(obj['identifier'])) return failedIds.get(obj['identifier'])
      return Object.values(obj).reduce<string | undefined>((acc, v) => acc ?? walk(v), undefined)
    }
    return undefined
  }
  return walk(doc)
}

export async function submitDocuments (
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  { tokenReader, realm, buildErrors }: { tokenReader: TokenReader; realm: string; buildErrors: DocBuildError[] },
  { onProgress, onPush }: { onProgress: (progress: RowProgress)=> void; onPush?: (push: PushProgress)=> void }
): Promise<SubmitResult> {
  const api = new KmDraftsApi({ tokenReader, realm })

  const buildErrorByRow = new Map(buildErrors.map(e => [e.row, e.message]))
  for (const [rowIndex, message] of buildErrorByRow) {
    onProgress({ rowIndex, status: 'error', message: `Failed to build document: ${message}` })
  }

  const failedLinkedIds = await publishLinkedRecords(linkedRecords, api, onPush)

  let imported = 0
  let failed = 0
  failed += buildErrorByRow.size
  const { length: total } = documents

  for (const [rowIndex, doc] of documents.entries()) {
    if (buildErrorByRow.has(rowIndex)) continue
    onPush?.({ label: 'document', current: rowIndex + 1, total })
    const linkedError = failedLinkedIds.size > 0 ? referencesFailedLinkedRecord(doc, failedLinkedIds) : undefined
    if (linkedError !== undefined) {
      failed += 1
      onProgress({ rowIndex, status: 'error', message: `Linked record failed to publish: ${linkedError}` })
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
      onProgress({ rowIndex, status: 'error', message: extractErrorMessage(err) })
    }
  }

  return { imported, failed }
}
