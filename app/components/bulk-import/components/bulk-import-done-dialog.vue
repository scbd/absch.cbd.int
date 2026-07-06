<template>
  <div
    class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background: rgba(255,255,255,.85); z-index: 10;"
  >
    <div class="bg-white border rounded p-4 text-center shadow" style="max-width: 400px;">
      <p class="fw-semibold mb-1">
        {{ t('bulkImport.importSuccess') }}
      </p>
      <p class="small text-muted mb-0">
        {{ message }}
      </p>
      <div class="mt-3 d-flex justify-content-end">
        <button class="btn btn-primary" @click="emit('onClose')">
          {{ t('bulkImport.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ message: string }>()
const emit = defineEmits<(e: 'onClose')=> void>()
const { t } = useI18n()
</script>
