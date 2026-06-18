# Bulk Document Uploader — Rewrite Plan

**Status:** Planning  
**Author:** Blaise Fonseca  
**Scope:** New implementation in `app/components/bulk-import/` — existing `documents-uploader/` is not touched

---

## Context

The existing implementation was delivered by an external consultant. It is not in production and has not been user-tested. A review identified multiple bugs and architectural problems that make it not safe to ship and difficult to extend. A full rewrite in a new folder is warranted.

**Original intent:** Allow users to bulk-upload IRCC records via Excel. The framework must be generic enough that a second document type can be added later by creating new files only — no changes to the framework itself.

**Constraint:** The existing `documents-uploader/` folder is not modified. The new implementation lives entirely in `app/components/bulk-import/`.

---

## Problems with the Current Implementation

### Bugs (would fail in production)

| Location | Bug |
|---|---|
| `utilities/read-xlsx-file.ts:61` | `e.reason === 'string'` is always `false` — every human-readable parse error is silently dropped |
| `utilities/document-attributes-to-schema-json/index.ts:27` | Missing `return` on `getError()` — unknown document type continues executing instead of aborting |
| `utilities/document-attributes-to-schema-json/schemas/schema.ts:20` | `KmDocumentApi` instantiated at module level with no auth token — all contact/document lookups run unauthenticated |
| `utilities/document-attributes-to-schema-json/schemas/schema.ts:281` | Dates hardcoded to `GMT-05:00` (Eastern Standard Time) — wrong dates for any non-EST user |
| `utilities/document-attributes-to-schema-json/schemas/schema.ts:336` | Base `parseXLSXFileToDocumentJson()` is not abstract — has a broken default implementation that always fails silently |

### Architecture Problems

- **`ImportDocuments` is a god class** — file reading, display parsing, error tracking, API calls, country lookups, and keyword fetching all in one object with shared mutable state.
- **`static t: Translations`** — the i18n translation function stored as a static property shared across all instances.
- **IRCC-specific logic leaked into the generic framework** — `key === 'country'` in `parseValue()` and `'permitEquivalent'` in `getTitle()` are IRCC concepts inside shared code.
- **i18n is not pluggable** — `documents-uploader.vue` manually imports and merges 4 JSON files; adding a new type requires modifying framework files.
- **`Math.random()` used for document GUIDs** — non-cryptographic.
- **Subdocument creation is fire-and-forget** — errors during contact creation are silently swallowed.
- **No error recovery in `onFileChange`** — if parsing throws, `isLoading` stays `true` forever.
- **N uncached API calls per row** — country names are re-fetched for every row with no deduplication.
- **Vue components own business logic** — API calls, document building, and submission are wired directly into the modal instead of the framework.

---

## Design Goals for the Rewrite

1. **Vue components are display-only.** All business logic — reading, parsing, building, submitting — lives in the framework. Components bind to what the composable exposes.
2. **Single composable interface.** The modal calls `useBulkImport()` and gets back reactive state and functions. It never imports `KmDocumentApi`, `useAuth`, or `useRealm` directly.
3. **Plugin contract is two files per document type, nothing else.** The framework never needs to change when a new type is added.
4. **The `Schema` base class is a true TypeScript `abstract class`.** Forgetting to implement `buildSchemaDocument()` is a compile error.
5. **No shared mutable state** — framework functions are pure or explicitly scoped per invocation.
6. **i18n is owned by each document type**, not the framework component.
7. **All bugs listed above are fixed.**

---

## File Structure

