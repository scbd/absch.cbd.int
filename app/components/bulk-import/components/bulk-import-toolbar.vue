<template>
  <div class="bi-toolbar">
    <span class="bi-toolbar__count">
      <b>{{ rowCount }}</b> {{ t('bulkImport.documents', 'documents') }}
    </span>
    <span class="bi-stat bi-stat--ok"><span class="bi-stat__dot" />{{ t('bulkImport.statusReady', 'Ready') }}</span>
    <span class="bi-stat bi-stat--warn"><span class="bi-stat__dot" />{{ t('bulkImport.statusWarning', 'Warning') }}</span>
    <span class="bi-stat bi-stat--error"><span class="bi-stat__dot" />{{ t('bulkImport.statusError', 'Error') }}</span>

    <span class="bi-toolbar__spacer" />

    <input
      :value="search"
      type="search"
      class="bi-toolbar__search"
      :placeholder="t('bulkImport.search', 'Search documents...')"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    >

    <select
      :value="jumpSection"
      class="bi-toolbar__jump"
      @change="emit('update:jumpSection', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">
        {{ t('bulkImport.jumpSection', 'Jump to section...') }}
      </option>
      <option
        v-for="grp in columnGroups"
        :key="grp.label"
        :value="grp.label"
      >
        {{ grp.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface ColumnGroup { label: string; keys: string[] }

defineProps<{
  rowCount: number
  columnGroups: ColumnGroup[]
  search: string
  jumpSection: string
}>()

const emit = defineEmits<(e: 'update:search' | 'update:jumpSection', value: string)=> void>()

const { t } = useI18n()
</script>

<style scoped>
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
.bi-stat {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
}
.bi-stat__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bi-stat--ok    { color: var(--ok); }
.bi-stat--ok    .bi-stat__dot { background: var(--ok); }
.bi-stat--warn  { color: var(--warn); }
.bi-stat--warn  .bi-stat__dot { background: var(--warn); }
.bi-stat--error { color: var(--danger); }
.bi-stat--error .bi-stat__dot { background: var(--danger); }
</style>
