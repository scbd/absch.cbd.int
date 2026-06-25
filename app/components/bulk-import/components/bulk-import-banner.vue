<template>
  <div
    v-if="banner"
    class="bi-banner"
    :class="banner.level === 'ok' ? 'bi-banner--ok' : 'bi-banner--danger'"
  >
    <div class="bi-banner__ic">
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
    <div class="bi-banner__body">
      <div class="bi-banner__head">
        {{ banner.text }}
      </div>
      <ul
        v-if="bannerErrors.length"
        class="bi-banner__list"
      >
        <li
          v-for="group in bannerErrors"
          :key="group.row"
        >
          <span
            class="bi-rk"
            :class="group.worstLevel === 'error' ? 'bi-rk--error' : 'bi-rk--warn'"
          >
            Row {{ group.row }}
          </span>
          <span class="bi-rk-items">
            <span
              v-for="(item, i) in group.items"
              :key="i"
              class="bi-rk-item"
            >
              <b>{{ item.fieldLabel }}</b> — {{ item.message }}
            </span>
          </span>
        </li>
      </ul>
      <div
        v-if="bannerErrors.length"
        class="bi-banner__hint"
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
.bi-banner {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 12px 20px; font-size: 13px;
  border-bottom: 1px solid transparent;
  min-height: 0; overflow: hidden;
  flex: 0 1 auto;
}
.bi-banner__body {
  display: flex; flex-direction: column; min-height: 0; flex: 1; overflow: hidden;
}
.bi-banner--ok     { background: var(--ok-50);     border-color: #c3e0cc; }
.bi-banner--danger { background: var(--danger-50); border-color: var(--danger-line); }
.bi-banner__ic {
  width: 22px; height: 22px; flex-shrink: 0; margin-top: 1px;
  display: flex; align-items: center; justify-content: center;
}
.bi-banner--ok .bi-banner__ic { color: var(--ok); }
.bi-banner--danger .bi-banner__ic { color: var(--danger); }
.bi-banner__head { font-weight: 600; color: inherit; line-height: 1.4; }
.bi-banner--ok .bi-banner__head { color: #1a5c35; }
.bi-banner--danger .bi-banner__head { color: #a8322e; }
.bi-banner__list {
  margin: 6px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px;
  flex: 1; overflow-y: auto; min-height: 0;
}
.bi-banner__list li { display: flex; align-items: flex-start; gap: 7px; font-size: 12.5px; color: #4a2828; }
.bi-rk {
  font-family: monospace; font-size: 11.5px; font-weight: 600; border-radius: 4px;
  padding: 1px 6px; white-space: nowrap; flex-shrink: 0; margin-top: 1px;
}
.bi-rk--error { background: #fff; border: 1px solid var(--danger-line); color: #a8322e; }
.bi-rk--warn  { background: #fff; border: 1px solid var(--warn-line);   color: #7a5010; }
.bi-rk-items { display: flex; flex-direction: column; gap: 2px; }
.bi-rk-item { display: block; }
.bi-banner__hint { margin-top: 8px; font-size: 12px; color: #7a5010; }
.bi-banner--ok .bi-banner__hint { color: #1a5c35; }
</style>
