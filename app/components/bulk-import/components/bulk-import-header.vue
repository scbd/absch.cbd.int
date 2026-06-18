<template>
  <div class="bi-head">
    <div class="bi-head__ic">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    </div>
    <div class="bi-head__ttl">
      <h1>{{ t('bulkImport.ircc.title') }}</h1>
      <div class="bi-head__sub">
        <span v-if="phase === 'empty'">{{ t('bulkImport.selectFile', 'Select a file to begin') }}</span>
        <span v-else-if="phase === 'parsing'">{{ t('bulkImport.reading', 'Reading file…') }}</span>
        <span v-else>{{ t('bulkImport.previewReady', 'Review the records below before importing') }}</span>
      </div>
      <div v-if="phase !== 'empty' && phase !== 'parsing'" class="bi-file-chip">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <b>{{ fileName }}</b>
        <span class="bi-file-chip__sep">·</span>
        <span class="bi-file-chip__rows">{{ rowCount }} {{ t('bulkImport.rows', 'rows') }}</span>
        <button type="button" class="bi-file-chip__replace" @click="emit('clear')">
          {{ t('bulkImport.replace', 'Replace') }}
        </button>
      </div>
    </div>
    <button type="button" class="bi-head__close" :disabled="phase === 'importing'" @click="emit('close')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'

defineProps<{ phase: string; fileName: string; rowCount: number }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'clear'): void }>()
const { t } = useI18n()
</script>

<style scoped>
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
</style>
