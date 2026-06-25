<template>
  <div
    class="bi-dropzone"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <div class="bi-dz-icon">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line
        x1="12"
        y1="18"
        x2="12"
        y2="12"
      /><line
        x1="9"
        y1="15"
        x2="12"
        y2="12"
      /><line
        x1="15"
        y1="15"
        x2="12"
        y2="12"
      /></svg>
    </div>
    <div class="bi-dz-ttl">
      {{ t('bulkImport.dropTitle', 'Drag an Excel file here') }}
    </div>
    <div class="bi-dz-sub">
      {{ t('bulkImport.dropSub', 'or browse your computer to select a completed IRCC import template.') }}
    </div>
    <label class="bi-browse-btn">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line
        x1="12"
        y1="3"
        x2="12"
        y2="15"
      /></svg>
      {{ t('bulkImport.browse', 'Browse files') }}
      <input
        type="file"
        accept=".xlsx,.xls"
        hidden
        @change="handleFileInput"
      >
    </label>
    <div class="bi-dz-meta">
      <span>{{ t('bulkImport.accepted', 'Accepted:') }} <b>.xlsx</b>, <b>.xls</b></span>
      <span>{{ t('bulkImport.maxSize', 'Max') }} <b>5 MB</b> · {{ t('bulkImport.upTo', 'up to') }} <b>500 {{ t('bulkImport.rows', 'rows') }}</b></span>
      <span>33 {{ t('bulkImport.columnsDesc', 'columns across 10 sections') }}</span>
    </div>
    <a
      class="bi-dz-tmpl"
      href="#"
      @click.prevent
    >↓ {{ t('bulkImport.downloadTemplate', 'Download the IRCC template') }}</a>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const emit = defineEmits<(e: 'file', file: File)=> void>()
const { t } = useI18n()

function handleFileInput (e: Event) {
  if (!(e.target instanceof HTMLInputElement)) return
  const file = e.target.files?.[0]
  if (file) emit('file', file)
}

function handleDrop (e: DragEvent) {
  const file = e.dataTransfer?.files[0]
  if (file) emit('file', file)
}
</script>

<style scoped>
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
</style>
