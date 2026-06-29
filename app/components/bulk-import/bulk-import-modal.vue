<template>
  <div
    class="modal show d-block"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div
      class="modal-dialog m-auto d-flex flex-column"
      style="max-width: min(1560px, 97vw); height: min(940px, 95vh);"
    >
      <div
        class="modal-content flex-grow-1 d-flex flex-column overflow-hidden position-relative"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-header d-block p-0 border-0">
          <BulkImportHeader
            :phase="state.phase"
            :file-name="fileName"
            :row-count="previewRows.length"
            @close="onClose"
            @clear="onClear"
          />
        </div>

        <div class="modal-body p-0 overflow-hidden d-flex flex-column">
          <BulkImportBanner
            :banner="banner"
            :banner-errors="bannerErrors"
          />

          <BulkImportToolbar
            v-if="hasPreview"
            v-model:search="search"
            :row-count="previewRows.length"
          />

          <div
            v-if="state.phase === 'parse-error'"
            class="d-flex align-items-center gap-2 small text-danger rounded border mx-4 mt-3 p-2"
            style="background: #fff3f3; border-color: #f5c6c6 !important;"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            ><circle
              cx="12"
              cy="12"
              r="10"
            /><line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
            /><line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
            /></svg>
            {{ t('bulkImport.parseError') }}
          </div>

          <BulkImportDropzone
            v-if="state.phase === 'empty' || state.phase === 'parse-error'"
            @file="onFilePicked"
          />

          <BulkImportParsing
            v-else-if="state.phase === 'parsing'"
            :file-name="state.fileName"
            :steps="parsingSteps"
            :progress="parseProgress"
          />

          <BulkImportTable
            v-else-if="hasPreview"
            :rows="filteredRows"
            :pinned-column-keys="docTypeDef.pinnedColumns ?? []"
            :scrollable-column-keys="scrollableColumnKeys"
            :column-groups="columnGroups"
            :required-keys="requiredKeys"
            :row-progress-list="rowProgressList"
          />

          <div
            v-else-if="state.phase === 'import-error'"
            class="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted"
          >
            <i
              class="fa fa-exclamation-circle text-danger"
              style="font-size: 3rem;"
            />
            <p class="mt-3">
              {{ t('bulkImport.importError') }}
            </p>
          </div>
        </div>

        <div class="modal-footer justify-content-start gap-2 px-4 py-3">
          <button
            type="button"
            class="btn btn-sm btn-link text-secondary text-decoration-none"
            @click="onClose"
          >
            {{ t('bulkImport.close') }}
          </button>

          <span class="flex-grow-1" />

          <template v-if="state.phase === 'preview' || state.phase === 'confirm-import' || state.phase === 'confirm-close' || state.phase === 'confirm-erase'">
            <span
              v-if="hasErrors"
              class="d-flex align-items-center gap-1 small fw-medium text-danger"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              ><circle
                cx="12"
                cy="12"
                r="10"
              /><line
                x1="12"
                y1="8"
                x2="12"
                y2="12"
              /><line
                x1="12"
                y1="16"
                x2="12.01"
                y2="16"
              /></svg>
              {{ t('bulkImport.resolveErrors') }}
            </span>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="onClear"
            >
              {{ t('bulkImport.clearList') }}
            </button>
            <button
              type="button"
              class="bi-btn-orange"
              :disabled="hasErrors || isBuilding"
              @click="onClickConfirmImport"
            >
              {{ isBuilding ? t('bulkImport.building') : t('bulkImport.createDrafts') }}
            </button>
          </template>

          <span
            v-if="state.phase === 'importing'"
            class="small text-muted"
          >{{ t('bulkImport.importing') }}</span>

          <span
            v-if="state.phase === 'done'"
            class="small"
            :class="state.failed > 0 ? 'text-danger' : 'text-success'"
          >{{ t('bulkImport.doneMsg', { imported: state.imported, failed: state.failed }) }}</span>
        </div>

        <BulkImportConfirmDialog
          v-if="state.phase === 'confirm-import'"
          :message="t('bulkImport.confirmMsg')"
          :confirm-label="t('bulkImport.confirm')"
          confirm-class="btn-primary bi-btn--orange"
          @confirm="onImport"
          @cancel="onCancelConfirm"
        >
          <ul class="list-unstyled small text-muted text-start mb-1">
            <li>{{ t('bulkImport.confirmDraftCount', { n: state.draftCount }) }}</li>
            <li v-if="state.linkedCount > 0">
              {{ t('bulkImport.confirmLinkedCount', { n: state.linkedCount }) }}
            </li>
          </ul>
        </BulkImportConfirmDialog>

        <BulkImportConfirmDialog
          v-if="state.phase === 'confirm-close'"
          :message="t('bulkImport.closeConfirm')"
          :confirm-label="t('bulkImport.confirmClose')"
          confirm-class="btn-danger"
          @confirm="onForceClose"
          @cancel="onCancelConfirm"
        />

        <BulkImportConfirmDialog
          v-if="state.phase === 'confirm-erase'"
          :message="t('bulkImport.eraseConfirm')"
          :confirm-label="t('bulkImport.confirmErase')"
          confirm-class="btn-danger"
          @confirm="onConfirmErase"
          @cancel="onCancelConfirm"
        />
      </div>
    </div>
  </div>
  <div class="modal-backdrop show" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import modalMessages from '~/app-text/components/bulk-import/bulk-import-modal.json'
