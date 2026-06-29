<template>
  <div
    class="bi-backdrop"
    @click.self="onClose"
  >
    <div
      class="bi-panel"
      role="dialog"
      aria-modal="true"
    >
      <BulkImportHeader
        :phase="state.phase"
        :file-name="fileName"
        :row-count="previewRows.length"
        @close="onClose"
        @clear="onClear"
      />

      <BulkImportBanner
        :banner="banner"
        :banner-errors="bannerErrors"
      />

      <BulkImportToolbar
        v-if="hasPreview"
        v-model:search="search"
        v-model:jump-section="jumpSection"
        :row-count="previewRows.length"
        :column-groups="columnGroups"
      />

      <div class="bi-body">
        <div
          v-if="state.phase === 'parse-error'"
          class="bi-parse-error"
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
          v-else-if="state.phase === 'done'"
          class="bi-loading"
        >
          <i class="fa fa-check-circle text-success bi-done-icon" />
          <p class="mt-3">
            {{ t('bulkImport.doneMsg', doneState) }}
          </p>
        </div>

        <div
          v-else-if="state.phase === 'import-error'"
          class="bi-loading"
        >
          <i class="fa fa-exclamation-circle text-danger bi-done-icon" />
          <p class="mt-3">
            {{ t('bulkImport.importError') }}
          </p>
        </div>
      </div>

      <div class="bi-foot">
        <button
          type="button"
          class="bi-btn-ghost"
          @click="onClose"
        >
          {{ t('bulkImport.close') }}
        </button>

        <span class="bi-foot__spacer" />

        <template v-if="hasPreview && state.phase !== 'importing'">
          <span
            v-if="hasErrors"
            class="bi-foot__err"
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
            class="bi-btn-ghost"
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
          class="bi-foot__muted"
        >
          {{ t('bulkImport.importing') }}
        </span>
      </div>

      <BulkImportConfirmDialog
        v-if="state.phase === 'confirm-import'"
        :message="t('bulkImport.confirmMsg')"
        :confirm-label="t('bulkImport.confirm')"
        confirm-class="btn-primary bi-btn--orange"
        @confirm="onImport"
        @cancel="onCancelConfirm"
      >
        <ul class="bi-confirm-counts">
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
const jumpSection = ref('')

const doneState = computed(() =>
  state.phase === 'done' ? state : { imported: 0, failed: 0 }
)

const hasPreview = computed(() =>
  state.phase === 'preview' ||
  state.phase === 'confirm-import' ||
  state.phase === 'confirm-close' ||
  state.phase === 'confirm-erase' ||
  state.phase === 'importing'
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
  state.phase === 'importing'
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
.bi-backdrop {
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
.bi-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 1060;
  display: flex; align-items: center; justify-content: center;
}
.bi-panel {
  background: #fff;
  border-radius: var(--radius);
  width: min(1560px, 97vw);
  height: min(940px, 95vh);
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
}
.bi-body {
  flex: 1; overflow: hidden; display: flex; flex-direction: column;
}
.bi-parse-error {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; margin: 12px 20px 0;
  background: #fff3f3; border: 1px solid #f5c6c6; border-radius: 8px;
  font-size: 13px; color: var(--danger);
}
.bi-loading {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #666;
}
.bi-done-icon { font-size: 3rem; }
.bi-foot {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-top: 1px solid var(--line); flex-shrink: 0;
}
.bi-foot__spacer { flex: 1; }
.bi-foot__err {
  display: flex; align-items: center; gap: 6px;
  font-size: 12.5px; color: var(--danger); font-weight: 500;
}
.bi-foot__muted { font-size: 12.5px; color: #888; }
.bi-btn-ghost {
  background: none;
  border: 1px solid var(--line) !important;
  border-radius: 6px;
  color: #445; padding: 7px 14px; font-size: 13.5px; cursor: pointer;
}
.bi-btn-ghost:hover { background: #f4f6f8; }
.bi-btn-orange {
  background: var(--orange); color: #fff; border: none; border-radius: 6px;
  padding: 7px 16px; font-size: 13.5px; font-weight: 600; cursor: pointer;
}
.bi-btn-orange:hover:not(:disabled) { background: #c94827; }
.bi-btn-orange:disabled { opacity: .45; cursor: not-allowed; }
.bi-foot .bi-btn-ghost:first-child { border-color: transparent; }
</style>
