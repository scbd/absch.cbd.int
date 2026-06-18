<template>
  <div class="bi-table-scroll" :class="{ 'bi-table--compact': compact, 'bi-table--wrap': wrapText }">
    <table class="bi-table">
      <thead>
        <tr class="bi-table__grp-row">
          <th class="bi-pin bi-pin--0 bi-grp" rowspan="2">#</th>
          <th class="bi-pin bi-pin--1 bi-grp" rowspan="2">{{ t('bulkImport.status', 'Status') }}</th>
          <th class="bi-pin bi-pin--2 bi-grp" rowspan="2">{{ t('bulkImport.ircc.columns.permitEquivalent', 'Permit reference') }}</th>
          <th v-for="grp in columnGroups" :key="grp.label" :colspan="grp.keys.length" class="bi-grp">
            {{ grp.label }}
          </th>
        </tr>
        <tr class="bi-table__col-row">
          <th
            v-for="key in scrollableColumnKeys"
            :key="key"
            class="bi-col"
            :class="{ 'bi-col--required': requiredKeys.has(key) }"
          >
            {{ columnLabel(key) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.rowIndex"
          :class="{
            'bi-row--error': row.status === 'error',
            'bi-row--warn':  row.status === 'warn'
          }"
        >
          <td class="bi-pin bi-pin--0 bi-idx">{{ row.rowIndex + 1 }}</td>

          <td class="bi-pin bi-pin--1">
            <span
              v-if="rowProgressFor(row.rowIndex)"
              class="bi-stat"
              :class="`bi-stat--${rowProgressFor(row.rowIndex)?.status}`"
            >
              <span class="bi-stat__dot" />{{ rowProgressFor(row.rowIndex)?.status }}
            </span>
            <span v-else class="bi-stat" :class="`bi-stat--${row.status}`">
              <span class="bi-stat__dot" />{{ row.status }}
            </span>
          </td>

          <td class="bi-pin bi-pin--2">
            {{ row.cells['permitEquivalent']?.display ?? '' }}
          </td>

          <td
            v-for="key in scrollableColumnKeys"
            :key="key"
            :class="{
              'bi-cell--err':  cellHasError(row, key),
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
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { PreviewRow, RowProgress } from '../framework/types'

interface ColumnGroup { label: string; keys: string[] }

const props = defineProps<{
  rows: PreviewRow[]
  scrollableColumnKeys: string[]
  columnGroups: ColumnGroup[]
  requiredKeys: Set<string>
  rowProgressList: RowProgress[]
  compact?: boolean
  wrapText?: boolean
}>()

const { t } = useI18n()

function columnLabel(key: string): string {
  return t(`bulkImport.ircc.columns.${key}`, key)
}

function rowProgressFor(rowIndex: number): RowProgress | undefined {
  return props.rowProgressList.find(p => p.rowIndex === rowIndex)
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
</script>

<style scoped>
.bi-table-scroll { flex: 1; overflow: auto; }
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
.bi-table th, .bi-table td { cursor: default; }
.bi-table::before, .bi-table::after,
.bi-table th::before, .bi-table th::after,
.bi-table td::before, .bi-table td::after { display: none !important; content: none !important; }
.bi-table__grp-row th {
  background: #e8eef2; color: #1a3a4a !important;
  text-align: center; text-transform: uppercase;
  font-size: 10.5px; letter-spacing: .07em; font-weight: 700 !important;
  padding: 8px 13px; border-bottom: 1px solid var(--line, #dde4e8);
}
.bi-table__col-row th {
  background: #f7f9fa;
  color: var(--ink-2, #3c4e57); font-weight: 600; font-size: 11px;
  padding: 8px 13px; border-bottom: 1px solid var(--line, #dde4e8);
}
.bi-col--required::after { content: ' *'; color: var(--orange); }
.bi-table__grp-row th { position: sticky; top: 0; z-index: 3; }
.bi-table__col-row th { position: sticky; top: 33px; z-index: 3; }
.bi-pin { position: sticky; z-index: 2; background: #fff; }
.bi-pin--0 { left: 0;    min-width: 52px; text-align: right; font-variant-numeric: tabular-nums; }
.bi-pin--1 { left: 52px; min-width: 90px; }
.bi-pin--2 { left: 142px; min-width: 200px; border-right: 2px solid var(--line); }
.bi-grp.bi-pin { z-index: 4; background: var(--navy-50, #eef4f7); color: var(--navy-800, #0f4a5f); }
.bi-idx { color: #999; font-size: .8rem; }
.bi-row--error .bi-pin { background: var(--danger-50); }
.bi-row--warn  .bi-pin { background: var(--warn-50); }
.bi-cell--err  { background: var(--danger-50); box-shadow: inset 0 0 0 1px var(--danger-line); }
.bi-cell--warn { background: var(--warn-50);   box-shadow: inset 0 0 0 1px var(--warn-line); }
.bi-chip {
  display: inline-flex; align-items: center; gap: 4px;
  background: #eef1f4; color: #334; border-radius: 5px;
  padding: 2px 8px; font-size: .8rem; font-weight: 500; white-space: nowrap;
}
.bi-chip--yes { background: var(--ok-50); color: var(--ok); }
.bi-chip--no  { background: #f0f0f0; color: #667; }
.bi-cellnote {
  display: flex; align-items: flex-start; gap: 5px;
  font-size: .75rem; margin-top: 5px; line-height: 1.35;
}
.bi-cellnote--err  { color: var(--danger); }
.bi-cellnote--warn { color: var(--warn); }
.bi-stat {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
}
.bi-stat__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bi-stat--ready, .bi-stat--ok { color: var(--ok); }
.bi-stat--ready .bi-stat__dot, .bi-stat--ok .bi-stat__dot { background: var(--ok); }
.bi-stat--warn  { color: var(--warn); }
.bi-stat--warn  .bi-stat__dot { background: var(--warn); }
.bi-stat--error { color: var(--danger); }
.bi-stat--error .bi-stat__dot { background: var(--danger); }
.bi-stat--pending { color: #888; }
.bi-stat--pending .bi-stat__dot { background: #bbb; }
</style>
