<template>
  <div id="document-uploader">
    <component
      :is="uploader"
      v-if="isOpen"
      :document-type="documentType"
      @refresh-record="$emit('refreshRecord')"
      @on-close="closeBulkUploader"
    >
      <template #header>
        <h5 class="modal-title">
          {{ $t('importIrccExcel') }}
        </h5>
        <p class="m-0">
          {{ $t('pleaseSelectExcelInfo') }}
        </p>
      </template>
    </component>

    <Transition name="fade">
      <div v-if="isLoading">
        <LoadingOverlay
          :caption="$t('loading')"
        />
      </div>
    </Transition>

    <a
      id="import-document-button"
      type="button"
      class="btn btn-primary btn-sm d-flex text-nowrap px-1"
      @click="openBulkUploader"
    >
      <i class="bi bi-file-earmark-arrow-up-fill ms-md-1 float-start" />
      <span class="d-none d-md-block float-end px-2">
        {{ $t('importIrcc') }}
      </span>
    </a>
  </div>
</template>
<script setup lang="ts">
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import LoadingOverlay from '../common/loading-overlay.vue'
import {
  ref, shallowRef, defineEmits, defineComponent,
  type Ref, type Component
} from 'vue'
import uploaderMessages from '~/app-text/components/bulk-documents-uploader.json'
import absMessages from '~/app-text/views/forms/edit/abs/edit-absPermit.json'
import recordListMessages from '~/app-text/views/register/record-list.json'
import contactMessages from '~/app-text/views/forms/edit/directives/edit-contact.json'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'

const uploader: Ref<Component> = shallowRef(defineComponent(() => () => ''))

const { mergeLocaleMessage } = useI18n()

const messages = [
  uploaderMessages,
  absMessages,
  contactMessages,
  recordListMessages
]

messages.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

defineProps<{
  documentType: DocumentTypes
}>()

const $emit = defineEmits(['onClose', 'refreshRecord'])

const isOpen = ref(false)
const isLoading = ref(false)

async function openBulkUploader (): Promise<boolean> {
  isLoading.value = true

  // Lazy load uploader component as it isn't needed in all contexts.
  await import('./uploader-modal.vue')
    .then(({ default: data }) => {
      const UploaderModal: Component = data
      uploader.value = UploaderModal
    })
    .catch((error: unknown) => { console.error(error) }) // eslint-disable-line no-console -- Show error in console

  isLoading.value = false
  isOpen.value = true
  return isOpen.value
}

function closeBulkUploader (): boolean {
  isOpen.value = false
  return isOpen.value
}
</script>
<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
