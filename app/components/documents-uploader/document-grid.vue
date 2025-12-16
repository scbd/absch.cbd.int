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
          :document="getSubDocumentAttributes(value, key)"
          :title="parseHeader(key)"
          :is-open="getIsNestedDocumentOpen(attributeIndex)"
          role="button"
          @click="() => toggleAccordian(attributeIndex)"
        />
        <div
          v-else
          class="h-100 overflow-hidden"
          data-toggle="tooltip"
          data-placement="top"
          :title="parseValue(value, key) as string"
          :class="{ 'alert-danger': hasColumnErrors(key, errors) }"
        >
          <div
            class="fw-bold text-dark small bg-grey2 px-2 border-bottom overflow-hidden"
          >
            {{ parseHeader(key) }}
          </div>

          <div
            class="px-2 text-truncate"
          >
            {{ parseValue(value, key) }}
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
import { ref, computed, type Ref } from 'vue'
// @ts-expect-error import js file
import { useI18n } from 'vue-i18n'
import SuportingDocument from './supporting-document.vue'
import ModalErrors from './modal-errors.vue'
import Schema from './utilities/document-attributes-to-schema-json/schemas/schema'
import { documentsList } from './data/document-types-list'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  GridValue, DocError, AttrTypes,
  DocumentAttributes, DocumentAttrsList
} from '~/types/components/documents-uploader/document-schema'

const { t } = useI18n()

// Props
const props = defineProps<{
  title: string
  documentType: DocumentTypes
  index: number
  documentAttributes: DocumentAttributes<AttrTypes>
  errors: DocError[]
}>()

const openedNestedDocuments: Ref<number[]> = ref([])

const { [props.documentType]: { attributesMap } } = documentsList

// Filter empty document attributes
const documentData = computed(() => Object
  .entries(props.documentAttributes)
  .filter(([key, value]) => doesValueExist(value) || hasColumnErrors(key, props.errors)))

// Functions
function getIsNestedDocumentOpen (index: number): boolean {
  return openedNestedDocuments.value.includes(index)
}

function doesValueExist (val: GridValue): boolean {
  return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
}

function hasColumnErrors (key: string, errors: DocError[]): boolean {
  return errors.some(error => error.column === key)
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

function getIsNestedDocument (value: GridValue): boolean {
  return Boolean(value) && typeof value === 'object' && !(value instanceof Date)
}

function parseValue (val: GridValue, key: string): GridValue {
  if (val instanceof Date) {
    return Schema.parseDate(val)
  }

  if (Boolean(val) && typeof val === 'object' && !(val instanceof Date)) {
    return Object.entries(val)
      .map(([subkey, subvalue]) => {
        const header = parseHeader(subkey, attributesMap[key]?.schema)
        const value = parseValue(subvalue, key)
        return [header, value]
      })
  }

  return val
}

function getSubDocumentAttributes (value: GridValue, key: string): DocumentAttrsList {
  if (typeof value !== 'object') { return [] }
  const subattributesMap = attributesMap[key]?.schema ?? {}
  return Object.entries(value)
    .filter(([_subkey, value]) => !Schema.isEmpty(value))
    .map(([subkey, value]) => [subattributesMap[subkey]?.translationKey ?? '', value])
}

function parseHeader (key: string, attributesList = attributesMap): string {
  if (typeof key !== 'string') { return '' }
  if (typeof attributesList !== 'object') { return '' }

  const translationKey = attributesList[key]?.translationKey ?? 'contactInformation'

  return t(translationKey)
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
