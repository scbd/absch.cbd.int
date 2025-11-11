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
<script setup lang="ts">
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import BulkUploaderFooter from './bulk-uploader-footer.vue'
import BulkUploaderHeader from './bulk-uploader-header.vue'
import UploadButton from './upload-button.vue'
import Modal from '../../../common/modal.vue'
// import { useXlSXSheetStore } from '../stores/xlsx-sheet/index'
import { readFile } from '../stores/xlsx-sheet/index'
import xlsxFileToDocumentAttributes from '../utilities/xlsx-file-to-document-attributes'
import mapDocumentAttributesToAPIJSON from '../utilities/document-attributes-to-api-json'
import { type DocumentAttributesMap } from '../utilities/xlsx-file-to-document-attributes/types'
import { type DocumentTypes } from '../data/document-types-list'

const props = defineProps<{
  documentType: DocumentTypes;
  onClose: Function;
}>()

// const xlsxSheetStore = useXlSXSheetStore()
const hasParsedFiles = ref(false) 

let sheet: XLSX.WorkSheet | Array<string> = []


const handleConfirm = () => {
  // POST to API to create Document Draft
}

const handleClearFile = () => {
  // POST to API to create Document Draft
  hasParsedFiles.value = false
}

const onModalClose = () => {
  console.log('onModalClose')
  console.log(' props.onClose',  props.onClose)
  props.onClose()
}

const onFileChange = async (changeEvent: Event) => {
  const docType :DocumentTypes = props.documentType
  // Read File
  // const readFile = xlsxSheetStore.readFile
  const workbook = await readFile(changeEvent)
  sheet = workbook.Sheets['Sheet3'] || []
  hasParsedFiles.value = true

  // // Parse File to JSON matching the attributes of a given document
  // const documentAttributesList :DocumentAttributesMap = xlsxFileToDocumentAttributes(docType, sheet)
  const documentAttributesList :DocumentAttributesMap = xlsxFileToDocumentAttributes(docType, sheet)
  console.log('documentAttributesList', documentAttributesList)

  // // Match document attributes to the API Schema
  const apiJson = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)
  console.log('apiJson', apiJson)

  // return apiJson
}
</script>

<style>
  .modal-dialog {
    margin: 30vh auto;  
  }
</style>
