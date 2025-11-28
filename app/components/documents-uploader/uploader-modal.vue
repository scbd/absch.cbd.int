<template>
  <Modal
    ref="modalRef"
    :modal-size="modalSize"
    @on-close="onClose"
  >
    <template #header>
      <BulkUploaderHeader
        @close-modal="onClose"
      />
    </template>

    <UploadButton
      v-if="!hasParsedFiles && !hasErrors"
      :is-loading="isLoading"
      @on-file-change="onFileChange"
    />

    <!-- TODO: Display Document Preview -->
    <DocumentsPreview
      v-if="hasParsedFiles"
      :sheet="sheet"
      :document-type="documentType"
    />

    <LoadingOverlay
      v-if="isLoading && hasParsedFiles"
      :caption="$t('creatingDocumentsLoader')"
    />

    <!-- TODO: Display Meaningful Errors  -->
    <ModalErrors
      v-if="hasErrors"
      :errors="errors"
    />

    <template #footer>
      <BulkUploaderFooter
        v-if="hasParsedFiles || hasErrors"
        :has-errors="hasErrors"
        @handle-confirm="handleConfirm"
        @handle-clear="handleClearFile"
      />
      <div
        v-else
        class="m-4"
      />
    </template>
  </Modal>
</template>
<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '../../services/composables/realm.js'
import KmDocumentApi from '~/api/km-document'
import BulkUploaderHeader from './uploader-header.vue'
import BulkUploaderFooter from './uploader-footer.vue'
import DocumentsPreview from './documents-preview.vue'
import LoadingOverlay from '../common/loading-overlay.vue'
import ModalErrors from './modal-errors.vue'
import UploadButton from './upload-button.vue'
import Modal from '../common/modal.vue'
import uploaderMessages from '~/app-text/components/bulk-documents-uploader.json'
import absMessages from '~/app-text/views/forms/edit/abs/edit-absPermit.json'
import contactMessages from '~/app-text/views/forms/edit/directives/edit-contact.json'
// import orgMessages from 'i18n/es/app/app-text/views/forms/view/view-organization.json'
import { ImportDocuments } from './utilities/import-documents.js'

const { realm } = useRealm()
const { mergeLocaleMessage, t } = useI18n()
const auth = useAuth()

// Set global translation messages to avoid having to import vue-i18n in each child component.
// TODO: Determine if this is supported by our current translations system.
const messages = {
  en: Object.assign(
    {},
    uploaderMessages.en,
    absMessages.en,
    contactMessages.en
    // orgMessages
  )
}
console.log(messages)

Object.entries(messages)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const props = defineProps({
  documentType: {
    type: String,
    default: 'ircc'
  }
})

const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token(), realm })
const importDocuments = new ImportDocuments(t, props.documentType)

const $emit = defineEmits(['onClose', 'refreshRecord'])

// Refs
const defaultDocumentJson = [{ header: { identifier: '' } }]
const documents = ref(defaultDocumentJson)
const sheet = ref([{ permitEquivalent: '' }])
const isLoading = ref(false)
const errors = ref([])
const modalSize = ref('xl')
const modalRef = shallowRef(null)

// Computed Properties
const hasErrors = computed(() => {
  return errors.value.length > 0
})

const hasParsedFiles = computed(() => {
  return documents.value[0].header.identifier.length > 0
})

// Event Hooks
onMounted(async () => {
  modalRef.value.show()

  isLoading.value = true

  await importDocuments.getKeywordsMap()

  errors.value = importDocuments.errors
  isLoading.value = false
})

// Methods
function handleClearFile () {
  isLoading.value = false
  errors.value = []
  importDocuments.setErrors([])
  documents.value = defaultDocumentJson
  modalSize.value = 'xl'
}

async function handleConfirm () {
  isLoading.value = true

  const requestPromises = documents.value.map((doc) => kmDocumentApi.createDocument(doc))

  return Promise.all(requestPromises)
    .then(() => {
      $emit('refreshRecord')
      handleClearFile()
      onClose()
      modalRef.value.close()
    })
}

function onClose () {
  $emit('onClose')
}

async function onFileChange (changeEvent) {
  handleClearFile()

  isLoading.value = true

  // Read File
  sheet.value = await importDocuments.readXLSXFIle(changeEvent)

  // Map document attributes to the document schema
  const documentsJson = await importDocuments.mapDocumentAttributesToSchemaJson(sheet.value.data)

  isLoading.value = false

  // Store errors
  errors.value = importDocuments.errors

  // Store document json
  documents.value = documentsJson
  modalSize.value = 'xxl'

  return documents
}
</script>
<style>
.modal-xxl {
  max-width: 95%;
}
import-file > .modal.fade > .modal-dialog {
  transition: transform .3s ease-out, max-width 0.1s ease-in-out;
}

.modal-header, .modal-footer {
  background-color: #EEE;
  color: #555;
}
</style>
