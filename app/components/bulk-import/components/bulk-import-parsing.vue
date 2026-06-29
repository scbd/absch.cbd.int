<template>
  <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-2 p-5">
    <div
      class="d-flex align-items-center justify-content-center rounded-3 mb-1"
      style="width: 56px; height: 56px; background: var(--ok-50); color: var(--ok);"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
      /><line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
      /><polyline points="10 9 9 9 8 9" /></svg>
    </div>
    <div
      class="fw-bold"
      style="font-size: 15px; color: #1a2e3b;"
    >
      {{ fileName }}
    </div>
    <div class="small text-muted">
      {{ t('bulkImport.parsingTitle', 'Reading and validating your file...') }}
    </div>
    <div
      class="progress mt-2"
      style="width: min(440px, 90%); height: 7px;"
    >
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progress + '%', background: 'var(--orange)' }"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
    <ul
      class="list-unstyled m-0 mt-1 p-0 d-flex flex-column gap-2"
      style="width: min(440px, 90%);"
    >
      <li
        v-for="step in steps"
        :key="step.key"
        class="bi-step d-flex align-items-center gap-2 small"
        :class="`bi-step--${step.status}`"
      >
        <span
          class="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          :class="step.status === 'done' ? 'bg-success text-white' : 'bi-step-ic--ring'"
          style="width: 20px; height: 20px;"
        >
          <svg
            v-if="step.status === 'done'"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
          ><polyline points="20 6 9 17 4 12" /></svg>
          <span
            v-else-if="step.status === 'active'"
            class="spinner-border"
            style="width: 14px; height: 14px; border-width: 2px; color: var(--orange);"
          />
        </span>
        <span>{{ stepLabel(step) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ParseStep } from '../framework/types'

defineProps<{ fileName: string; steps: ParseStep[]; progress: number }>()

const { t } = useI18n()

function stepLabel (step: ParseStep): string {
  if (step.key === 'openSheet') return t('bulkImport.step.openSheet', 'Workbook opened · sheet found')
  if (step.key === 'mapColumns') return step.detail ? `Mapped ${step.detail} columns to IRCC fields` : 'Mapping columns…'
  if (step.key === 'validateRows') return step.detail ? `Validating ${step.detail} rows against registries…` : 'Validating rows…'
  if (step.key === 'buildPreview') return t('bulkImport.step.buildPreview', 'Building preview')
  return step.key
}
</script>

<style scoped>
.bi-step         { color: #aab; }
.bi-step--done   { color: var(--ok); }
.bi-step--active { color: #1a2e3b; font-weight: 500; }
.bi-step-ic--ring { border: 2px solid #e0e5e8; }
</style>
