<template>
  <div
    class="preview-list pt-2 px-md-2 overflow-auto"
  >
    <h2
      class="fw-bold text-dark p-1 m-0 mb-3 border-bottom border-top"
    >
      {{ $t('documents', { documentType: documentType.toUpperCase(), count: flatSheet.length }) }}
    </h2>
    <div class="documents-container mb-3 overflow-auto">
      <table
        class="table table-hover table-responsive-sm"
      >
        <thead>
          <th
            v-for="(entry) in flatSheet[0]"
            :key="entry.header"
            class="px-2 py-1 text-nowrap"
            scope="col"
          >
            {{ entry.header }}
          </th>
        </thead>
        <tbody>
          <DocumentGrid
            v-for="(documentData, index) in flatSheet"
            :key="index"
            :title="getTitle(index)"
            :errors="errors[index] || []"
            :document-type="documentType"
            :index="index"
            :document-data="documentData"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import DocumentGrid from './document-grid.vue'
import type { DocError, GridData, SheetData, GridValue } from '~/types/components/documents-uploader/document-schema'
import { ImportDocuments } from './utilities/import-documents'

const props = defineProps<{
  sheet: SheetData
  documentType: DocumentTypes
  errors: DocError[][]
}>()

const flatSheet = computed(() => props.sheet.map((documentData: GridData[]) => documentData.reduce((acc: GridData[], entry: GridData): GridData[] => {
  const isGridData = (value: GridValue | GridData[] | GridData): value is GridData[] => Array.isArray(value)
  if (isGridData(entry.value)) {
    return [...acc, ...entry.value]
  }
  acc.push(entry)
  return acc
}, [])))

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

  .documents-container {
    min-height: 25vh;
  }

  .documents-container > div:not(:first-child) {
    margin-top: 1.5rem;
  }
  .preview-list > h2 {
    color: var(--bs-body-color);
  }
</style>
