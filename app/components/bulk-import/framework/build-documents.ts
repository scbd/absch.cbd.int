import type {
  RawRow, LinkedRecordStore, TokenReader, DocBuildError, DocumentTypeDefinition
} from './types'
import type { DocumentRequest } from '~/types/common/documents'
import { Schema } from './schema'

export interface BuildDocumentsResult {
  documents: DocumentRequest[]
  linkedRecords: LinkedRecordStore
  errors: DocBuildError[]
}

export async function buildDocuments (
  rows: RawRow[],
  definition: DocumentTypeDefinition,
  tokenReader: TokenReader
): Promise<BuildDocumentsResult> {
  const linkedRecords: LinkedRecordStore = []
  const documents: DocumentRequest[] = []
  const errors: DocBuildError[] = []

  await Promise.all(
    rows.map(async (row, rowIndex) => {
      try {
        const instance = new definition.Schema(row, linkedRecords, tokenReader, definition.getLanguage(row))
        const doc = await instance.buildSchemaDocument()
        documents[rowIndex] = doc
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        errors.push({ row: rowIndex, message })
        documents[rowIndex] = Schema.removeEmptyValues({ header: { identifier: Schema.generateId() } })
      }
    })
  )

  return { documents, linkedRecords, errors }
}
