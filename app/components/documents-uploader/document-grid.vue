<template>
  <div>
    <h6 class="p-1 ps-2 m-0 bg-gray-700 color-white border-bottom border-2">
      {{ title }}
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
          :document="parseValue(value, key) as DocumentData"
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
          :class="{ 'alert-danger': hasColumnErrors(key, documentErrors) }"
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
        v-if="documentErrors.length > 0"
        :errors="documentErrors"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, watch } from 'vue'
// @ts-ignore
import { useI18n } from 'vue-i18n'
import SuportingDocument from './supporting-document.vue'
import ModalErrors from './modal-errors.vue'
import { DocValue, DocError, DocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import Schema from './utilities/document-attributes-to-schema-json/schemas/schema'
import { documentsList } from './data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'

type DocumentData = [string, DocValue][]

const { t } = useI18n()

// Props
const props = defineProps<{
  title: string
  documentType: DocumentTypes
  index: number
  documentAttributes: DocumentAttributes
  errors: DocError[]
}>()

const openedNestedDocuments :Ref<number[]> = ref([])

const attributesMap  = documentsList[props.documentType]?.attributesMap

// Computed Properties
const documentData :ComputedRef<DocumentData> = computed(() => Object
  .entries(props.documentAttributes)
  .filter(([key, value]) => doesValueExist(value) || hasColumnErrors(key, props.errors)))

// Reactive Errors
const documentErrors :ComputedRef<DocError[]> = computed(() => {
  const getReason = (error: DocError, key: string) => {
    const translationKey = attributesMap[key]?.translationKey
    return `${t(error.reason)} → ${t(translationKey)}.`
  }

  return Object.keys(props.documentAttributes)
    .reduce((errors: DocError[], key: string) => {
      const columnErrors = getColumnErrors(key, props.errors)
        .map((error) => {
          return Object.assign(
            { level: 'warning' },
            error,
            { reason: getReason(error, key) }
          ) as DocError
        })

      if (columnErrors.length < 1) { return errors }

      return [...columnErrors, ...errors]
    }, [])
})


function getIsNestedDocumentOpen (index: number) {
  return openedNestedDocuments.value.indexOf(index) > -1
}
  
function doesValueExist (val: DocValue) {
  return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
}

function toggleAccordian (index: number) {
  const isClosed :boolean = openedNestedDocuments.value.indexOf(index) < 0 
  if (isClosed) {
    openedNestedDocuments.value.push(index) 
    return index
  }
  openedNestedDocuments.value = openedNestedDocuments.value.filter(value => value !== index)
  return index 
}

function getIsNestedDocument (value: DocValue) {
  return Boolean(value) && typeof value === 'object' && !(value instanceof Date)
}

function getColumnErrors (key: string, errors: DocError[]) {
  return (errors || [])
    .filter((error) => {
      const columnComparitor = Number.isInteger(error.column)
        ? parseInt(attributesMap[key]?.column as string, 10)
        : key
      const columnMatch = error.column === columnComparitor

      return error.row === props.index && columnMatch
    })
}

function hasColumnErrors (key: string, errors: DocError[]) {
  return getColumnErrors(key, errors).length > 0
}

function parseValue (val: DocValue, key: string) {
  const getIsDate = (val: DocValue) => val instanceof Date
  if (getIsDate(val)) {
    return Schema.parseDate(val)
  }

  if (getIsNestedDocument(val)) {
    return Object.entries(val)
      .map(([subkey, subvalue]) => {
        const header = parseHeader(subkey, (attributesMap[key] || {}).schema)
        const value = parseValue(subvalue, key) as DocValue
        return [header, value]
      })
  }

  return val as string
}

function parseHeader (key: string, attributesList = attributesMap) {
  if (typeof key !== 'string') { return '' }
  if (typeof attributesList !== 'object' || !attributesList) { return '' }

  const translationKey = attributesList[key]?.translationKey || 'contactInformation'

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
</style>
