<template>
  <div>
    <div
      class="modal d-block" tabindex="-1" role="dialog" aria-modal="true"
      aria-labelledby="bi-confirm-title" @keydown.esc="emit('onCancel')"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="bi-confirm-title" class="modal-title">
              {{ title }}
            </h5>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
            <slot />
          </div>
          <div class="modal-footer">
            <button ref="cancelButton" type="button" class="btn btn-secondary" @click="emit('onCancel')">
              {{ t('bulkImport.cancel', 'Cancel') }}
            </button>
            <button ref="confirmButton" type="button" class="btn" :class="confirmClass" @click="emit('onConfirm')">
              {{ confirmLabel }}
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

const props = defineProps<{
  title: string
  message: string
  confirmLabel: string
  confirmClass: string
}>()

const emit = defineEmits<(e: 'onConfirm' | 'onCancel')=> void>()
const { t } = useI18n()

const cancelButton = ref<HTMLButtonElement | null>(null)
const confirmButton = ref<HTMLButtonElement | null>(null)

// destructive confirmations start on Cancel so Enter can't discard data by accident
onMounted(() => {
  if (props.confirmClass.includes('btn-danger')) {
    cancelButton.value?.focus()
  } else {
    confirmButton.value?.focus()
  }
})
</script>
