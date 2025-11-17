<template>
  <Modal
    :is-shown="true"
    @on-close="onModalClose"
  >
    <template #header>
      <BulkUploaderHeader
        @close-modal="onModalClose"
      />
    </template>

    <UploadButton
      :is-loading="false"
      @on-file-change="onFileChange"
    />

    <CircleLoader
      v-if="isLoading"
    />

    <!-- TODO: When  -->
    <ModalErrors
      v-if="hasErrors"
      :errors="errors"
    />

    <!-- TODO: display parsed documents in a way that
    will be easy for th document creators to understand. -->
    <div
      v-if="hasParsedFiles"
      class="previews-list"
    >
      <div
        v-for="documentJson in apiJson"
        :key="documentJson.header.identifier"
        class="preview-box"
      >
        <h6> {{ documentJson.header.identifier }} </h6>
        <div
          class="preview"
        >
          <div> <strong>Data: </strong> </div>
          <pre> {{ apiJson }} </pre>
        </div>
      </div>
    </div>

    <template #footer>
      <BulkUploaderFooter
        v-if="hasParsedFiles || hasErrors"
        :is-loading="false"
        @handle-confirm="handleConfirm"
        @handle-clear="handleClearFile"
      />
      <div v-else />
    </template>
  </Modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import BulkUploaderHeader from './uploader-header.vue'
import BulkUploaderFooter from './uploader-footer.vue'
import CircleLoader from './loader-overly.vue'
import ModalErrors from './modal-errors.vue'
import UploadButton from './upload-button.vue'
import Modal from '../common/modal.vue'
import readFile from './utilities/read-xlsx-file'
import xlsxFileToDocumentAttributes from './utilities/xlsx-file-to-document-attributes'
import mapDocumentAttributesToAPIJSON from './utilities/document-attributes-to-api-json'

const props = defineProps({
  documentType: {
    type: String,
    default: 'ircc'
  },
  onClose: {
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

// Computed Properties
const hasErrors = computed(() => {
  return errors.value.length > 0
})

const hasParsedFiles = computed(() => {
  return apiJson.value[0].header.identifier.length > 0
})

// Methods
function handleClearFile () {
  // POST to API to create Document Draft
  errors.value = []
  apiJson.value = defaultApiJson
}

async function handleConfirm () {
  const requestPromises = apiJson.value.map((doc, index) => ({ response: props.createDocument(doc), index }))
  isLoading.value = true
  console.log('isLoading.value', isLoading.value)
  return Promise.all(requestPromises)
    .then(() => { isLoading.value = false })
    .catch((error) => {
      isLoading.value = false
      errors.value.push({ value: error, index: error.index })
      console.log('error', error)
      console.warn(error)
    })
}

function onModalClose () {
  props.onClose()
}

async function onFileChange (changeEvent) {
  handleClearFile()
  const docType = props.documentType
  // Read File
  const workbook = await readFile(changeEvent)
  const sheet = workbook.Sheets['Sheet3'] || []

  // Parse File to JSON matching the attributes of a given document
  const documents = xlsxFileToDocumentAttributes(docType, sheet)
  console.log('Document Attributes List:', documents)

  // Match document attributes to the API Schema
  return mapDocumentAttributesToAPIJSON(documents, docType)
    .then((result) => {
      console.log('API JSON:', result)
      if (result.errors.length > 0) {
        errors.value = result.errors
      }
      apiJson.value = result.documentsJson
      return result
    })
    .catch(error => {
      console.log('error', error)
      errors.value.push(error)
      console.error(error)
    })
    .finally(() => { isLoading.value = false })

  // return apiJson
}
</script>

<style>
  .modal-dialog {
    margin: 30vh auto;
  }

  .previews-list {
    max-height: 420px;
    overflow: scroll;
    padding: 10px;
  }
  .preview-box {
    margin-top: 2em;
  }
  .preview {
    max-height: 130px;
    overflow: scroll;
    background: #f1f1f1;
    border: 2px solid;
    padding: 4px;
  }
</style>
