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
import { readXLSXFIle } from './utilities/read-xlsx-file'
import xlsxFileToDocumentAttributes from './utilities/xlsx-file-to-document-attributes'
import messages from '~/app-text/components/bulk-documents-uploader.json'
import { mapDocumentAttributesToSchemaJson, getKeywordsMap } from './utilities/document-attributes-to-schema-json'
const { realm } = useRealm()
const { mergeLocaleMessage, t } = useI18n()
const auth = useAuth()
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token(), realm })

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

const $emit = defineEmits(['onClose', 'refreshRecord'])

// Refs
const defaultDocumentJson = [{ header: { identifier: '' } }]
const documents = ref(defaultDocumentJson)
const isLoading = ref(false)
const errors = ref([])
const keywordsMap = ref([])
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

  keywordsMap.value = await getKeywordsMap(props.documentType)
    .catch((error) => {
      storeErrors([{ message: 'keywordsListError' }])
      console.error(error)
    })
  isLoading.value = false
})

// Methods
function handleClearFile () {
  isLoading.value = false
  errors.value = []
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

function storeErrors (newErrors) {
  newErrors.forEach((error) => {
    errors.value.push({ message: t(error.message) })
  })
}

async function onFileChange (changeEvent) {
  handleClearFile()

  isLoading.value = true
  const { documentType } = props

  // Read File
  const fileRead = await readXLSXFIle(changeEvent)
  storeErrors(fileRead.errors)
  const sheet = fileRead.workbook.Sheets['Sheet3'] || []

  // Parse File to JSON matching the attributes of a given document
  const getAttributesResult = xlsxFileToDocumentAttributes(documentType, sheet)
  storeErrors(getAttributesResult.errors)

  // Map document attributes to the document schema
  const mapResult = await mapDocumentAttributesToSchemaJson({
    attributesList: getAttributesResult.documents,
    documentType,
    keywordsMap: keywordsMap.value
  })
  errors.value = mapResult.errors.map(result => ({ message: `${t(result.error.message)} Document Row: ${result.index}` }))

  // Store document schema
  documents.value = mapResult.documentsJson

  isLoading.value = false
  return documents
}
</script>