```
app/components/bulk-import/
│
├── framework/
│   ├── types.ts              # All shared types for this module
│   ├── schema.ts             # Abstract base class — the plugin contract
│   ├── read-sheet.ts         # Pure fn: File → raw rows + read errors
│   ├── build-preview.ts      # Pure fn: rows → display data for the table
│   ├── build-documents.ts    # Pure fn: rows + Schema → API-shaped JSON
│   ├── submit-documents.ts   # Sends built docs to API, streams per-row results
│   └── use-bulk-import.ts    # Composable — the ONLY thing the modal talks to
│
├── document-types/
│   └── ircc/
│       ├── attributes-map.ts   # Column → field mapping
│       ├── schema.ts           # IrccSchema extends Schema (IRCC logic only)
│       ├── messages.json       # i18n strings owned by this type
│       └── index.ts            # Registers: { Schema, attributesMap, messages, headerRows, keywordDomains }
│
├── registry.ts               # Imports all document types — one line per type
│
├── uploader-modal.vue        # UI only — binds to useBulkImport(), renders state
├── upload-button.vue         # File picker — display only
├── document-grid.vue         # Preview table — display only
├── uploader-header.vue       # Header — display only
├── uploader-footer.vue       # Footer with action buttons — display only
├── action-confirmation.vue   # Confirm dialog — display only
└── bulk-import-trigger.vue   # Entry point button — replaces documents-uploader.vue
```

**Adding a second document type in the future:**
```
document-types/
└── abs-permit/
    ├── attributes-map.ts
    ├── schema.ts
    ├── messages.json
    └── index.ts
```
Then one line added to `registry.ts`. Zero other changes.

---

## UI / Framework Boundary

```
uploader-modal.vue
  └── useBulkImport(documentType)
        ├── state        ← reactive, modal binds v-if to state.phase
        ├── onFileChange(file)
        │     ├── framework/read-sheet.ts
        │     └── framework/build-preview.ts
        ├── onImport()
        │     ├── framework/build-documents.ts
        │     └── framework/submit-documents.ts  ← owns KmDocumentApi + auth
        └── onClose()
```

The modal never sees `KmDocumentApi`, `useAuth`, `useRealm`, or any API type. It only binds to `state` and calls `onFileChange` / `onImport` / `onClose`.

---

## The Plugin Contract

Each document type exports one object:

```ts
// document-types/ircc/index.ts
export const irccDocumentType: DocumentTypeDefinition = {
  Schema: IrccSchema,
  attributesMap,
  messages,                                          // i18n — composable merges automatically
  headerRows: [0, 1],
  keywordDomains: [THESAURUS_DOMAINS.ABS_PERMIT_KEYWORD],
  resolvers: { country: fetchCountryDisplayName }    // optional display transformers
}
```

`resolvers` is the escape hatch for display-time API calls (like country code → full name). The framework calls them during `buildPreview` with deduplication — if 50 rows have the same country code, the API is called once.

---

## The Abstract Base Class

```ts
// framework/schema.ts
export abstract class Schema {
  constructor(
    protected readonly row: RawRow,
    protected readonly linkedRecords: LinkedRecordStore,  // shared across rows — deduplicates associated records
    protected readonly api: KmDocumentApi,                // injected with auth — no module-level instance
    protected readonly language: LanguageCode
  ) {}

  abstract buildSchemaDocument(): Promise<DocumentRequest>  // compile error if not overridden

  // Shared utilities — all static, no side effects
  static parseDate(value: string | Date | null | undefined): string  // UTC, no hardcoded timezone
  static generateId(): string { return crypto.randomUUID() }         // replaces Math.random()
  static getLanguageCode(value: string): LanguageCode
  static isEmpty(value: unknown): boolean
  static getSubDocument(identifier: string | undefined): SubDocument | undefined
  static removeEmptyValues(data: EmptyDocumentRequest): DocumentRequest
  // ... etc
}
```

`linkedRecords` is a generic store for associated records that must be created alongside the main record (e.g. contacts, organisations). It is shared across all rows during a single import so duplicates are detected and not re-created. Any document type whose schema produces linked records uses this — it is not IRCC-specific.

`keywordsMap` is **not** on the base class. It is an IRCC concern — `IrccSchema` fetches it internally via `buildSchemaDocument()`. The framework has no knowledge of thesaurus keywords.

