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

    <div class="preview">
      <div> Data: </div>
      <pre> {{ apiJson }} </pre>
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
import * as XLSX from 'xlsx'
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
    default: 'ircc',
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  createDocument: {
    type: Function,
    default: () => {},
  }
})

// const xlsxSheetStore = useXlSXSheetStore()
const hasParsedFiles = ref(false)
const apiJson = ref({ header: { identifier: '' } })

let sheet = []


const handleConfirm = async () => {
   props.createDocument(apiJson.value)
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
  // const documentAttributesList :DocumentAttributesMap = xlsxFileToDocumentAttributes(docType, sheet)
  const documentAttributesList = xlsxFileToDocumentAttributes(docType, sheet)
  console.log('Document Attributes List:', documentAttributesList)

  // // Match document attributes to the API Schema
  const json = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)
  console.log('API JSON:', json)
  apiJson.value = json

  // return apiJson
}
</script>

<style>
  .modal-dialog {
    margin: 30vh auto;
  }
  .preview {
    max-height: 400px;
    overflow: scroll;
  }
</style>
