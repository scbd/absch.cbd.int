<template>
  <Modal
    ref="modalRef"
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
      :documents="documents"
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
      <div v-else />
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
import messages from '~/app-text/components/bulk-documents-uploader.json'
import { ImportDocuments } from './utilities/import-documents.js'

const { realm } = useRealm()
const { mergeLocaleMessage, t } = useI18n()
const auth = useAuth()

// Set global translation messages to avoid having to import vue-i18n in each child component.
// TODO: Determine if this is supported by our current translations system.
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
const isLoading = ref(false)
const errors = ref([])
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
  const attributesList = await importDocuments.readXLSXFIle(changeEvent)

  // Map document attributes to the document schema
  const documentsJson = await importDocuments.mapDocumentAttributesToSchemaJson(attributesList)

  isLoading.value = false

  // Store errors
  errors.value = importDocuments.errors

  // Store document schema
  documents.value = documentsJson

  return documents
}
</script>
