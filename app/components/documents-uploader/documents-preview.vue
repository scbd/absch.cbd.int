<template>
  <div
    class="preview-list pt-2 px-lg-5 px-md-2 overflow-auto"
  >
    <h2
      class="fw-bold p-1 ps-0 m-0 mb-3 border-bottom border-top"
    >
      {{ $t('documents', { documentType: documentType.toUpperCase(), count: sheet.length }) }}
    </h2>
    <div class="documents-container">
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

  .documents-container > div:not(:first-child) {
    margin-top: 1.5rem;
  }
  .preview-list > h2 {
    color: var(--bs-body-color);
  }
</style>
