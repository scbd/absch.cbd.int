# Branch Split Plan — `blaise/feature/bulk-upload`

8 PRs total. Each branch depends on the one(s) listed under "Depends on".

**Commit style:** each branch is built as a series of small, logical commits (not one squashed blob) — e.g. tooling config separate from the lint fixes it triggered, API conversion separate from consumer updates. Every commit message describes what changed and why, following the repo's commit conventions.

---

## Branch 1 — `blaise/chore/eslint-tsc-rollup-devwatch`

Pure tooling and lint/TS housekeeping. No feature changes.

**Files:**
- `eslint.config.js`
- `.config/eslintminimal.json`
- `tsconfig.json`
- `rollup.config.js`
- `rollup/dev-watch.js` *(new)*
- `rollup/dev-error-overlay.js` *(new)*
- `package.json`
- `yarn.lock`

**Incidental lint/TS fixes triggered by the stricter config:**
- `app/components/common/app-version-watcher.vue`
- `app/components/common/overlay.vue`
- `app/components/kb/popular-tags.vue`
- `app/components/reports/abs/nr1-analysis.vue`
- `app/views/forms/edit/abs/edit-legal-framework-overview.vue`
- `app/views/forms/view/abs/legal-framework-overview.vue`
- `app/views/forms/view/chm/resource-mobilisation-2020.vue`
- `app/views/forms/view/directives/view-reference-records.directive.js`
- `app/views/portals/index.vue`
- `app/services/pdf-this.ts`
- `middlewares/oembed.js`

> **Cleanup before branching:** remove the stray debug `console.log` in `app/services/translation-service.js`.

**Depends on:** —

---

## Branch 2 — `blaise/feat/bulk-delete`

Multi-record delete feature.

**Files:**
- `app/components/register/bulk-delete-button.vue`
- `app/app-text/components/register/bulk-delete-button.json`
- `app/app-text/views/register/record-list.json` *(bulk-delete keys only)*
- `app/views/register/record-list.html` *(checkbox column + selection state)*
- `app/views/register/record-list.js` *(selection logic + `onBulkDeleted` handler)*
- `app/css/record.css` *(`.bi-select-*` styles)*

> **Note:** `record-list.html` and `record-list.js` also contain bulk-import wiring — take only the bulk-delete slice here; the bulk-import slice goes in branch 3e-ii.

**Depends on:** Branch 1

---

## Branch 3a — `blaise/feat/bulk-upload-types`

Type declarations that the rest of the bulk-upload stack depends on. Land first.

**Files:**
- `app/types/api/EHeader.ts`
- `app/types/shims-angular-vue.d.ts`

**Depends on:** Branch 1

---

## Branch 3b — `blaise/feat/bulk-upload-api`

JS → TS conversion of `km-document` and related type fixes in documents-uploader.

**Files:**
- `app/api/km-document.js` *(deleted)*
- `app/api/km-document.ts` *(new — replaces .js, adds `KmDocumentsApi` class)*
- `app/api/api-base.d.ts` *(new type declaration for `ApiBase`)*
- `app/api/html-pdf-api.ts` *(ts-nocheck added)*
- `app/components/documents-uploader/uploader-modal.vue` *(lint/TS fixes from km-document change)*
- `app/components/documents-uploader/utilities/document-attributes-to-schema-json/schemas/schema.ts`
- `app/components/documents-uploader/documents-uploader.vue` *(minor import cleanup)*
- `app/components/documents-uploader/REWRITE.md` *(new — notes for future rewrite)*
- `app/components/documents-uploader/TODO.md` *(new)*

**Depends on:** Branch 3a

---

## Branch 3c — `blaise/feat/bulk-upload-framework`

Core business logic for the bulk import feature.

**Files:**
- `app/components/bulk-import/framework/types.ts`
- `app/components/bulk-import/framework/schema.ts`
- `app/components/bulk-import/framework/read-sheet.ts`
- `app/components/bulk-import/framework/contact-utils.ts`
- `app/components/bulk-import/framework/build-preview.ts`
- `app/components/bulk-import/framework/build-documents.ts`
- `app/components/bulk-import/framework/submit-documents.ts`
- `app/components/bulk-import/framework/use-bulk-import.ts`
- `app/components/bulk-import/registry.ts`

**Depends on:** Branches 3a + 3b

---

## Branch 3d — `blaise/feat/bulk-upload-document-types`

IRCC document type implementation.

**Files:**
- `app/components/bulk-import/document-types/ircc/index.ts`
- `app/components/bulk-import/document-types/ircc/attributes-map.ts`
- `app/components/bulk-import/document-types/ircc/schema.ts`
- `app/app-text/components/bulk-import/document-types/ircc.json`

**Depends on:** Branch 3c

---

## Branch 3e-i — `blaise/feat/bulk-upload-sub-components`

The 8 granular sub-components that make up the bulk import UI.

**Files:**
- `app/components/bulk-import/components/bulk-import-banner.vue`
- `app/components/bulk-import/components/bulk-import-confirm-dialog.vue`
- `app/components/bulk-import/components/bulk-import-done-dialog.vue`
- `app/components/bulk-import/components/bulk-import-dropzone.vue`
- `app/components/bulk-import/components/bulk-import-header.vue`
- `app/components/bulk-import/components/bulk-import-parsing.vue`
- `app/components/bulk-import/components/bulk-import-table.vue`
- `app/components/bulk-import/components/bulk-import-toolbar.vue`

**Depends on:** Branches 3c + 3d

---

## Branch 3e-ii — `blaise/feat/bulk-upload-entry-point`

Top-level wiring: modal, entry-point component, and record-list integration.

**Files:**
- `app/components/bulk-import/bulk-import.vue`
- `app/components/bulk-import/bulk-import-modal.vue`
- `app/components/bulk-import/bulk-upload-template.html`
- `app/app-text/components/bulk-import/bulk-import-modal.json`
- `app/views/register/record-list.html` *(bulk-import slice: `ng-vue` wrapper + `exportVueComponent` check)*
- `app/views/register/record-list.js` *(bulk-import slice: `refreshList`, `buttonText` from translationService)*

**Depends on:** Branch 3e-i

---

## Dependency order (merge sequence)

```
1  chore/eslint-tsc-rollup-devwatch
├─ 2  feat/bulk-delete
└─ 3a feat/bulk-upload-types
   └─ 3b feat/bulk-upload-api
      └─ 3c feat/bulk-upload-framework
         └─ 3d feat/bulk-upload-document-types
            └─ 3e-i feat/bulk-upload-sub-components
               └─ 3e-ii feat/bulk-upload-entry-point
```

---

## Pre-branching checklist

- [ ] Remove debug `console.log` in `app/services/translation-service.js`
- [ ] Confirm `documents-uploader/REWRITE.md` and `TODO.md` should be in the PR (not just local)
- [ ] Verify `record-list.html` / `record-list.js` splits cleanly between branch 2 and 3e-ii
