<template>
  <div>
    <h6 class="p-1 d-flex ps-2 m-0 bg-gray-700 color-white border-bottom border-2">
      {{ title }}
      <div class="ms-2">
        <i
          v-if="errors.filter(e => e.level === 'error').length > 0"
          class="bi bi-exclamation-octagon-fill text-danger"
        />
        <i
          v-else-if="errors.length > 0"
          class="bi bi-exclamation-triangle-fill text-warning"
        />
        <i
          v-else
          class="bi bi-check-circle-fill color-check-green"
        />
      </div>
    </h6>

    <div
      class="d-flex p-2 gap-1 justify-content-center border border-bottom border-left border-right flex-wrap mw-100 "
    >
      <div
        v-for="([key, value], attributeIndex) in documentData"
        :key="key"
        class="preview-box border border-2 bg-white text-center flex-fill"
      >
        <SuportingDocument
          v-if="getIsNestedDocument(value)"
          :document="value as DocumentAttrsList"
          :title="key"
          :is-open="getIsNestedDocumentOpen(attributeIndex)"
          role="button"
          @click="() => toggleAccordian(attributeIndex)"
        />
        <div
          v-else
          class="h-100 overflow-hidden"
          data-toggle="tooltip"
          data-placement="top"
          :title="value as string"
          :class="{ 'alert-danger': hasColumnErrors(key, errors) }"
        >
          <div
            class="fw-bold text-dark small bg-grey2 px-2 border-bottom overflow-hidden"
          >
            {{ key }}
          </div>

          <div
            class="px-2 text-truncate"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <ModalErrors
        v-if="errors.length > 0"
        :errors="errors"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import SuportingDocument from './supporting-document.vue'
import ModalErrors from './modal-errors.vue'
import { ImportDocuments } from './utilities/import-documents'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  GridValue, DocError,
  DocumentAttrsList
} from '~/types/components/documents-uploader/document-schema'

// Props
defineProps<{
  title: string
  documentType: DocumentTypes
  index: number
  documentData: Array<[string, GridValue]>
  errors: DocError[]
}>()

const openedNestedDocuments: Ref<number[]> = ref([])

// Functions
function getIsNestedDocumentOpen (index: number): boolean {
  return openedNestedDocuments.value.includes(index)
}

function toggleAccordian (index: number): number {
  const isClosed = !getIsNestedDocumentOpen(index)
  if (isClosed) {
    openedNestedDocuments.value.push(index)
    return index
  }
  openedNestedDocuments.value = openedNestedDocuments.value.filter(value => value !== index)
  return index
}

function hasColumnErrors (key: string, errors: DocError[]): boolean {
  return ImportDocuments.hasColumnErrors(key, errors)
}

function getIsNestedDocument (value: GridValue): value is Array<[string, GridValue]> {
  return Boolean(value) && typeof value === 'object' && !(value instanceof Date)
}
</script>
<style scoped>
  .preview-box {
    max-height: 5em;
    width: 12.5%;
  }

  @media screen and (max-width: 1200px) {
    .preview-box {
      width: 16.67%;
    }
  }

  @media screen and (max-width: 992px) {
    .preview-box {
      width: 25%;
    }
  }

  @media screen and (max-width: 850px) {
    .preview-box {
      width: 40%;
    }
  }

  .preview-box > div > div:first-child {
    max-height: 3em;
  }

  .bg-grey2 {
    background-color: #eaeaea;
  }
  .color-check-green {
    color: #45d045 !important;
  }
</style>
