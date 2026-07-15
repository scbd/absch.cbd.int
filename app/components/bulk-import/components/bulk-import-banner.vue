<template>
  <div
    v-if="banner"
    class="d-flex gap-3 align-items-start small border-bottom flex-shrink-0 overflow-hidden"
    :class="banner.level === 'ok' ? 'bi-banner--ok' : banner.level === 'importing' ? 'bi-banner--importing' : 'bi-banner--danger'"
    style="padding: 12px 20px; flex: 0 1 auto;"
  >
    <div
      class="d-flex align-items-center justify-content-center flex-shrink-0"
      :class="banner.level === 'ok' ? 'bi-ic--ok' : banner.level === 'importing' ? 'bi-ic--importing' : 'bi-ic--danger'"
      style="width: 22px; height: 22px; margin-top: 1px;"
    >
      <svg
        v-if="banner.level === 'ok'"
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
      ><polyline points="20 6 9 17 4 12" /></svg>
      <svg
        v-else-if="banner.level === 'importing'"
        class="bi-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
      ><circle cx="12" cy="12" r="10" stroke-opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
      <svg
        v-else
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
      ><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    </div>
    <div class="d-flex flex-column flex-grow-1 overflow-hidden" style="min-height: 0;">
      <div class="d-flex align-items-center gap-3 flex-wrap">
        <div
          class="fw-semibold"
          :class="banner.level === 'ok' ? 'bi-head--ok' : banner.level === 'importing' ? 'bi-head--importing' : 'bi-head--danger'"
        >
          {{ banner.text }}
        </div>
        <template v-if="stats">
          <span class="fw-semibold">{{ stats.documents }} {{ t('bulkImport.documents') }}</span>
          <span class="d-inline-flex align-items-center gap-1 fw-semibold text-danger">
            <span class="bi-stat__dot bg-danger" />{{ stats.errors }} {{ t('bulkImport.countErrors') }}
          </span>
          <span class="d-inline-flex align-items-center gap-1 fw-semibold text-warning">
            <span class="bi-stat__dot bg-warning" />{{ stats.warnings }} {{ t('bulkImport.countWarnings') }}
          </span>
          <span class="d-inline-flex align-items-center gap-1 fw-semibold text-success">
            <span class="bi-stat__dot bg-success" />{{ stats.ready }} {{ t('bulkImport.countReady') }}
          </span>
        </template>
        <span class="flex-grow-1" />
        <button
          v-if="bannerErrors.length"
          type="button" class="bi-collapse-btn d-inline-flex align-items-center gap-1"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? t('bulkImport.showDetails') : t('bulkImport.hideDetails') }}
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
            :style="collapsed ? '' : 'transform: rotate(180deg);'"
          ><polyline points="6 9 12 15 18 9" /></svg>
        </button>
      </div>
      <ul
        v-if="bannerErrors.length && !collapsed"
        class="list-unstyled mt-2 mb-0 p-0 d-flex flex-column gap-1"
        style="max-height: 180px; overflow-y: auto;"
      >
        <li v-for="group in bannerErrors" :key="group.row" class="d-flex align-items-start gap-2">
          <span
            class="font-monospace fw-bold rounded-1 border flex-shrink-0"
            :class="group.worstLevel === 'error' ? 'bi-rk--error' : 'bi-rk--warn'"
            style="font-size: 11.5px; padding: 1px 6px; white-space: nowrap; margin-top: 1px;"
          >
            Row {{ group.row }}
          </span>
          <span class="d-flex flex-column" style="gap: 2px;">
            <span v-for="(item, i) in group.items" :key="i" class="d-block">
              <b>{{ item.fieldLabel }}</b> — {{ item.message }}
            </span>
          </span>
        </li>
      </ul>
      <div
        v-if="bannerErrors.length"
        class="mt-2 small"
        :class="banner.level === 'ok' ? 'bi-hint--ok' : 'bi-hint--warn'"
      >
        {{ t('bulkImport.fixHint') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { BannerStats } from '../framework/types'

export interface BannerErrorItem {
  fieldLabel: string
  message: string
  level: 'error' | 'warning'
}

export interface BannerErrorGroup {
  row: number
  worstLevel: 'error' | 'warning'
  items: BannerErrorItem[]
}

defineProps<{
  banner: { level: 'ok' | 'danger' | 'importing'; text: string } | null
  bannerErrors: BannerErrorGroup[]
  stats: BannerStats | null
}>()

const { t } = useI18n()

const collapsed = ref(false)
</script>

<style scoped>
.bi-banner--ok        { background: var(--ok-50);     border-color: #c3e0cc; }
.bi-banner--danger    { background: var(--danger-50); border-color: var(--danger-line); }
.bi-banner--importing { background: #f0f4ff;          border-color: #c5d0f0; }
.bi-ic--ok        { color: var(--ok); }
.bi-ic--danger    { color: var(--danger); }
.bi-ic--importing { color: #4a6cf7; }
.bi-head--ok        { color: #1a5c35; }
.bi-head--danger    { color: #a8322e; }
.bi-head--importing { color: #2a3eb1; }
@keyframes bi-spin { to { transform: rotate(360deg); } }
.bi-spinner { animation: bi-spin 0.8s linear infinite; }
.bi-rk--error { border-color: var(--danger-line) !important; color: #a8322e; }
.bi-rk--warn  { border-color: var(--warn-line) !important;   color: #7a5010; }
.bi-hint--ok   { color: #1a5c35; }
.bi-hint--warn { color: #7a5010; }
.bi-stat__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.bi-collapse-btn {
  background: none; border: 1px solid currentColor; border-radius: 5px;
  color: inherit; font-size: 12px; font-weight: 600; padding: 2px 8px; cursor: pointer;
}
.bi-collapse-btn svg { transition: transform .15s ease; }
</style>
