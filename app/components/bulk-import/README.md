# Bulk Import

Excel-to-KM-document import pipeline. Self-contained: `framework/` is document-type agnostic; `document-types/` holds all type-specific logic.

## Adding a new document type

1. Create `document-types/<type>/` with a `schema.ts` extending `AbstractSchema`, an `attributes-map.ts`, a `messages.json`, and an `index.ts` exporting a `DocumentTypeDefinition`.
2. Register it in `registry.ts`.

Zero changes to `framework/` or `uploader-modal.vue` required.

## Framework architecture

### `schema.ts` — Abstract base class

```ts
export abstract class Schema {
  constructor(
    protected readonly row: RawRow,
    protected readonly linkedRecords: LinkedRecordStore,
    protected readonly api: KmDocumentApi,
    protected readonly language: LanguageCode
  ) {}

  abstract buildSchemaDocument(): Promise<DocumentRequest>
}
```

**`linkedRecords`** is a store for associated records (contacts, organisations) that must be created alongside the main document. It is shared across all rows in a single import run so duplicates are detected and not re-created. Any document type that produces linked records uses this — it is not IRCC-specific.

**`keywordsMap`** is not on the base class. It is an IRCC concern — `IrccSchema` fetches it internally. The framework has no knowledge of thesaurus keywords.

Static utilities (`parseDate`, `generateId`, `isEmpty`, `getSubDocument`, `removeEmptyValues`, …) are all pure and side-effect free.

### `read-sheet.ts`

```ts
export async function readSheet(
  file: File,
  attributesMap: AttributesMap,
  headerRows: number[]
): Promise<{ rows: RawRow[]; errors: SheetError[] }>
```

Parses the Excel file into `RawRow[]`. Returns errors with 0-based row/column indices.

### `build-preview.ts`

```ts
export async function buildPreview(
  rows: RawRow[],
  attributesMap: AttributesMap,
  t: Translations,
  resolvers?: Record<string, (val: string) => Promise<string>>
): Promise<PreviewData>
```

Pure. Resolvers (e.g. code → display label lookups) are deduped — same input value resolved once regardless of how many rows contain it.

### `build-documents.ts`

```ts
export async function buildDocuments(
  rows: RawRow[],
  Schema: typeof AbstractSchema,
  api: KmDocumentApi
): Promise<{ documents: DocumentRequest[]; linkedRecords: LinkedRecordStore; errors: DocError[] }>
```

Pure. Creates a single shared `linkedRecords` store across all rows so duplicate associated records are detected. Collects per-row parse errors without dropping the document. Never calls the API.

### `submit-documents.ts`

```ts
export async function submitDocuments(
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  api: KmDocumentApi,
  onProgress: (row: number, result: 'ok' | 'error', message?: string) => void
): Promise<SubmitResult>
```

Submits linked records first, then main documents. Calls `onProgress` after each row so the UI updates in real time. Linked record failures are tracked and surfaced.

### `use-bulk-import.ts`

Composable that wires the pipeline together (calls `useAuth()`, `useRealm()`, merges document-type messages into i18n).

```ts
export function useBulkImport(documentType: DocumentTypes) {
  return { state, onFileChange, onImport, onClose, onClear }
}
```

## UploaderState machine

```ts
type UploaderState =
  | { phase: 'empty' }
  | { phase: 'parsing'; fileName: string }
  | { phase: 'preview'; preview: PreviewData; errors: SheetError[] }
  | { phase: 'confirm-import'; preview: PreviewData; errors: SheetError[] }
  | { phase: 'importing'; preview: PreviewData; progress: RowStatus[] }
  | { phase: 'done' }
  | { phase: 'confirm-close' }
  | { phase: 'confirm-erase' }
```

All UI visibility is derived from `state.phase`.
