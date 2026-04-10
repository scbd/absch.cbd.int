<template>
  <tr>
    <td
      v-for="(entry) in documentData"
      :key="entry.key"
      class="p-2"
      :class="{ 'alert-danger': hasColumnErrors(entry.key, errors) }"
      data-toggle="tooltip"
      data-placement="top"
      :title="entry.value as string"
    >
      <div
        class="text-container text-truncate"
      >
        {{ entry.value }}
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ImportDocuments } from './utilities/import-documents'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { documentsList } from './data/document-types-list'
import type {
  DocError, GridData, DocumentAttributesMap
} from '~/types/components/documents-uploader/document-schema'

// Props
const props = defineProps<{
  title: string
  documentType: DocumentTypes
  index: number
  documentData: GridData[]
  errors: DocError[]
}>()

const { [props.documentType]: { attributesMap } } = documentsList

// Functions
function hasColumnErrors (key: string, errors: DocError[], subDocumentKey?: string): boolean {
  if (typeof subDocumentKey === 'string') {
    const map: DocumentAttributesMap | undefined = attributesMap[subDocumentKey]?.schema
    if (map !== undefined) {
      return ImportDocuments.hasColumnErrors(key, errors, map)
    }
  }
  return ImportDocuments.hasColumnErrors(key, errors, attributesMap)
}
</script>
<style scoped>
  td > div{
    max-width: 100ch;
  }
  td.alert-danger {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }
</style>
