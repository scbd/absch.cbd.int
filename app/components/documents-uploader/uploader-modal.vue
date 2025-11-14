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

    <div class="previews-list">
      <div
        v-for="documentJson in apiJson"
        :key="documentJson.header.identifier"
        class="preview-box"
      >
        <h6> {{ documentJson.header.identifier }} </h6>
        <div
          v-if="documentJson.header.identifier.length > 0"
          class="preview"
        >
          <div> <strong>Data: </strong> </div>
          <pre> {{ apiJson }} </pre>
        </div>
      </div>
    </div>

    <template #footer>
      <BulkUploaderFooter
        v-if="hasParsedFiles"
        :is-loading="false"
        @handle-confirm="handleConfirm"
        @handle-clear="handleClearFile"
      />
      <div v-else />
    </template>
  </Modal>
</template>
<script setup>
import { ref } from 'vue'
import BulkUploaderHeader from './uploader-header.vue'
import BulkUploaderFooter from './uploader-footer.vue'
import UploadButton from './upload-button.vue'
import Modal from '../common/modal.vue'
import { readFile } from './utilities/xlsx-sheet/index'
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

const hasParsedFiles = ref(false)
const apiJson = ref([{ header: { identifier: '' } }])

let sheet = []

const handleConfirm = async () => {
  apiJson.value.forEach((doc) => {
    props.createDocument(doc)
  })
}

const handleClearFile = () => {
  // POST to API to create Document Draft
  hasParsedFiles.value = false
}

const onModalClose = () => {
  props.onClose()
}

const onFileChange = async (changeEvent) => {
  const docType = props.documentType
  // Read File
  // const readFile = xlsxSheetStore.readFile
  const workbook = await readFile(changeEvent)
  sheet = workbook.Sheets['Sheet3'] || []
  hasParsedFiles.value = true

  // // Parse File to JSON matching the attributes of a given document
  const documents = xlsxFileToDocumentAttributes(docType, sheet)
  console.log('Document Attributes List:', documents)

  // // Match document attributes to the API Schema
  const json = await mapDocumentAttributesToAPIJSON(documents, docType)
  console.log('API JSON:', json)
  apiJson.value = json

  // return apiJson
}
</script>

<style>
  .modal-dialog {
    margin: 30vh auto;
  }

  .previews-list {
    max-height: 400px;
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
