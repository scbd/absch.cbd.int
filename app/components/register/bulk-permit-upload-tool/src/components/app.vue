<template>
  <Modal>
    <template #header>
      <BulkUploaderHeader />
    </template>

    <UploadButton
      :is-loading="false"
      @on-file-change="onFileChange"
    />

    <template #footer>
      <BulkUploaderFooter
        v-if="xlsxSheetStore.hasParsedFiles"
        :is-loading="xlsxSheetStore.isLoading"
        @handle-confirm="handleConfirm"
        @handle-clear="xlsxSheetStore.handleClearFile"
      />
      <div v-else />
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import BulkUploaderFooter from './bulk-uploader-footer.vue'
import BulkUploaderHeader from './bulk-uploader-header.vue'
import UploadButton from './upload-button.vue'
import Modal from './modal.vue'
import { useXlSXSheetStore } from '../stores/xlsx-sheet/index'
import xlsxFileToDocumentAPIJSON from '../utilities/xlsx-data-to-api-json'

const props = defineProps({
  documentType: {
    type: String,
    default: 'ircc',
  },
})

const xlsxSheetStore = useXlSXSheetStore()

const handleConfirm = () => {
  // POST to API to create Document Draft
}

const onFileChange = async (changeEvent: Event) => {
  // Read File
  const file = await xlsxSheetStore.readFile(changeEvent)
  // Parse File to JSON matching the documents API Schema
  const docType = props.documentType
  console.log('docType', docType)

  const apiJson = await xlsxFileToDocumentAPIJSON(file.Sheets.Sheet3, docType)
  console.log('apiJson', apiJson)
  return apiJson
}
</script>
