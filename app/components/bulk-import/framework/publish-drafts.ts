import type { TokenReader, RowProgress, PushProgress } from './types'
import { ROW_PUBLISH_STATUS } from './types'
import type { DocumentRequest } from '~/types/common/documents'
import { KmDraftsApi } from '~/api/km-document'
import { mapValidationErrors } from './validation-messages'

type Labeler = (property: string)=> string | undefined

export interface PublishDraftsResult {
  published: number
  left: number
}

function hasValidationErrors (result: unknown): boolean {
  return typeof result === 'object' && result !== null && 'errors' in result && Array.isArray(result.errors) && result.errors.length > 0
}

// Starts the workflow for every row whose draft was saved; rows that fail stay drafts.
export async function publishDrafts (
  documents: DocumentRequest[],
  progress: RowProgress[],
  { tokenReader, realm }: { tokenReader: TokenReader; realm: string },
  { onProgress, onPush, labelFor }: { onProgress: (progress: RowProgress)=> void; onPush?: (push: PushProgress)=> void; labelFor: Labeler }
): Promise<PublishDraftsResult> {
  const api = new KmDraftsApi({ tokenReader, realm })
  const rows = progress.filter(p => p.status === 'ok')
  const { length: total } = rows
  let published = 0
  let left = 0

  for (const [i, row] of rows.entries()) {
    const { rowIndex } = row
    const { [rowIndex]: doc } = documents
    onPush?.({ label: 'document', current: i + 1, total })
    try {
      if (doc === undefined) throw new Error('Document not found for this row')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- DocumentRequest always has header.identifier/schema set by schema builders
      const { header } = doc as unknown as { header: { identifier: string; schema: string } }
      // eslint-disable-next-line no-await-in-loop -- sequential so progress is reported per row
      const result = await api.publishDraft(header.schema, header.identifier, doc)
      // validation failures come back as HTTP 200 with an `errors` array in the body
      if (hasValidationErrors(result)) {
        left += 1
        onProgress({ ...row, publish: ROW_PUBLISH_STATUS.draft, message: mapValidationErrors(result, labelFor) })
      } else {
        published += 1
        onProgress({ ...row, publish: ROW_PUBLISH_STATUS.published })
      }
    } catch (err: unknown) {
      left += 1
      onProgress({ ...row, publish: ROW_PUBLISH_STATUS.draft, message: mapValidationErrors(err, labelFor) })
    }
  }

  return { published, left }
}