---

## Framework Functions

### `read-sheet.ts`
```ts
export async function readSheet(
  file: File,
  attributesMap: AttributesMap,
  headerRows: number[]
): Promise<{ rows: RawRow[]; errors: SheetError[] }>
```
Fixes: `typeof e.reason === 'string'` (not `e.reason === 'string'`). Returns errors with correct 0-based row/column indices.

### `build-preview.ts`
```ts
export async function buildPreview(
  rows: RawRow[],
  attributesMap: AttributesMap,
  t: Translations,
  resolvers?: Record<string, (val: string) => Promise<string>>
): Promise<PreviewData>
```
Pure. Resolvers are deduped — same input value resolved once regardless of how many rows contain it.

### `build-documents.ts`
```ts
export async function buildDocuments(
  rows: RawRow[],
  Schema: typeof AbstractSchema,
  api: KmDocumentApi
): Promise<{ documents: DocumentRequest[]; linkedRecords: LinkedRecordStore; errors: DocError[] }>
```
Pure. Creates a shared `linkedRecords` store across all rows — each Schema instance writes to it so duplicates are detected. Collects parse errors per row without losing the document. Never submits to the API.

### `submit-documents.ts`
```ts
export async function submitDocuments(
  documents: DocumentRequest[],
  linkedRecords: LinkedRecordStore,
  api: KmDocumentApi,
  onProgress: (row: number, result: 'ok' | 'error', message?: string) => void
): Promise<SubmitResult>
```
Submits linked records first, then main documents. Calls `onProgress` after each row so the UI can update row-by-row status in real time. Linked record failures are tracked and surfaced — not fire-and-forget.

### `use-bulk-import.ts`
```ts
export function useBulkImport(documentType: DocumentTypes) {
  // internally calls useAuth(), useRealm(), merges document type messages into i18n
  return {
    state,          // reactive UploaderState
    onFileChange,   // (file: File) => Promise<void>
    onImport,       // () => Promise<void>
    onClose,        // () => void
    onClear,        // () => void
  }
}
```

---

## UI Design Reference

Design is specified in `Bulk IRCC Import (standalone).html` (extracted from Claude Design bundle). The new modal is a **full-screen fixed overlay** — not a Bootstrap modal.

### Design Tokens (add to existing token sheet or scope to component)

```css
--navy-900: #0b3b4d; --navy-800: #0f4a5f; --navy-700: #12576f; --navy-50: #eef4f7;
--orange: #e4572e; --orange-50: #fde9e1;
--ok: #2e8b57; --ok-50: #e7f3ec; --ok-line: auto;
--danger: #d64541; --danger-50: #fdeeed; --danger-line: #f3c9c6;
--warn: #b3781a; --warn-50: #fbf1df; --warn-line: #f0dcb4;
--line: #dde4e8; --line-2: #eef2f4;
--radius: 7px; --cell-py: 9px; --cell-px: 13px;
/* compact density: --cell-py: 5px */
```

Fonts: **Inter** (UI text) + **JetBrains Mono** (mono values — codes, IDs, row index).

### Panel Layout

```
┌─ .panel (full-screen overlay, max 1560×940) ──────────────────┐
│ .ph-head  — title, file chip, × close button                  │
│ #bannerSlot — ok/error summary banner (conditional)           │
│ #toolbarSlot — row count, legend, search, density, wrap, jump │
│ .tableScroll — the data table (flex:1, overflow:auto)         │
│ .ph-foot  — Close | foot-note | spacer | Clear list | Import  │
└───────────────────────────────────────────────────────────────┘
```

### Table Structure

**Three pinned left columns** (sticky-left, `position:sticky`):

| Pin | Width | Content |
|-----|-------|---------|
| `p0` — `#` | 52px | Row index, right-aligned, monospace |
| `p1` — Status | 90px | Dot + label badge (`ready` / `warn` / `error`) |
| `p2` — Permit reference | 200px | Right border = 2px divider |

