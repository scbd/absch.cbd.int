<template>
  <!-- Full-screen overlay — not a Bootstrap modal -->
  <div class="bi-backdrop" @click.self="onClose">
    <div class="bi-panel" role="dialog" aria-modal="true">

      <!-- Header -->
      <div class="bi-head">
        <div class="bi-head__ic">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <div class="bi-head__ttl">
          <h1>{{ t('bulkImport.ircc.title') }}</h1>
          <div class="bi-head__sub">
            <span v-if="state.phase === 'empty'">{{ t('bulkImport.selectFile', 'Select a file to begin') }}</span>
            <span v-else-if="state.phase === 'parsing'">{{ t('bulkImport.reading', 'Reading file…') }}</span>
            <span v-else>{{ t('bulkImport.previewReady', 'Review the records below before importing') }}</span>
          </div>
          <div v-if="state.phase !== 'empty' && state.phase !== 'parsing'" class="bi-file-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <b>{{ fileName }}</b>
            <span class="bi-file-chip__sep">·</span>
            <span class="bi-file-chip__rows">{{ previewRows.length }} {{ t('bulkImport.rows', 'rows') }}</span>
            <button type="button" class="bi-file-chip__replace" @click="onClear">
              {{ t('bulkImport.replace', 'Replace') }}
            </button>
          </div>
        </div>
        <button type="button" class="bi-head__close" :disabled="state.phase === 'importing'" @click="onClose">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Banner -->
      <div v-if="banner" class="bi-banner" :class="banner.level === 'ok' ? 'bi-banner--ok' : 'bi-banner--danger'">
        <div class="bi-banner__ic">
          <svg v-if="banner.level === 'ok'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="bi-banner__body">
          <div class="bi-banner__head">{{ banner.text }}</div>
          <ul v-if="bannerErrors.length" class="bi-banner__list">
            <li v-for="group in bannerErrors" :key="group.row">
              <span class="bi-rk" :class="group.worstLevel === 'error' ? 'bi-rk--error' : 'bi-rk--warn'">
                Row {{ group.row }}
              </span>
              <span class="bi-rk-items">
                <span v-for="(item, i) in group.items" :key="i" class="bi-rk-item">
                  <b>{{ item.fieldLabel }}</b> — {{ item.message }}
                </span>
              </span>
            </li>
          </ul>
          <div v-if="bannerErrors.length" class="bi-banner__hint">
            {{ t('bulkImport.fixHint', 'Fix the highlighted cells in your Excel file and upload it again. Rows without issues are kept.') }}
          </div>
        </div>
      </div>

      <!-- Toolbar -->
      <div v-if="hasPreview" class="bi-toolbar">
        <span class="bi-toolbar__count">
          <b>{{ previewRows.length }}</b> {{ t('bulkImport.documents', 'documents') }}
        </span>
        <span class="bi-stat bi-stat--ok"><span class="bi-stat__dot" />{{ t('bulkImport.statusReady', 'Ready') }}</span>
        <span class="bi-stat bi-stat--warn"><span class="bi-stat__dot" />{{ t('bulkImport.statusWarning', 'Warning') }}</span>
        <span class="bi-stat bi-stat--error"><span class="bi-stat__dot" />{{ t('bulkImport.statusError', 'Error') }}</span>

        <span class="bi-toolbar__spacer" />

        <input
          v-model="search"
          type="search"
          class="bi-toolbar__search"
          :placeholder="t('bulkImport.search', 'Search documents...')"
        />

        <select v-model="jumpSection" class="bi-toolbar__jump">
          <option value="">{{ t('bulkImport.jumpSection', 'Jump to section...') }}</option>
          <option v-for="grp in columnGroups" :key="grp.label" :value="grp.label">{{ grp.label }}</option>
        </select>
      </div>

      <!-- Body -->
      <div class="bi-body">

        <!-- Phase: empty — dropzone -->
        <div v-if="state.phase === 'empty'" class="bi-dropzone" @dragover.prevent @drop.prevent="handleDrop">
          <div class="bi-dz-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>
          </div>
          <div class="bi-dz-ttl">{{ t('bulkImport.dropTitle', 'Drag an Excel file here') }}</div>
          <div class="bi-dz-sub">{{ t('bulkImport.dropSub', 'or browse your computer to select a completed IRCC import template.') }}</div>
          <label class="bi-browse-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            {{ t('bulkImport.browse', 'Browse files') }}
            <input type="file" accept=".xlsx,.xls" hidden @change="handleFileInput" />
          </label>
          <div class="bi-dz-meta">
            <span>{{ t('bulkImport.accepted', 'Accepted:') }} <b>.xlsx</b>, <b>.xls</b></span>
            <span>{{ t('bulkImport.maxSize', 'Max') }} <b>5 MB</b> · {{ t('bulkImport.upTo', 'up to') }} <b>500 {{ t('bulkImport.rows', 'rows') }}</b></span>
            <span>33 {{ t('bulkImport.columnsDesc', 'columns across 10 sections') }}</span>
          </div>
          <a class="bi-dz-tmpl" href="#" @click.prevent>↓ {{ t('bulkImport.downloadTemplate', 'Download the IRCC template') }}</a>
        </div>

        <!-- Phase: parsing -->
        <div v-else-if="state.phase === 'parsing'" class="bi-parsing">
          <div class="bi-parsing__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div class="bi-parsing__name">{{ state.fileName }}</div>
          <div class="bi-parsing__sub">{{ t('bulkImport.parsingTitle', 'Reading and validating your file...') }}</div>
          <div class="bi-parsing__bar-track">
            <div class="bi-parsing__bar-fill" :style="{ width: parseProgress + '%' }" />
          </div>
          <ul class="bi-parsing__steps">
            <li v-for="step in parsingSteps" :key="step.key" class="bi-parsing__step" :class="`bi-parsing__step--${step.status}`">
              <span class="bi-parsing__step-ic">
                <svg v-if="step.status === 'done'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else-if="step.status === 'active'" class="bi-parsing__spinner" />
              </span>
              <span>{{ stepLabel(step) }}</span>
            </li>
          </ul>
        </div>

        <!-- Phase: preview / confirm-import / importing / done — data table -->
        <div v-else-if="hasPreview" class="bi-table-scroll" :class="{ 'bi-table--compact': compact, 'bi-table--wrap': wrapText }">
          <table class="bi-table">
            <thead>
              <tr class="bi-table__grp-row">
                <!-- Pinned header cells -->
                <th class="bi-pin bi-pin--0 bi-grp" rowspan="2">#</th>
                <th class="bi-pin bi-pin--1 bi-grp" rowspan="2">{{ t('bulkImport.status', 'Status') }}</th>
                <th class="bi-pin bi-pin--2 bi-grp" rowspan="2">{{ t('bulkImport.ircc.columns.permitEquivalent', 'Permit reference') }}</th>
                <!-- Scrollable group headers -->
                <th v-for="grp in columnGroups" :key="grp.label" :colspan="grp.keys.length" class="bi-grp">
                  {{ grp.label }}
                </th>
              </tr>
              <tr class="bi-table__col-row">
                <th
                  v-for="key in scrollableColumnKeys"
                  :key="key"
                  class="bi-col"
                  :class="{ 'bi-col--required': isRequired(key) }"
                >
                  {{ columnLabel(key) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.rowIndex"
                :class="{
                  'bi-row--error': row.status === 'error',
                  'bi-row--warn': row.status === 'warn'
                }"
              >
                <!-- Pinned: row index -->
                <td class="bi-pin bi-pin--0 bi-idx">{{ row.rowIndex + 1 }}</td>

                <!-- Pinned: status -->
                <td class="bi-pin bi-pin--1">
                  <span
                    v-if="importProgress(row.rowIndex)"
                    class="bi-stat"
                    :class="`bi-stat--${importProgress(row.rowIndex)?.status}`"
                  >
                    <span class="bi-stat__dot" />{{ importProgress(row.rowIndex)?.status }}
                  </span>
                  <span v-else class="bi-stat" :class="`bi-stat--${row.status}`">
                    <span class="bi-stat__dot" />{{ row.status }}
                  </span>
                </td>

                <!-- Pinned: permit reference -->
                <td class="bi-pin bi-pin--2">
                  {{ row.cells['permitEquivalent']?.display ?? '' }}
                </td>

                <!-- Scrollable columns -->
                <td
                  v-for="key in scrollableColumnKeys"
                  :key="key"
                  :class="{
                    'bi-cell--err': cellHasError(row, key),
                    'bi-cell--warn': cellHasWarn(row, key)
                  }"
                >
                  <span v-if="isBoolYes(row.cells[key]?.display ?? '')" class="bi-chip bi-chip--yes">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ row.cells[key].display }}
                  </span>
                  <span v-else-if="isBoolNo(row.cells[key]?.display ?? '')" class="bi-chip bi-chip--no">
                    {{ row.cells[key].display }}
                  </span>
                  <span v-else-if="isChipVal(row.cells[key]?.display ?? '')" class="bi-chip">
                    {{ row.cells[key].display }}
                  </span>
                  <span v-else>{{ row.cells[key]?.display ?? '' }}</span>
                  <span
                    v-if="cellHasError(row, key) || cellHasWarn(row, key)"
                    class="bi-cellnote"
                    :class="cellHasError(row, key) ? 'bi-cellnote--err' : 'bi-cellnote--warn'"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {{ row.cells[key]?.errors[0]?.message }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Phase: done -->
        <div v-else-if="state.phase === 'done'" class="bi-loading">
          <i class="fa fa-check-circle text-success bi-done-icon" />
          <p class="mt-3">
            {{ t('bulkImport.doneMsg', 'Done — {imported} created, {failed} failed.', doneState) }}
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="bi-foot">
        <button type="button" class="bi-btn-ghost" @click="onClose">
          {{ t('bulkImport.close', 'Close') }}
        </button>

        <span class="bi-foot__spacer" />

        <template v-if="hasPreview && state.phase !== 'importing'">
          <span v-if="hasErrors" class="bi-foot__err">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ t('bulkImport.resolveErrors', 'Resolve all errors to enable import.') }}
          </span>
          <button type="button" class="bi-btn-ghost" @click="onClear">
            {{ t('bulkImport.clearList', 'Clear list') }}
          </button>
          <button type="button" class="bi-btn-orange" :disabled="hasErrors" @click="onConfirmImport">
            {{ t('bulkImport.createDrafts', 'Create draft records') }}
          </button>
        </template>

        <span v-if="state.phase === 'importing'" class="bi-foot__muted">
          {{ t('bulkImport.importing', 'Importing…') }}
        </span>
      </div>

      <!-- Confirm import overlay -->
      <div v-if="state.phase === 'confirm-import'" class="bi-confirm-overlay">
        <div class="bi-confirm">
          <p>{{ t('bulkImport.confirmMsg', 'Create draft records for all rows?') }}</p>
          <div class="mt-3 d-flex gap-2 justify-content-end">
            <button class="btn btn-secondary" @click="onCancelConfirm">
              {{ t('bulkImport.cancel', 'Cancel') }}
            </button>
            <button class="btn btn-primary bi-btn--orange" @click="onImport">
              {{ t('bulkImport.confirm', 'Confirm') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Confirm close overlay -->
      <div v-if="state.phase === 'confirm-close'" class="bi-confirm-overlay">
        <div class="bi-confirm">
          <p>{{ t('bulkImport.closeConfirm', 'Close and discard all loaded data?') }}</p>
          <div class="mt-3 d-flex gap-2 justify-content-end">
            <button class="btn btn-secondary" @click="onCancelConfirm">
              {{ t('bulkImport.cancel', 'Cancel') }}
            </button>
            <button class="btn btn-danger" @click="onForceClose">
              {{ t('bulkImport.confirmClose', 'Yes, close') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Confirm erase overlay -->
      <div v-if="state.phase === 'confirm-erase'" class="bi-confirm-overlay">
        <div class="bi-confirm">
          <p>{{ t('bulkImport.eraseConfirm', 'Clear all loaded records?') }}</p>
          <div class="mt-3 d-flex gap-2 justify-content-end">
            <button class="btn btn-secondary" @click="onCancelConfirm">
              {{ t('bulkImport.cancel', 'Cancel') }}
            </button>
            <button class="btn btn-danger" @click="onConfirmErase">
              {{ t('bulkImport.confirmErase', 'Yes, clear') }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import { useBulkImport } from './framework/use-bulk-import'
import type { DocumentTypes, PreviewRow, RowProgress, ParseStep } from './framework/types'
import irccAttributesMap from './document-types/ircc/attributes-map'

const props = defineProps<{ documentType: DocumentTypes }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { t } = useI18n()
const {
  state, onFileChange, onImport, onConfirmImport,
  onClose: _onClose, onForceClose: _onForceClose, onClear,
  onConfirmErase: _onConfirmErase, onCancelConfirm
} = useBulkImport(props.documentType)

// Wrap the three handlers that can transition to 'empty' so they also emit close
function onClose() {
  _onClose()
  if (state.phase === 'empty') emit('close')
}
function onForceClose() {
  _onForceClose()
  emit('close')
}
function onConfirmErase() {
  _onConfirmErase()
}

// -------------------------------------------------------------------------
// Parsing progress
// -------------------------------------------------------------------------
const parsingSteps = computed<ParseStep[]>(() =>
  state.phase === 'parsing' ? (state as Extract<typeof state, { phase: 'parsing' }>).steps ?? [] : []
)

const parseProgress = computed(() => {
  const steps = parsingSteps.value
  if (!steps.length) return 0
  const done = steps.filter(s => s.status === 'done').length
  const hasActive = steps.some(s => s.status === 'active')
  return Math.round(((done + (hasActive ? 0.5 : 0)) / steps.length) * 100)
})

function stepLabel(step: ParseStep): string {
  if (step.key === 'openSheet')    return t('bulkImport.step.openSheet',    'Workbook opened · sheet found')
  if (step.key === 'mapColumns')   return step.detail ? `Mapped ${step.detail} columns to IRCC fields` : 'Mapping columns…'
  if (step.key === 'validateRows') return step.detail ? `Validating ${step.detail} rows against registries…` : 'Validating rows…'
  if (step.key === 'buildPreview') return t('bulkImport.step.buildPreview', 'Building preview')
  return step.key
}

// -------------------------------------------------------------------------
// File handling
// -------------------------------------------------------------------------
const fileName = ref('')

function handleFileInput(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  fileName.value = file.name
  onFileChange(file)
}
function handleDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  fileName.value = file.name
  onFileChange(file)
}

// -------------------------------------------------------------------------
// Derived display state
// -------------------------------------------------------------------------
const search = ref('')
const issuesOnly = ref(false)
const compact = ref(false)
const wrapText = ref(false)
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
  return (state as Extract<typeof state, { preview: { rows: PreviewRow[] } }>).preview?.rows ?? []
})


const filteredRows = computed(() => {
  let rows = previewRows.value
  if (issuesOnly.value) rows = rows.filter(r => r.status !== 'ready')
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    rows = rows.filter(r =>
      Object.values(r.cells).some(c => c.display.toLowerCase().includes(q))
    )
  }
  return rows
})

type StateWithErrors = Extract<typeof state, { errors: unknown[] }>
const sheetErrors = computed(() =>
  hasPreview.value ? ((state as StateWithErrors).errors ?? []) as import('./framework/types').SheetError[] : []
)

const banner = computed(() => {
  if (!hasPreview.value) return null
  if (sheetErrors.value.length === 0) return { level: 'ok', text: t('bulkImport.ready', 'Ready to import') }
  const errCount  = sheetErrors.value.filter(e => e.level === 'error').length
  const warnCount = sheetErrors.value.filter(e => e.level === 'warning').length
  const parts = [
    errCount  ? `${errCount} error${errCount  !== 1 ? 's' : ''}` : '',
    warnCount ? `${warnCount} warning${warnCount !== 1 ? 's' : ''}` : ''
  ].filter(Boolean).join(' and ')
  const affected = new Set(sheetErrors.value.map(e => e.row)).size
  return {
    level: 'danger',
    text: t('bulkImport.hasErrors', `${affected} of ${previewRows.value.length} rows can't be imported yet — ${parts}.`)
  }
})

const bannerErrors = computed(() => {
  const groups = new Map<number, { row: number; worstLevel: 'error' | 'warning'; items: { fieldLabel: string; message: string; level: 'error' | 'warning' }[] }>()
  for (const e of sheetErrors.value) {
    if (!groups.has(e.row)) groups.set(e.row, { row: e.row, worstLevel: e.level, items: [] })
    const g = groups.get(e.row)!
    if (e.level === 'error') g.worstLevel = 'error'
    g.items.push({ fieldLabel: columnLabel(String(e.column)), message: e.message, level: e.level })
  }
  return [...groups.values()].sort((a, b) => a.row - b.row)
})

const hasErrors = computed(() => sheetErrors.value.some(e => e.level === 'error'))

// -------------------------------------------------------------------------
// Table column metadata
// -------------------------------------------------------------------------
const PINNED_KEY = 'permitEquivalent'

const allColumnKeys = computed(() => {
  if (!hasPreview.value) return []
  return (state as Extract<typeof state, { preview: unknown }>).preview?.columnKeys ?? []
})

const scrollableColumnKeys = computed(() =>
  allColumnKeys.value.filter(k => k !== PINNED_KEY)
)

interface ColumnGroup { label: string; keys: string[] }
const columnGroups = computed<ColumnGroup[]>(() => {
  // Group definitions mirror the IRCC Excel layout
  return [
    { label: t('bulkImport.ircc.groups.general', 'General'), keys: ['language'] },
    { label: t('bulkImport.ircc.groups.country', 'Country'), keys: ['country'] },
    { label: t('bulkImport.ircc.groups.issuingAuthority', 'Issuing authority'), keys: ['absCNAId'] },
    { label: t('bulkImport.ircc.groups.permitEquivalent', 'Permit / equivalent'), keys: ['dateOfIssuance', 'dateOfExpiry'] },
    {
      label: t('bulkImport.ircc.groups.provider', 'The provider'),
      keys: ['provider.type','provider.existing','provider.orgName','provider.acronym','provider.address','provider.city','provider.country','provider.email']
    },
    {
      label: t('bulkImport.ircc.groups.pic', 'PIC'),
      keys: ['pic.consent','pic.type','pic.existing','pic.orgName','pic.acronym','pic.address','pic.city','pic.country','pic.email']
    },
    { label: t('bulkImport.ircc.groups.mat', 'MAT'), keys: ['matEstablished'] },
    { label: t('bulkImport.ircc.groups.geneticResource', 'Genetic resource'), keys: ['subjectMatter','keywords','specimens','taxonomies'] },
    { label: t('bulkImport.ircc.groups.usesConditions', 'Uses & conditions'), keys: ['usage','usageDescription','conditionsThirdPartyTransfer'] },
    { label: t('bulkImport.ircc.groups.documentation', 'Documentation'), keys: ['permitFiles','additionalInformation'] }
  ].filter(g => g.keys.some(k => scrollableColumnKeys.value.includes(k)))
})

function columnLabel(key: string): string {
  return t(`bulkImport.ircc.columns.${key}`, key)
}

function isRequired(key: string): boolean {
  const parts = key.split('.')
  const entry = parts.length === 1
    ? irccAttributesMap[key]
    : (irccAttributesMap[parts[0]!] as { schema: Record<string, { required?: boolean }> })?.schema?.[parts[1]!]
  return !!(entry && 'required' in entry && (entry as { required?: boolean }).required)
}

function cellHasError(row: PreviewRow, key: string): boolean {
  return row.cells[key]?.errors.some(e => e.level === 'error') ?? false
}
function cellHasWarn(row: PreviewRow, key: string): boolean {
  return row.cells[key]?.errors.some(e => e.level === 'warning') ?? false
}

function isBoolYes(v: string): boolean {
  const u = v.trim().toLowerCase()
  return u === 'yes' || u === 'true'
}
function isBoolNo(v: string): boolean {
  const u = v.trim().toLowerCase()
  return u === 'no' || u === 'false'
}
function isChipVal(v: string): boolean {
  return v.trim().length > 0 && v.trim().length <= 25 && !v.includes('\n')
}

function importProgress(rowIndex: number): RowProgress | undefined {
  if (state.phase !== 'importing') return undefined
  return (state as Extract<typeof state, { progress: RowProgress[] }>).progress
    .find(p => p.rowIndex === rowIndex)
}
</script>

<style scoped>
/* Design tokens */
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
.bi-head {
  display: flex; align-items: flex-start; gap: 16px;
  background: #fff;
  padding: 18px 22px;
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}
.bi-head__ic {
  width: 42px; height: 42px; border-radius: 9px;
  background: var(--ok-50); color: var(--ok);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.bi-head__ttl { flex: 1; min-width: 0; }
.bi-head__ttl h1 { margin: 0; font-size: 18px; font-weight: 700; color: #0b3b4d; line-height: 1.2; }
.bi-head__sub { font-size: 13px; color: #667; margin-top: 2px; }
.bi-head__close {
  width: 34px; height: 34px; border-radius: 7px;
  border: 1px solid var(--line); background: #fff; color: #667;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; padding: 0;
}
.bi-head__close:hover { background: #f4f6f8; }
.bi-file-chip {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid var(--line); border-radius: 8px;
  padding: 5px 8px 5px 11px; font-size: .82rem; margin-top: 8px;
  color: #445;
}
.bi-file-chip b { font-weight: 600; }
.bi-file-chip__replace {
  background: none; border: 1px solid var(--line); border-radius: 5px;
  color: #445; cursor: pointer; font-size: .78rem; padding: 2px 8px;
}
.bi-file-chip__replace:hover { background: #f4f6f8; }
.bi-banner {
  padding: 8px 20px; font-size: .875rem; flex-shrink: 0;
}
.bi-banner--ok     { background: var(--ok-50);     color: var(--ok); }
.bi-banner--danger { 
  background: var(--danger-50);  color: var(--danger);
  max-height: 150px; overflow: scroll!important; 
}
.bi-toolbar {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px; border-bottom: 1px solid var(--line);
  flex-shrink: 0; flex-wrap: wrap;
}
.bi-toolbar__count { font-size: 13px; color: #445; }
.bi-toolbar__count b { font-weight: 700; }
.bi-toolbar__spacer { flex: 1; }
.bi-toolbar__search {
  width: 210px; height: 32px; padding: 0 10px;
  border: 1px solid var(--line); border-radius: 6px;
  font-size: 13px; outline: none;
}
.bi-toolbar__search:focus { border-color: #97c0d0; box-shadow: 0 0 0 3px rgba(0,100,150,.08); }
.bi-toolbar__jump {
  height: 32px; padding: 0 28px 0 10px; border: 1px solid var(--line); border-radius: 6px;
  font-size: 13px; background: #fff; cursor: pointer; min-width: 160px;
}
/* Status dot+label */
.bi-stat {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
}
.bi-stat__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bi-stat--ready, .bi-stat--ok { color: var(--ok); }
.bi-stat--ready .bi-stat__dot, .bi-stat--ok .bi-stat__dot { background: var(--ok); }
.bi-stat--warn { color: var(--warn); }
.bi-stat--warn .bi-stat__dot { background: var(--warn); }
.bi-stat--error { color: var(--danger); }
.bi-stat--error .bi-stat__dot { background: var(--danger); }
.bi-stat--pending { color: #888; }
.bi-stat--pending .bi-stat__dot { background: #bbb; }
.bi-body {
  flex: 1; overflow: hidden; display: flex; flex-direction: column;
}
.bi-dropzone {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px;
  border: 2px dashed var(--line); border-radius: var(--radius);
  margin: 24px; color: #667; background: #fafbfc;
}
.bi-dz-icon {
  width: 60px; height: 60px; border-radius: 14px;
  background: var(--ok-50); color: var(--ok);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 6px;
}
.bi-dz-ttl { font-size: 16px; font-weight: 700; color: #1a2e3b; }
.bi-dz-sub { font-size: 13.5px; color: #667; max-width: 420px; text-align: center; }
.bi-browse-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff; border: none; border-radius: 7px;
  padding: 9px 20px; font-size: 14px; font-weight: 600; cursor: pointer;
  margin-top: 6px;
}
.bi-browse-btn:hover { background: #c94827; }
.bi-dz-meta {
  display: flex; align-items: center; gap: 18px;
  font-size: 12.5px; color: #889; margin-top: 8px;
}
.bi-dz-meta b { color: #445; }
.bi-dz-tmpl { font-size: 13px; color: var(--ok); text-decoration: none; font-weight: 500; }
.bi-dz-tmpl:hover { text-decoration: underline; }
.bi-loading {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #666;
}
.bi-done-icon { font-size: 3rem; }
/* Table */
.bi-table-scroll {
  flex: 1; overflow: auto;
}
.bi-table {
  border-collapse: collapse; font-size: .85rem; white-space: nowrap;
}
.bi-table--wrap .bi-table { white-space: normal; }
.bi-table--compact { --cell-py: 6px; --cell-px: 10px; }
.bi-table th, .bi-table td {
  padding: var(--cell-py) var(--cell-px) !important;
  border: 1px solid rgba(255,255,255,.08);
  vertical-align: top;
}
.bi-table td { border-color: var(--line-2); }
/* Kill any global sort/pin icons injected via pseudo-elements */
.bi-table th, .bi-table td { cursor: default; }
.bi-table::before, .bi-table::after,
.bi-table th::before, .bi-table th::after,
.bi-table td::before, .bi-table td::after { display: none !important; content: none !important; }
/* Group header row */
.bi-table__grp-row th {
  background: #e8eef2; color: #1a3a4a !important;
  text-align: center; text-transform: uppercase;
  font-size: 10.5px; letter-spacing: .07em; font-weight: 700 !important;
  padding: 8px 13px; border-bottom: 1px solid var(--line, #dde4e8);
}
/* Column label row — near-white per design template */
.bi-table__col-row th {
  background: #f7f9fa;
  color: var(--ink-2, #3c4e57); font-weight: 600; font-size: 11px;
  padding: 8px 13px; border-bottom: 1px solid var(--line, #dde4e8);
}
.bi-col--required::after { content: ' *'; color: var(--orange); }
/* Sticky header rows */
.bi-table__grp-row th { position: sticky; top: 0; z-index: 3; }
.bi-table__col-row th { position: sticky; top: 33px; z-index: 3; }
/* Sticky left pins */
.bi-pin { position: sticky; z-index: 2; background: #fff; }
.bi-pin--0 { left: 0;    min-width: 52px; text-align: right; font-variant-numeric: tabular-nums; }
.bi-pin--1 { left: 52px; min-width: 90px; }
.bi-pin--2 { left: 142px; min-width: 200px; border-right: 2px solid var(--line); }
/* Pinned header cells must stack above scrollable header */
.bi-grp.bi-pin { z-index: 4; background: var(--navy-50, #eef4f7); color: var(--navy-800, #0f4a5f); }
.bi-idx { color: #999; font-size: .8rem; }
/* Row status */
.bi-row--error .bi-pin { background: var(--danger-50); }
.bi-row--warn  .bi-pin { background: var(--warn-50); }
/* Cell validation */
.bi-cell--err  { background: var(--danger-50); box-shadow: inset 0 0 0 1px var(--danger-line); }
.bi-cell--warn { background: var(--warn-50);   box-shadow: inset 0 0 0 1px var(--warn-line); }
/* Cell chips */
.bi-chip {
  display: inline-flex; align-items: center; gap: 4px;
  background: #eef1f4; color: #334; border-radius: 5px;
  padding: 2px 8px; font-size: .8rem; font-weight: 500; white-space: nowrap;
}
.bi-chip--yes { background: var(--ok-50); color: var(--ok); }
.bi-chip--no  { background: #f0f0f0; color: #667; }
/* Cell inline error */
.bi-cellnote {
  display: flex; align-items: flex-start; gap: 5px;
  font-size: .75rem; margin-top: 5px; line-height: 1.35;
}
.bi-cellnote--err  { color: var(--danger); }
.bi-cellnote--warn { color: var(--warn); }
/* Banner */
.bi-banner {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 12px 20px; font-size: 13px;
  border-bottom: 1px solid transparent;
  min-height: 0; overflow: hidden;
  flex: 0 1 auto;
}
.bi-banner__body {
  display: flex; flex-direction: column; min-height: 0; flex: 1; overflow: hidden;
}
.bi-banner--ok     { background: var(--ok-50);     border-color: #c3e0cc; }
.bi-banner--danger { background: var(--danger-50); border-color: var(--danger-line); }
.bi-banner__ic {
  width: 22px; height: 22px; flex-shrink: 0; margin-top: 1px;
  display: flex; align-items: center; justify-content: center;
}
.bi-banner--ok .bi-banner__ic { color: var(--ok); }
.bi-banner--danger .bi-banner__ic { color: var(--danger); }
.bi-banner__head { font-weight: 600; color: inherit; line-height: 1.4; }
.bi-banner--ok .bi-banner__head { color: #1a5c35; }
.bi-banner--danger .bi-banner__head { color: #a8322e; }
.bi-banner__list {
  margin: 6px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px;
  flex: 1; overflow-y: auto; min-height: 0;
}
.bi-banner__list li { display: flex; align-items: flex-start; gap: 7px; font-size: 12.5px; color: #4a2828; }
.bi-rk {
  font-family: monospace; font-size: 11.5px; font-weight: 600; border-radius: 4px;
  padding: 1px 6px; white-space: nowrap; flex-shrink: 0; margin-top: 1px;
}
.bi-rk--error { background: #fff; border: 1px solid var(--danger-line); color: #a8322e; }
.bi-rk--warn  { background: #fff; border: 1px solid var(--warn-line);   color: #7a5010; }
.bi-rk-items { display: flex; flex-direction: column; gap: 2px; }
.bi-rk-item { display: block; }
.bi-banner__hint { margin-top: 8px; font-size: 12px; color: #7a5010; }
.bi-banner--ok .bi-banner__hint { color: #1a5c35; }
/* Footer */
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
  background: none; border: 1px solid var(--line); border-radius: 6px;
  color: #445; padding: 7px 14px; font-size: 13.5px; cursor: pointer;
}
.bi-btn-ghost:hover { background: #f4f6f8; }
.bi-btn-orange {
  background: var(--orange); color: #fff; border: none; border-radius: 6px;
  padding: 7px 16px; font-size: 13.5px; font-weight: 600; cursor: pointer;
}
.bi-btn-orange:hover:not(:disabled) { background: #c94827; }
.bi-btn-orange:disabled { opacity: .45; cursor: not-allowed; }
/* Close button (left side of footer) */
.bi-foot .bi-btn-ghost:first-child { border-color: transparent; }
/* Confirm overlay */
.bi-confirm-overlay {
  position: absolute; inset: 0; background: rgba(255,255,255,.85);
  display: flex; align-items: center; justify-content: center; z-index: 10;
}
.bi-confirm {
  background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
  padding: 24px 32px; max-width: 400px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,.12);
}
/* Parsing screen */
.bi-parsing {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; padding: 40px 24px;
}
.bi-parsing__icon {
  width: 56px; height: 56px; border-radius: 14px;
  background: var(--ok-50); color: var(--ok);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.bi-parsing__name { font-size: 15px; font-weight: 700; color: #1a2e3b; }
.bi-parsing__sub  { font-size: 13px; color: #667; }
.bi-parsing__bar-track {
  width: min(440px, 90%); height: 7px; border-radius: 99px;
  background: #e4eaed; overflow: hidden; margin: 6px 0;
}
.bi-parsing__bar-fill {
  height: 100%; border-radius: 99px;
  background: var(--orange);
  transition: width 0.5s ease;
}
.bi-parsing__steps {
  list-style: none; margin: 4px 0 0; padding: 0;
  display: flex; flex-direction: column; gap: 8px;
  width: min(440px, 90%);
}
.bi-parsing__step {
  display: flex; align-items: center; gap: 10px;
  font-size: 13.5px; color: #aab;
}
.bi-parsing__step--done   { color: var(--ok); }
.bi-parsing__step--active { color: #1a2e3b; font-weight: 500; }
.bi-parsing__step-ic {
  width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.bi-parsing__step--done   .bi-parsing__step-ic { background: var(--ok); color: #fff; }
.bi-parsing__step--active .bi-parsing__step-ic { border: 2px solid #e0e5e8; }
.bi-parsing__step--pending .bi-parsing__step-ic { border: 2px solid #dde; }
.bi-parsing__spinner {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2.5px solid #e0e5e8;
  border-top-color: var(--orange);
  animation: bi-spin 0.7s linear infinite;
  display: block;
}
@keyframes bi-spin { to { transform: rotate(360deg); } }
</style>
