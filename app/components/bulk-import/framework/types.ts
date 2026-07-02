import type { DocumentRequest, SubDocumentStore } from '~/types/common/documents'
export type TokenReader = ()=> Promise<string>

export interface ApiOptions {
  tokenReader: TokenReader
  realm: string
}

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

export const ROW_IMPORT_STATUS = { pending: 'pending', ok: 'ok', error: 'error' } as const
export type RowImportStatus = typeof ROW_IMPORT_STATUS[keyof typeof ROW_IMPORT_STATUS]

export interface RowProgress {
  rowIndex: number
  status: RowImportStatus
  message?: string
}

export interface PushProgress {
  label: 'linked' | 'document'
  current: number
  total: number
}

export const PARSE_STEP_STATUS = { pending: 'pending', active: 'active', done: 'done' } as const
export const PARSE_STEP_KEY = { openSheet: 'openSheet', mapColumns: 'mapColumns', validateRows: 'validateRows', buildPreview: 'buildPreview' } as const

export type ParseStepStatus = typeof PARSE_STEP_STATUS[keyof typeof PARSE_STEP_STATUS]
export type ParseStepKey = typeof PARSE_STEP_KEY[keyof typeof PARSE_STEP_KEY]

export interface ParseStep {
  key: ParseStepKey
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
    tokenReader: TokenReader,
    rawLanguage: string,
  )=> SchemaInstance
  getLanguage: (row: RawRow)=> string
  attributesMap: AttributesMap
  messages: Record<string, unknown>
  headerRows: number[]
  pinnedColumns?: string[]
  columnGroups?: ColumnGroup[]
  validateRows?: (rows: RawRow[], tokenReader: TokenReader, realm: string, userGovernment?: string)=> Promise<SheetError[]>
}

export interface SchemaInstance {
  buildSchemaDocument: ()=> Promise<DocumentRequest>
}

// ---------------------------------------------------------------------------
// Uploader state machine
// ---------------------------------------------------------------------------

export type UploaderState =
  | { phase: 'empty' }
  | { phase: 'parsing'; fileName: string; steps: ParseStep[] }
  | { phase: 'preview'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'confirm-import'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[]; draftCount: number; linkedCount: number; documents: DocumentRequest[]; linkedRecords: LinkedRecordStore; buildErrors: DocBuildError[] }
  | { phase: 'confirm-close'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'confirm-erase'; preview: PreviewData; rawRows: RawRow[]; errors: SheetError[] }
  | { phase: 'importing'; preview: PreviewData; rawRows: RawRow[]; progress: RowProgress[]; currentPush?: PushProgress }
  | { phase: 'done'; imported: number; failed: number; preview: PreviewData; rawRows: RawRow[]; progress: RowProgress[] }
  | { phase: 'parse-error' }
  | { phase: 'import-error' }

export type UploaderPhase = UploaderState['phase']
