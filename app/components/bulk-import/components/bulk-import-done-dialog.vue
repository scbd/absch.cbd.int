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
            {{ message }}
          </div>
          <div class="modal-footer">
            <button ref="closeButton" type="button" class="btn btn-primary" @click="emit('onClose')">
              {{ t('bulkImport.close') }}
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

defineProps<{ message: string }>()
const emit = defineEmits<(e: 'onClose')=> void>()
const { t } = useI18n()

const closeButton = ref<HTMLButtonElement | null>(null)

onMounted(() => closeButton.value?.focus())
</script>
