# Bulk IRCC Import — Implementation TODO

Design reference: `Bulk IRCC Import.html` (extracted from Claude Design bundle)

---

## 1. Column metadata module

**File:** `ircc-columns.js` (or `.ts`) alongside existing utilities

- [ ] Export `LABELS` — 33 column labels (from `ircc-data.js → labels[]`)
- [ ] Export `HELP` — 33 help strings (from `ircc-data.js → help[]`)
- [ ] Export `REQUIRED` — Set of required column indices `{0,1,2,3,4,5,6,8,9,12,13,14,15,17,18,21,22,23,24,28}`
- [ ] Export `KIND` map — `{0:'lang', 1:'iso', 2:'id', 3:'id', 4:'date', 5:'date', 6:'type', ...}` (33 entries)
- [ ] Export `WIDTH` map — `{lang:112, iso:92, id:196, date:120, type:144, text:176, email:204, bool:124, long:300}`
- [ ] Export `PIN` array — 3 pinned columns: `[{meta:'idx',w:52}, {meta:'status',w:92}, {col:3,label:'Permit reference',w:200}]`
- [ ] Export `GROUPS` — 10 scroll groups (col 3 excluded as it's pinned):
  - General `[0]`
  - Country `[1]`
  - Issuing authority `[2]`
  - Permit/equivalent `[4,5]`
  - The provider `[6–13]`
  - PIC `[14–22]`
  - MAT `[23]`
  - Genetic resource `[24–27]`
  - Uses & conditions `[28–30]`
  - Documentation `[31–32]`

---

## 2. New modal component

**File:** `../ircc-import/IrccImportModal.vue`

### Layout & shell
- [ ] Full-screen fixed overlay (not a Bootstrap Modal) — covers viewport, `z-index` above app, dimmed backdrop
- [ ] Panel header: title "Import IRCC records", close (×) button
- [ ] Panel footer: action buttons (contextual by state)

### State: Empty (no file selected)
- [ ] Drop-zone / file picker — accepts `.xlsx` only
- [ ] Instruction text

### State: Parsing
- [ ] Spinner / progress indicator while reading file

### State: Preview (file loaded, no blocking errors)
- [ ] **Sticky two-row grouped table header**
  - Row 1: group label cells spanning their columns (Bootstrap `colspan`)
  - Row 2: individual column labels with help tooltip (`title` attribute)
  - Both rows `position: sticky; top: 0`
- [ ] **Sticky-left pinned columns** — idx, status, Permit reference — `position: sticky; left: <offset>px`
- [ ] Scrollable body for remaining 30 columns
- [ ] Column widths from `WIDTH[KIND[col]]`
- [ ] Required columns visually indicated (e.g. asterisk or header tint)
- [ ] Row count summary in footer ("X records")
- [ ] **Import button** in footer → triggers create-drafts flow

### State: Errors present
- [ ] Top summary banner: "X errors in Y rows — fix in Excel and re-upload"
- [ ] Per-cell highlight for cells with read errors (from `readXLSXFile`)
- [ ] Per-row highlight / status badge for rows with parse errors (from `mapDocumentAttributesToSchemaJson`)
- [ ] Error tooltip or inline message on hover

### Data flow
- [ ] On file drop/select → call `readXLSXFile(file)` (no schema) to get raw display rows
- [ ] Simultaneously call `readXLSXFile(file, 'ircc')` utility for validation errors → merge into `errors` map keyed by `{row, col}`
- [ ] On "Import" click → call `ImportDocuments.mapDocumentAttributesToSchemaJson(data)` for each row → `KmDocumentApi.createDocumentDraft(doc)` per document
- [ ] Show per-row create status (success / error) in the status pin column during import

---

## 3. Wire up in documents-uploader

**File:** `documents-uploader.vue`

- [ ] In `openBulkUploader()`, branch on `props.documentType`:
  ```js
  if (props.documentType === 'ircc') {
    await import('../ircc-import/IrccImportModal.vue')
      .then(({ default: data }) => { uploader.value = data })
  } else {
    await import('./uploader-modal.vue')
      .then(({ default: data }) => { uploader.value = data })
  }
  ```

---

## 4. CSS

- [ ] Design tokens: `--navy-900`, `--orange`, `--ok` (green), `--danger` (red) — add to existing token sheet or scope to component
- [ ] Sticky header + sticky columns: ensure `overflow-x: auto` wrapper does not conflict with `position: sticky` (use `overflow: auto` on the scroll container, not an ancestor)
- [ ] Error cell: background tint (`--danger` at low opacity), border
- [ ] Error row status badge in pinned status column
- [ ] Import-progress status badge (pending / ok / failed) in status column during draft creation

---

## Notes

- `readXLSXFile` (`utilities/read-xlsx-file.ts`) already skips header rows `[0,1]` for IRCC; row indices in errors are 0-based from data start.
- Parse errors from `document-attributes-to-schema-json` set `error.row = index` (0-based) — merge with read errors on same index.
- `ircc-document.ts` maps 33 attributes to Excel column indices `'0'`–`'32'`.
- Existing `uploader-modal.vue` is **not** modified — the IRCC flow is a parallel path.
