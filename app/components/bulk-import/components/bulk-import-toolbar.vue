<template>
  <div class="d-flex align-items-center gap-2 border-bottom flex-shrink-0 flex-wrap px-3 py-2">
    <span class="small">
      <b class="fw-bold">{{ rowCount }}</b> {{ t('bulkImport.documents', 'documents') }}
    </span>
    <span class="d-inline-flex align-items-center gap-1 small fw-semibold text-success">
      <span class="bi-stat__dot bg-success" />{{ t('bulkImport.statusReady', 'Ready') }}
    </span>
    <span class="d-inline-flex align-items-center gap-1 small fw-semibold text-warning">
      <span class="bi-stat__dot bg-warning" />{{ t('bulkImport.statusWarning', 'Warning') }}
    </span>
    <span class="d-inline-flex align-items-center gap-1 small fw-semibold text-danger">
      <span class="bi-stat__dot bg-danger" />{{ t('bulkImport.statusError', 'Error') }}
    </span>

    <span class="flex-grow-1" />

    <input
      :value="search" type="search"
      class="form-control form-control-sm" style="width: 210px;"
      :placeholder="t('bulkImport.search', 'Search documents...')"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  rowCount: number
  search: string
}>()

const emit = defineEmits<(e: 'update:search', value: string)=> void>()

const { t } = useI18n()
</script>

<style scoped>
.bi-stat__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
</style>
