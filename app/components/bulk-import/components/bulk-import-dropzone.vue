<template>
  <div
    class="bi-dropzone flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-2 rounded m-4"
    style="color: #667; background: #fafbfc;"
    @dragover.prevent @drop.prevent="handleDrop"
  >
    <div
      class="d-flex align-items-center justify-content-center rounded-3 mb-1"
      style="width: 60px; height: 60px; background: var(--ok-50); color: var(--ok);"
    >
      <svg
        width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
      ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="12" y2="12" /><line x1="15" y1="15" x2="12" y2="12" /></svg>
    </div>
    <div class="fw-bold" style="font-size: 16px; color: #1a2e3b;">
      {{ t('bulkImport.dropTitle', 'Drag an Excel file here') }}
    </div>
    <div class="small text-muted text-center" style="max-width: 420px;">
      {{ t('bulkImport.dropSub', 'or browse your computer to select a completed IRCC import template.') }}
    </div>
    <label class="bi-browse-btn d-inline-flex align-items-center gap-2 fw-semibold text-white mt-1">
      <svg
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
      ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
      {{ t('bulkImport.browse', 'Browse files') }}
      <input type="file" accept=".xlsx,.xls" hidden @change="handleFileInput">
    </label>
    <div class="d-flex align-items-center gap-4 small text-muted mt-2">
      <span>{{ t('bulkImport.accepted', 'Accepted:') }} <b class="text-secondary">xlsx</b>, <b class="text-secondary">.xls</b></span>
      <span>{{ t('bulkImport.maxSize', 'Max') }} <b class="text-secondary">5 MB</b> · {{ t('bulkImport.upTo', 'up to') }} <b class="text-secondary">500 {{ t('bulkImport.rows', 'rows') }}</b></span>
      <span>33 {{ t('bulkImport.columnsDesc', 'columns across 10 sections') }}</span>
    </div>
    <a
      class="small fw-medium text-decoration-none" style="color: var(--ok);"
      href="#" @click.prevent
    >↓ {{ t('bulkImport.downloadTemplate', 'Download the IRCC template') }}</a>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits<(e: 'onFileSelected', file: File)=> void>()
const { t } = useI18n()

function handleFileInput (e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return
  const file = e.target.files?.[0]
  if (file) emit('onFileSelected', file)
}

function handleDrop (e: DragEvent) {
  const file = e.dataTransfer?.files[0]
  if (file) emit('onFileSelected', file)
}
</script>

<style scoped>
.bi-dropzone { border: 2px dashed var(--line); }
.bi-browse-btn {
  background: var(--orange); border: none; border-radius: 7px;
  padding: 9px 20px; font-size: 14px; cursor: pointer;
}
.bi-browse-btn:hover { background: #c94827; }
</style>