import { useBulkImport } from './framework/use-bulk-import'
import type { DocumentTypes, PreviewRow, RowProgress, SheetError } from './framework/types'
import { registry } from './registry'
import BulkImportHeader from './components/bulk-import-header.vue'
import BulkImportBanner from './components/bulk-import-banner.vue'
import type { BannerErrorGroup } from './components/bulk-import-banner.vue'
import BulkImportToolbar from './components/bulk-import-toolbar.vue'
import BulkImportDropzone from './components/bulk-import-dropzone.vue'
import BulkImportParsing from './components/bulk-import-parsing.vue'
import BulkImportTable from './components/bulk-import-table.vue'
import BulkImportConfirmDialog from './components/bulk-import-confirm-dialog.vue'

const props = defineProps<{ documentType: DocumentTypes }>()
const emit = defineEmits<(e: 'close')=> void>()

const { t, mergeLocaleMessage } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- plugin wraps JSON in locale object at runtime
Object.entries(modalMessages as unknown as Record<string, unknown>).forEach(([locale, msgs]) => {
  mergeLocaleMessage(locale, { bulkImport: msgs })
})

const {
  state, onFileChange, onImport, onConfirmImport,
  onClose: _onClose, onForceClose: _onForceClose, onClear,
  onConfirmErase: _onConfirmErase, onCancelConfirm
} = useBulkImport(props.documentType)

function onClose () {
  _onClose()
  if (state.phase === 'empty') emit('close')
}
function onForceClose () {
  _onForceClose()
  emit('close')
}
function onConfirmErase () {
  _onConfirmErase()
}

const isBuilding = ref(false)
async function onClickConfirmImport () {
  isBuilding.value = true
  await onConfirmImport()
  isBuilding.value = false
}

// -------------------------------------------------------------------------
// File handling
// -------------------------------------------------------------------------
const fileName = ref('')

function onFilePicked (file: File) {
  const { name } = file
  fileName.value = name
  void onFileChange(file)
}

// -------------------------------------------------------------------------
// Parsing progress
// -------------------------------------------------------------------------
const parsingSteps = computed(() =>
  state.phase === 'parsing' ? (state).steps : []
)

const parseProgress = computed(() => {
  const { value: steps } = parsingSteps
  if (!steps.length) return 0
  const { length: done } = steps.filter(s => s.status === 'done')
  const hasActive = steps.some(s => s.status === 'active')
  return Math.round(((done + (hasActive ? 0.5 : 0)) / steps.length) * 100)
})

// -------------------------------------------------------------------------
// Derived display state
// -------------------------------------------------------------------------
const search = ref('')

const hasPreview = computed(() =>
  state.phase === 'preview' ||
  state.phase === 'confirm-import' ||
  state.phase === 'confirm-close' ||
  state.phase === 'confirm-erase' ||
  state.phase === 'importing' ||
  state.phase === 'done'
)

const previewRows = computed<PreviewRow[]>(() => {
  if (!hasPreview.value) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- hasPreview guards all phases that have preview
  return (state as Extract<typeof state, { preview: { rows: PreviewRow[] } }>).preview.rows
})

const filteredRows = computed(() => {
  let { value: rows } = previewRows
  if (search.value.trim() !== '') {
    const q = search.value.toLowerCase()
    rows = rows.filter(r =>
      Object.values(r.cells).some(c => c.display.toLowerCase().includes(q))
    )
  }
  return rows
})

type StateWithErrors = Extract<typeof state, { errors: unknown[] }>
const sheetErrors = computed<SheetError[]>(() => {
  if (!hasPreview.value) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- hasPreview guards phases that have errors
  return (state as StateWithErrors).errors
})

