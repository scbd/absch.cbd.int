<template>
  <div
    class="preview-list pt-3 px-lg-5 px-md-2 overflow-auto"
  >
    <div
      v-for="(document, index) in sheet"
      :key="index"
      class="h-50 bg-gray-100"
    >
      <DocumentGrid
        :title="getTitle(index)"
        :errors="errors[index] || []"
        :document-type="documentType"
        :index="index"
        :document-data="document"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import DocumentGrid from './document-grid.vue'
import type { DocError, SheetData } from '~/types/components/documents-uploader/document-schema'
import { ImportDocuments } from './utilities/import-documents'

const props = defineProps<{
  sheet: SheetData
  documentType: DocumentTypes
  errors: DocError[][]
}>()

function getTitle (index: number): string {
  return ImportDocuments.getTitle(props.sheet[index] ?? [])
}
</script>
<style scoped>
  .preview-list  {
    max-height: 60vh;
  }

  @media screen and (max-height: 800px) {
    .preview-list  {
      max-height: 50vh;
    }
  }

  .preview-list > div:not(:first-child) {
    margin-top: 1.5rem;
  }
</style>
