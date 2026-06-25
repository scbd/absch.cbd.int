<template>
  <div class="bi-parsing">
    <div class="bi-parsing__icon">
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
    <div class="bi-parsing__name">
      {{ fileName }}
    </div>
    <div class="bi-parsing__sub">
      {{ t('bulkImport.parsingTitle', 'Reading and validating your file...') }}
    </div>
    <div class="bi-parsing__bar-track">
      <div
        class="bi-parsing__bar-fill"
        :style="{ width: progress + '%' }"
      />
    </div>
    <ul class="bi-parsing__steps">
      <li
        v-for="step in steps"
        :key="step.key"
        class="bi-parsing__step"
        :class="`bi-parsing__step--${step.status}`"
      >
        <span class="bi-parsing__step-ic">
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
            class="bi-parsing__spinner"
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