const banner = computed(() => {
  if (!hasPreview.value) return null
  if (sheetErrors.value.length === 0) return { level: 'ok' as const, text: t('bulkImport.ready') }
  const { length: errCount } = sheetErrors.value.filter(e => e.level === 'error')
  const { length: warnCount } = sheetErrors.value.filter(e => e.level === 'warning')
  const parts = [
    errCount ? `${errCount} error${errCount === 1 ? '' : 's'}` : '',
    warnCount ? `${warnCount} warning${warnCount === 1 ? '' : 's'}` : ''
  ].filter(Boolean).join(' and ')
  const { size: affected } = new Set(sheetErrors.value.map(e => e.row))
  return {
    level: 'danger' as const,
    text: t('bulkImport.hasErrors', { affected, total: previewRows.value.length, parts })
  }
})

// groups multiple errors on the same row into one banner item with multiple messages
const bannerErrors = computed<BannerErrorGroup[]>(() => {
  const groups = new Map<number, BannerErrorGroup>()
  for (const e of sheetErrors.value) {
    if (!groups.has(e.row)) groups.set(e.row, { row: e.row + 1, worstLevel: e.level, items: [] })
    const g = groups.get(e.row)
    if (g === undefined) continue
    if (e.level === 'error') g.worstLevel = 'error'
    g.items.push({ fieldLabel: columnLabel(String(e.column)), message: e.message, level: e.level })
  }
  return [...groups.values()].sort((a, b) => a.row - b.row)
})

const hasErrors = computed(() => sheetErrors.value.some(e => e.level === 'error'))

const rowProgressList = computed<RowProgress[]>(() =>
  state.phase === 'importing' || state.phase === 'done'
    ? (state).progress
    : []
)

// -------------------------------------------------------------------------
// Table column metadata
// -------------------------------------------------------------------------
const { [props.documentType]: docTypeDef } = registry

const allColumnKeys = computed(() => {
  if (!hasPreview.value) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- hasPreview guards phases that have preview
  return (state as Extract<typeof state, { preview: { columnKeys: string[] } }>).preview.columnKeys
})

const scrollableColumnKeys = computed(() => {
  const pinned = new Set(docTypeDef.pinnedColumns ?? [])
  return allColumnKeys.value.filter((k: string) => !pinned.has(k))
})

interface ColumnGroup { label: string; keys: string[] }
const columnGroups = computed<ColumnGroup[]>(() => {
  const cols = new Set(scrollableColumnKeys.value)
  return (docTypeDef.columnGroups ?? [])
    .map(g => ({ label: t(g.translationKey), keys: g.keys.filter(k => cols.has(k)) }))
    .filter(g => g.keys.length > 0)
})

function columnLabel (key: string): string {
  return t(key, key)
}

// the columns are nested in the document schema, so we need to traverse the schema to find the required columns
const requiredKeys = computed<Set<string>>(() => {
  const { attributesMap } = docTypeDef
  return new Set(
    allColumnKeys.value.filter((key: string) => {
      const parts = key.split('.')
      if (parts.length === 1) {
        const { [key]: entry } = attributesMap
        return entry !== undefined && 'required' in entry && entry.required === true
      }
      const [group, field] = parts
      if (group === undefined || field === undefined) return false
      const { [group]: groupEntry } = attributesMap
      if (groupEntry === undefined || !('schema' in groupEntry)) return false
      // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- computed key destructuring not recognised by rule
      const { [field]: entry } = groupEntry.schema
      return entry?.required === true
    })
  )
})
</script>

<style scoped>
/* Design tokens — inherited by all child components via CSS variable cascade */
.modal {
  --navy-900: #0b3b4d;
  --orange:   #e4572e;
  --ok:       #2e8b57;
  --ok-50:    #e7f3ec;
  --danger:   #d64541;
  --danger-50:#fdeeed;
  --danger-line: #f3c9c6;
  --warn:     #b3781a;
  --warn-50:  #fbf1df;
  --warn-line:#f0dcb4;
  --line:     #dde4e8;
  --line-2:   #eef2f4;
  --radius:   7px;
  --cell-py:  13px;
  --cell-px:  10px;
}
.bi-btn-orange {
  background: var(--orange); color: #fff; border: none; border-radius: 6px;
  padding: 7px 16px; font-size: 13.5px; font-weight: 600; cursor: pointer;
}
.bi-btn-orange:hover:not(:disabled) { background: #c94827; }
.bi-btn-orange:disabled { opacity: .45; cursor: not-allowed; }
</style>