**Two sticky header rows** (`position:sticky; top:0` and `top:33px`):
- Row 1 (`.grp`): group labels spanning their columns, uppercase, navy background
- Row 2 (`.col`): individual column labels with optional help text, asterisk for required

**Scroll groups** (33 columns minus the pinned permit reference):
General · Country · Issuing authority · Permit/equivalent · The provider · PIC · MAT · Genetic resource · Uses & conditions · Documentation

### Cell Validation States

```
td.cellerr   — danger-50 bg + danger-line inset shadow (error)
td.cellwarn  — warn-50 bg + warn-line inset shadow (warning)
.cellnote    — small message below the value (error/warn text)
```

Row-level: `tr.rowerr` tints pinned cells danger-50; `tr.rowwarn` tints warn-50.

### UploaderState Machine

```ts
type UploaderState =
  | { phase: 'empty' }                                              // dropzone
  | { phase: 'parsing'; fileName: string }                         // progress bar
  | { phase: 'preview'; preview: PreviewData; errors: SheetError[] }
  | { phase: 'confirm-import'; preview: PreviewData; errors: SheetError[] }
  | { phase: 'importing'; preview: PreviewData; progress: RowStatus[] }
  | { phase: 'done' }
  | { phase: 'confirm-close' }
  | { phase: 'confirm-erase' }
```

Each UI element renders based on `state.phase`. No boolean soup.

### Toolbar Controls

- **Row count** — "X records" with inline legend (green/amber/red dots)
- **Search** — filters visible rows by permit reference or any field
- **Compact toggle** — flips `data-density` on `<body>` → `--cell-py: 5px`
- **Wrap text toggle** — flips `data-wrap` on `<body>`
- **Issues only** — hides rows with no warnings or errors
- **Jump to group** — `<select>` scrolls the table to the group's first column

---

## Implementation Sequence

### Phase 1 — Framework
1. `framework/types.ts` — all types for the module
2. `framework/schema.ts` — abstract base class, fixed utilities
3. `framework/read-sheet.ts` — pure file reader, bug fixes
4. `framework/build-preview.ts` — pure display builder, resolver pattern with dedup
5. `framework/build-documents.ts` — pure document builder
6. `framework/submit-documents.ts` — API submission with per-row progress
7. `framework/use-bulk-import.ts` — composable wiring everything together

### Phase 2 — IRCC document type
8. `document-types/ircc/attributes-map.ts` — ported from existing, cleaned up
9. `document-types/ircc/schema.ts` — ported from existing, IRCC logic only, fixed bugs
10. `document-types/ircc/messages.json` — i18n extracted from the 4 merged JSON files
11. `document-types/ircc/index.ts` — registration object

### Phase 3 — Registry and UI
12. `registry.ts` — import IRCC type, export registry
13. `bulk-import-trigger.vue` — entry point button (lazy-loads modal)
14. `uploader-modal.vue` — state machine, binds to `useBulkImport()`, display only
15. UI sub-components — port or reference existing ones as needed

### Phase 4 — Verification
16. TypeScript compiles with no errors
17. Manual end-to-end test with a real IRCC Excel file

---

## Success Criteria

- [ ] Upload a valid IRCC Excel file → preview table renders with column headers and data
- [ ] Upload a file with bad data → per-cell errors shown with correct row/column
- [ ] Click Import → documents created as drafts, per-row success/failure shown in real time
- [ ] Close modal mid-upload → confirmation prompt fires
- [ ] Add a second document type → zero changes to `framework/` or `uploader-modal.vue`
- [ ] TypeScript compile error if a new Schema does not implement `buildSchemaDocument()`
- [ ] `uploader-modal.vue` imports nothing from `KmDocumentApi`, `useAuth`, or `useRealm`
- [ ] No `@ts-expect-error` except on unavoidable JS interop boundaries (legacy APIs)
