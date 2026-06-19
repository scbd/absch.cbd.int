<template>
  <div class="bi-confirm-overlay">
    <div class="bi-confirm">
      <p>{{ message }}</p>
      <div class="mt-3 d-flex gap-2 justify-content-end">
        <button
          class="btn btn-secondary"
          @click="emit('cancel')"
        >
          {{ t('bulkImport.cancel', 'Cancel') }}
        </button>
        <button
          class="btn"
          :class="confirmClass"
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'

defineProps<{
  message: string
  confirmLabel: string
  confirmClass: string
}>()

const emit = defineEmits<(e: 'confirm' | 'cancel')=> void>()
const { t } = useI18n()
</script>

<style scoped>
.bi-confirm-overlay {
  position: absolute; inset: 0; background: rgba(255,255,255,.85);
  display: flex; align-items: center; justify-content: center; z-index: 10;
}
.bi-confirm {
  background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
  padding: 24px 32px; max-width: 400px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,.12);
}
</style>
