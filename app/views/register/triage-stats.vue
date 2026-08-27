<template>
  <div class="row g-2 mb-4">
    <div class="col-md-3">
      <div class="card shadow-sm stat-stripe stat-stripe-pending">
        <div class="card-body py-2">
          <div class="text-uppercase text-muted small">
            {{ t('statPending') }}
          </div>
          <div class="fs-4 fw-bold">
            {{ stats.pendingCount }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm stat-stripe stat-stripe-oldest">
        <div class="card-body py-2">
          <div class="text-uppercase text-muted small">
            {{ t('statOldestPending') }}
          </div>
          <div class="fs-4 fw-bold stat-oldest-value">
            {{ stats.oldestPendingWeeks !== undefined ? `${stats.oldestPendingWeeks} ${t('weeks')}` : '—' }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm stat-stripe stat-stripe-week">
        <div class="card-body py-2">
          <div class="text-uppercase text-muted small">
            {{ t('statNewThisWeek') }}
          </div>
          <div class="fs-4 fw-bold">
            {{ stats.newThisWeekCount }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm stat-stripe stat-stripe-mine">
        <div class="card-body py-2">
          <div class="text-uppercase text-muted small">
            {{ t('statAssignedToMe') }}
          </div>
          <div class="fs-4 fw-bold">
            {{ stats.assignedToMeCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/register/admin-triage-list.json'

defineProps<{
  stats: {
    pendingCount: number
    oldestPendingWeeks: number | undefined
    newThisWeekCount: number
    assignedToMeCount: number
  }
}>()

const { t } = useI18n({ messages })
</script>

<style scoped>
/* Bootstrap's border-{color} utility colors every border side, not just one —
   there's no BS5 utility for "colored left stripe, neutral border elsewhere",
   so this one accent needs custom CSS. */
.stat-stripe {
  position: relative;
  overflow: hidden;
}
.stat-stripe::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
}
.stat-stripe-pending::before { background: var(--pending); }
.stat-stripe-oldest::before { background: var(--rejected); }
.stat-stripe-week::before { background: var(--accent); }
.stat-stripe-mine::before { background: var(--approved); }
.stat-oldest-value { color: var(--rejected); }
</style>
