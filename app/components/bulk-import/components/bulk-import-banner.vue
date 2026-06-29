<template>
  <div
    v-if="banner"
    class="d-flex gap-3 align-items-start small border-bottom flex-shrink-0 overflow-hidden"
    :class="banner.level === 'ok' ? 'bi-banner--ok' : 'bi-banner--danger'"
    style="padding: 12px 20px; flex: 0 1 auto;"
  >
    <div
      class="d-flex align-items-center justify-content-center flex-shrink-0"
      :class="banner.level === 'ok' ? 'bi-ic--ok' : 'bi-ic--danger'"
      style="width: 22px; height: 22px; margin-top: 1px;"
    >
      <svg
        v-if="banner.level === 'ok'"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      ><polyline points="20 6 9 17 4 12" /></svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      ><circle
        cx="12"
        cy="12"
        r="10"
      /><line
        x1="12"
        y1="8"
        x2="12"
        y2="12"
      /><line
        x1="12"
        y1="16"
        x2="12.01"
        y2="16"
      /></svg>
    </div>
    <div
      class="d-flex flex-column flex-grow-1 overflow-hidden"
      style="min-height: 0;"
    >
      <div
        class="fw-semibold"
        :class="banner.level === 'ok' ? 'bi-head--ok' : 'bi-head--danger'"
      >
        {{ banner.text }}
      </div>
      <ul
        v-if="bannerErrors.length"
        class="list-unstyled mt-2 mb-0 p-0 d-flex flex-column gap-1"
        style="max-height: 180px; overflow-y: auto;"
      >
        <li
          v-for="group in bannerErrors"
          :key="group.row"
          class="d-flex align-items-start gap-2"
        >
          <span
            class="font-monospace fw-bold rounded-1 border flex-shrink-0"
            :class="group.worstLevel === 'error' ? 'bi-rk--error' : 'bi-rk--warn'"
            style="font-size: 11.5px; padding: 1px 6px; white-space: nowrap; margin-top: 1px;"
          >
            Row {{ group.row }}
          </span>
          <span
            class="d-flex flex-column"
            style="gap: 2px;"
          >
            <span
              v-for="(item, i) in group.items"
              :key="i"
              class="d-block"
            >
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
        {{ t('bulkImport.fixHint', 'Fix the highlighted cells in your Excel file and upload it again. Rows without issues are kept.') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

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
  banner: { level: 'ok' | 'danger'; text: string } | null
  bannerErrors: BannerErrorGroup[]
}>()

const { t } = useI18n()
</script>

<style scoped>
.bi-banner--ok     { background: var(--ok-50);     border-color: #c3e0cc; }
.bi-banner--danger { background: var(--danger-50); border-color: var(--danger-line); }
.bi-ic--ok     { color: var(--ok); }
.bi-ic--danger { color: var(--danger); }
.bi-head--ok     { color: #1a5c35; }
.bi-head--danger { color: #a8322e; }
.bi-rk--error { border-color: var(--danger-line) !important; color: #a8322e; }
.bi-rk--warn  { border-color: var(--warn-line) !important;   color: #7a5010; }
.bi-hint--ok   { color: #1a5c35; }
.bi-hint--warn { color: #7a5010; }
</style>
