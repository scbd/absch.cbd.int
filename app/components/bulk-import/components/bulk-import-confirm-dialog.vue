<template>
  <div
    class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background: rgba(255,255,255,.85); z-index: 10;"
  >
    <div
      class="bg-white border rounded p-4 text-center shadow"
      style="max-width: 400px;"
    >
      <p>{{ message }}</p>
      <slot />
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
import { useI18n } from 'vue-i18n'

defineProps<{
  message: string
  confirmLabel: string
  confirmClass: string
}>()

const emit = defineEmits<(e: 'confirm' | 'cancel')=> void>()
const { t } = useI18n()
</script>
