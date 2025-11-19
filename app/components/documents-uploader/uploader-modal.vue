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
      :api-json="apiJson"
    />

    <CircleLoader
      v-if="isLoading && hasParsedFiles"
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
import BulkUploaderHeader from './uploader-header.vue'
import BulkUploaderFooter from './uploader-footer.vue'
import DocumentsPreview from './documents-preview.vue'
import CircleLoader from './loader-overly.vue'
import ModalErrors from './modal-errors.vue'
import UploadButton from './upload-button.vue'
import Modal from '../common/modal.vue'
import { readXLSXFIle } from './utilities/read-xlsx-file'
import xlsxFileToDocumentAttributes from './utilities/xlsx-file-to-document-attributes'
import { mapDocumentAttributesToAPIJSON, getKeywordsMap } from './utilities/document-attributes-to-api-json'

const props = defineProps({
  documentType: {
    type: String,
    default: 'ircc'
  },
  onClose: {
    type: Function,
    default: () => {}
  },
  recordRefresh: {
    type: Function,
    default: () => {}
  },
  createDocument: {
    type: Function,
    default: () => {}
  }
})

// Refs
const defaultApiJson = [{ header: { identifier: '' } }]
const apiJson = ref(defaultApiJson)
const isLoading = ref(false)
const errors = ref([])
const keywordsMap = ref([])
const modalRef = shallowRef(null)

// Computed Properties
const hasErrors = computed(() => {
  return errors.value.length > 0
})

const hasParsedFiles = computed(() => {
  return apiJson.value[0].header.identifier.length > 0
})

// Event Hooks
onMounted(async () => {
  modalRef.value.show()

  isLoading.value = true

  keywordsMap.value = await getKeywordsMap()
    .catch((error) => errors.value.push({ value: error, index: 0 }))

  isLoading.value = false
})

// Methods
function handleClearFile () {
  isLoading.value = false
  errors.value = []
  apiJson.value = defaultApiJson
}

async function handleConfirm () {
  isLoading.value = true

  const requestPromises = apiJson.value.map((doc) => props.createDocument(doc))

  return Promise.all(requestPromises)
    .then(() => {
      props.recordRefresh()
      handleClearFile()
      // Avoid emiting two function calls at once
      // as ng-vue only seems to be able to handle one function call at a time
      // TODO: Investigate further why ng-vue only allows emitting one function call at a time
      setTimeout(() => {
        modalRef.value.close()
        props.onClose()
      }, 1)
    })
}

async function onFileChange (changeEvent) {
  handleClearFile()

  isLoading.value = true
  const { documentType } = props

  // Read File
  const fileRead = await readXLSXFIle(changeEvent)
  errors.value = [...errors.value, ...fileRead.errors]

  const sheet = fileRead.workbook.Sheets['Sheet3'] || []

  // Parse File to JSON matching the attributes of a given document
  const documents = xlsxFileToDocumentAttributes(documentType, sheet)

  // Match document attributes to the API Schema
  const mapInfo = await mapDocumentAttributesToAPIJSON({
    documents,
    documentType,
    keywordsMap: keywordsMap.value
  })

  isLoading.value = false
  apiJson.value = mapInfo.documentsJson
  errors.value = mapInfo.errors

  return apiJson
}
</script>
