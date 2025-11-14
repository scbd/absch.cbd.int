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
import { createDocument } from '../../api/document'
import mapDocumentAttributesToAPIJSON from './utilities/document-attributes-to-api-json'
import { useAuth, useUser } from "@scbd/angular-vue/src/index.js";
import { useRealm } from "../../services/composables/realm.js";
//import { createDocument } from './api/make-api-request'
// import { type DocumentAttributesMap } from './utilities/xlsx-file-to-document-attributes/types'
// import { type DocumentTypes } from './data/document-types-list'
// import { type ApiDocumentType } from './utilities/document-attributes-to-api-json/schemas/types'


const props = defineProps({
  documentType: {
    type: String,
    default: 'ircc',
  },
  onClose: {
    type: Function,
    default: () => {},
  }
})

// const xlsxSheetStore = useXlSXSheetStore()
const hasParsedFiles = ref(false)
const apiJson = ref({ header: { identifier: '' } })

let sheet = []


const handleConfirm = async () => {
  //const realm = useRealm();
  //const user = useUser();
  const auth = useAuth();
  const token = auth.token()
  console.log('token', token)
  console.log('token', auth)
  console.log('token', user)

  const options = { tokenReader: () => token }
  createDocument(apiJson.value, options)
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
  console.log('documentAttributesList', documentAttributesList)

  // // Match document attributes to the API Schema
  const json = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)
  apiJson.value = json
  console.log('hello ', apiJson.value)

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
