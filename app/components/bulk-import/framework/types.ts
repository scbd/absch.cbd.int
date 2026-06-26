import type { DocumentRequest, SubDocumentStore } from '~/types/common/documents'
import type { KmDraftsApi } from '~/api/km-document'

// ---------------------------------------------------------------------------
// Raw sheet data (straight from read-excel-file, before any mapping)
// ---------------------------------------------------------------------------

export type CellPrimitive = string | number | boolean | Date | null

export type RawRow = Record<string, CellPrimitive>

// ---------------------------------------------------------------------------
// Column / attributes map  (same shape as existing ircc-document.ts)
// ---------------------------------------------------------------------------

export interface AttributeLeaf {
  column: string
  required?: boolean
  translationKey?: string
}

export interface AttributeGroup {
  schema: Record<string, AttributeLeaf>
  translationKey?: string
}

export type AttributeEntry = AttributeLeaf | AttributeGroup

export type AttributesMap = Record<string, AttributeEntry>

// ---------------------------------------------------------------------------
// Preview table  (display-only — strings, per-cell errors)
// ---------------------------------------------------------------------------

export interface CellError {
  level: 'error' | 'warning'
  message: string
}

export interface PreviewCell {
  raw: CellPrimitive
  display: string
  errors: CellError[]
}

export interface PreviewRow {
  rowIndex: number
  cells: Record<string, PreviewCell>
  status: 'ready' | 'warn' | 'error'
}

export interface PreviewData {
  rows: PreviewRow[]
  columnKeys: string[]
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export interface SheetError {
  row: number
  column: string | number
  level: 'error' | 'warning'
  message: string
  value?: string
}

export interface DocBuildError {
  row: number
  message: string
  field?: string
}

// ---------------------------------------------------------------------------
// Submission progress
// ---------------------------------------------------------------------------

export type RowImportStatus = 'pending' | 'ok' | 'error'

export interface RowProgress {
  rowIndex: number
  status: RowImportStatus
  message?: string
}

export type ParseStepStatus = 'pending' | 'active' | 'done'

export interface ParseStep {
  key: string
  status: ParseStepStatus
  detail?: string
}

// ---------------------------------------------------------------------------
// Linked records (sub-documents created alongside the main document)
// ---------------------------------------------------------------------------

export type LinkedRecordStore = SubDocumentStore

// ---------------------------------------------------------------------------
// Document type plugin contract
// ---------------------------------------------------------------------------

// Union of all supported document types (e.g. 'ircc', 'cpcp', etc.)
export type DocumentTypes = 'ircc'

export interface ColumnGroup {
  translationKey: string
  keys: string[]
}

export interface DocumentTypeDefinition {
  Schema: new (
    row: RawRow,
    linkedRecords: LinkedRecordStore,
    api: ApiClient,
    rawLanguage: string,
  )=> SchemaInstance
  getLanguage: (row: RawRow)=> string
  attributesMap: AttributesMap
  messages: Record<string, unknown>
  headerRows: number[]
  pinnedColumns?: string[]
  columnGroups?: ColumnGroup[]
  validateRows?: (rows: RawRow[])=> Promise<SheetError[]>
}

export interface SchemaInstance {
  buildSchemaDocument: ()=> Promise<DocumentRequest>
}

export type ApiClient = KmDraftsApi

// ---------------------------------------------------------------------------
// Uploader state machine
// ---------------------------------------------------------------------------

export type UploaderState =
  | { phase: 'empty' }
  | { phase: 'parsing'; fileName: string; steps: ParseStep[] }
  | { phase: 'preview'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'confirm-import'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'confirm-close'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'confirm-erase'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'importing'; preview: PreviewData; rawRows: RawRow[]; progress: RowProgress[] }
  | { phase: 'done'; imported: number; failed: number }
