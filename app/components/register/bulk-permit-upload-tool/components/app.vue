<template>
  <Modal :is-shown="true">
    <template #header>
      <BulkUploaderHeader />
    </template>
    <UploadButton
      :is-loading="false"
          @on-file-change="() => []"
    />
    <template #footer>
      <ModalFooter
        v-if="true"
        :is-loading="false"
        @handle-confirm="() => {} "
        @handle-clear="() => {} "
      />
      <div v-else />
    </template>
  </Modal>
</template>
<script setup lang="ts">
import * as XLSX from 'xlsx'
import ModalFooter from './bulk-uploader-footer.vue'
import BulkUploaderHeader from './bulk-uploader-header.vue'
import UploadButton from './upload-button.vue'
import Modal from '../../../common/modal.vue'
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
// 
// const onFileChange = async (changeEvent: Event) => {
//   const docType :DocumentTypes = props.documentType
//   // Read File
//   const workbook = await xlsxSheetStore.readFile(changeEvent)
//   const sheet: XLSX.WorkSheet | Array<string> = workbook.Sheets['Sheet3'] || []
//   // Parse File to JSON matching the attributes of a given document
//   const documentAttributesList :DocumentAttributesMap = xlsxFileToDocumentAttributes(docType, sheet)
//   console.log('documentAttributesList', documentAttributesList)
// 
//   // Match document attributes to the API Schema
//   const apiJson = await mapDocumentAttributesToAPIJSON(documentAttributesList, docType)
//   console.log('apiJson', apiJson)
// 
//   return apiJson
// }
</script>
