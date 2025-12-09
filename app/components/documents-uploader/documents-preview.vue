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
        :title="(sheet[index] || {})['permitEquivalent'] as string"
        :errors="errors"
        :document-type="documentType"
        :index="index"
        :document-attributes="document"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import DocumentGrid from './document-grid.vue'
import { DocumentAttributes, DocError } from '~/types/components/documents-uploader/document-schema'

defineProps<{
  sheet: DocumentAttributes[]
  documentType: DocumentTypes
  errors: DocError[]
}>()
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
