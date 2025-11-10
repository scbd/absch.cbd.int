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
import { type DocumentAttributesMap } from '../utilities/xlsx-file-to-document-attributes/types'
import { type DocumentTypes } from '../data/document-types-list'

const props = defineProps<{
  documentType: DocumentTypes;
}>()

const xlsxSheetStore = useXlSXSheetStore()

const handleConfirm = () => {
  // POST to API to create Document Draft
}

const onFileChange = async (changeEvent: Event) => {
  const docType :DocumentTypes = props.documentType
  // Read File
  const workbook = await xlsxSheetStore.readFile(changeEvent)
  const sheet: XLSX.WorkSheet | Array<string> = workbook.Sheets.Sheet3 || []
  // Parse File to JSON matching the attributes of a given document
  const documentAttributesList :DocumentAttributesMap = xlsxFileToDocumentAttributes(docType, sheet)
  // Match document attributes to the API Schema
  const apiJson = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)

  return apiJson
}
</script>
