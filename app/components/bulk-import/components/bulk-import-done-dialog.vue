<template>
  <div>
    <div
      class="modal d-block" tabindex="-1" role="dialog" aria-modal="true"
      aria-labelledby="bi-done-title" @keydown.esc="emit('onClose')"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="bi-done-title" class="modal-title">
              {{ t('bulkImport.importSuccess') }}
            </h5>
          </div>
          <div class="modal-body">
            <p :class="{ 'mb-2': canPublish }">
              {{ message }}
            </p>
            <p v-if="canPublish" class="mb-0">
              {{ t('bulkImport.publishPrompt') }}
            </p>
          </div>
          <div class="modal-footer">
            <button
              v-if="canPublish" ref="primaryButton" type="button"
              class="btn btn-primary" @click="emit('onPublish')"
            >
              {{ t('bulkImport.publishNow') }}
            </button>
            <button
              ref="closeButton" type="button" :class="canPublish ? 'btn btn-secondary' : 'btn btn-primary'"
              @click="emit('onClose')"
            >
              {{ canPublish ? t('bulkImport.later') : t('bulkImport.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ message: string; canPublish: boolean }>()
const emit = defineEmits<(e: 'onClose' | 'onPublish')=> void>()
const { t } = useI18n()

const primaryButton = ref<HTMLButtonElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

onMounted(() => (primaryButton.value ?? closeButton.value)?.focus())
</script>
