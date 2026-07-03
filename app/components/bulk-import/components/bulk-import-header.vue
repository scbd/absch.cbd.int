<template>
  <div class="d-flex align-items-start gap-3 bg-white border-bottom flex-shrink-0" style="padding: 18px 22px;">
    <div
      class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-2"
      style="width: 42px; height: 42px; background: var(--ok-50); color: var(--ok);"
    >
      <svg
        width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    </div>
    <div class="flex-grow-1" style="min-width: 0;">
      <h1 class="m-0 fw-bold" style="font-size: 18px; color: #0b3b4d; line-height: 1.2;">
        {{ t('title') }}
      </h1>
      <div class="small text-muted mt-1">
        <span v-if="phase === 'empty' || phase === 'parse-error'">{{ t('bulkImport.selectFile', 'Select a file to begin') }}</span>
        <span v-else-if="phase === 'parsing'">{{ t('bulkImport.reading', 'Reading file…') }}</span>
        <span v-else>{{ t('bulkImport.previewReady', 'Review the records below before importing') }}</span>
      </div>
      <div
        v-if="phase !== 'empty' && phase !== 'parsing' && phase !== 'parse-error'"
        class="d-inline-flex align-items-center gap-2 bg-white border rounded-2 small mt-2"
        style="padding: 5px 8px 5px 11px; color: #445;"
      >
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
        <b class="fw-semibold">{{ fileName }}</b>
        <span>·</span>
        <span>{{ rowCount }} {{ t('bulkImport.rows', 'rows') }}</span>
        <button
          type="button" class="btn btn-outline-secondary btn-sm"
          style="font-size: .78rem; padding: 2px 8px;" @click="emit('onClear')"
        >
          {{ t('bulkImport.replace', 'Replace') }}
        </button>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-outline-secondary d-flex align-items-center justify-content-center flex-shrink-0 p-0"
      style="width: 34px; height: 34px; border-radius: 7px;"
      :disabled="phase === 'importing'" @click="emit('onClose')"
    >
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
      ><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { UploaderPhase } from '../framework/types'

defineProps<{ phase: UploaderPhase; fileName: string; rowCount: number }>()
const emit = defineEmits<(e: 'onClose' | 'onClear')=> void>()
const { t } = useI18n()
</script>
