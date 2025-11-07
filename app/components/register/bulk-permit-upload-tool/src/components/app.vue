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
import * as XLSX from 'xlsx'
import BulkUploaderFooter from './bulk-uploader-footer.vue'
import BulkUploaderHeader from './bulk-uploader-header.vue'
import UploadButton from './upload-button.vue'
import Modal from './modal.vue'
import { useXlSXSheetStore } from '../stores/xlsx-sheet/index'
import xlsxFileToDocumentAttributes from '../utilities/xlsx-file-to-document-attributes'
import mapDocumentAttributesToAPIJSON from '../utilities/document-attributes-to-api-json'
import { type IIRCCDocumentAttributes } from '../utilities/xlsx-file-to-document-attributes/types'
import { type DocumentType } from '../types'

const props = defineProps<{
  documentType: DocumentType;
}>()

const xlsxSheetStore = useXlSXSheetStore()

const handleConfirm = () => {
  // POST to API to create Document Draft
}

const onFileChange = async (changeEvent: Event) => {
  const docType :DocumentType = props.documentType
  // Read File
  const workbook = await xlsxSheetStore.readFile(changeEvent)
  const sheet: XLSX.WorkSheet | Array<string> = workbook.Sheets.Sheet3 || []
  // Parse File to JSON matching the attributes of a given document
  const documentAttributesList :IIRCCDocumentAttributes = xlsxFileToDocumentAttributes(docType, sheet)
  console.log('documentAttributesList', documentAttributesList)

  // Match document attributes to the API Schema
  const apiJson = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)
  console.log('apiJson', apiJson)

  return apiJson
}
</script>
