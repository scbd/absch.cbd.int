<template>
  <div
    class="preview-list pt-3 px-lg-5 px-md-2 overflow-auto"
  >
    <div
      v-for="(document, index) in documents"
      :key="document.permitEquivalent"
      class="h-50 bg-gray-100"
    >
      <h6 class="p-1 m-0 bg-gray-600 color-white border-bottom border-2">
        {{ sheet.data[index].permitEquivalent }}
      </h6>
      <div
        class="d-flex p-2 gap-1 justify-content-center border border-bottom border-left border-right flex-wrap mw-100 "
      >
        <div
          v-for="([key, value]) in document"
          :key="key"
          class="preview-box border border-2 bg-white text-center flex-fill"
        >
          <SuportingDocument
            v-if="getIsNestedDocument(value)"
            :document="parseValue(value, key)"
            :title="parseHeader(key, document)"
            :is-open="getIsDocumentOpen(key, index)"
            role="button"
            @click="() => toggleAccordian(key, index)"
          />
          <div
            v-else
            class="h-100 overflow-hidden"
            :class="{ 'alert-danger': hasColumnErrors(key, index) }"
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
          v-if="getDocumentErrors(index).length > 0"
          :errors="getDocumentErrors(index)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import ModalErrors from './modal-errors.vue'
import SuportingDocument from './supporting-document.vue'
import { computed, ref } from 'vue'
import Schema from './utilities/document-attributes-to-schema-json/schemas/schema'
import { documentsList } from './data/document-types-list'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  sheet: {
    type: Object,
    default: () => ({ data: [] })
  },
  documentType: {
    type: String,
    default: 'ircc'
  },
  errors: {
    type: Array,
    default: () => []
  }
})

const openedSupportingDocuments = ref({})
const { attributesMap } = (documentsList[props.documentType] || { attributesMap: {} })

// Filter any empty cells unless the cell has errors
const documents = computed(() => props.sheet.data
  .map((row, rowIndex) =>
    Object.entries(row)
      .filter(([key, value]) => doesValueExist(value) || hasColumnErrors(key, rowIndex))
  )
)

function getIsNestedDocument (value) {
  return Boolean(value) && typeof value === 'object' && !(value instanceof Date)
}

function doesValueExist (val) {
  return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
}

function getDocumentErrors (row) {
  const getReaseon = (error, key) => {
    const translationKey = attributesMap[key].translationKey
    return `${t(error.reason)} → ${t(translationKey)}.`
  }

  return Object.keys(props.sheet.data[row])
    .reduce((errors, key) => {
      const columnErrors = getColumnErrors(key, row)
        .map((error) => {
          return Object.assign(
            { level: 'warning' },
            error,
            { reason: getReaseon(error, key) }
          )
        })

      if (columnErrors.length < 1) { return errors }

      return columnErrors
    }, [])
}

function getColumnErrors (key, row) {
  return props.errors
    .filter((error) => {
      const columnComparitor = Number.isInteger(error.column)
        ? parseInt((attributesMap[key] || {}).column, 10)
        : key
      const columnMatch = error.column === columnComparitor

      return error.row === (row + 1) && columnMatch
    })
}

function hasColumnErrors (key, row) {
  return getColumnErrors(key, row).length > 0
}

function parseValue (val, key) {
  const getIsDate = (val) => val instanceof Date
  if (getIsDate(val)) {
    return Schema.parseDate(val)
  }

  if (getIsNestedDocument(val)) {
    return Object.entries(val)
      .map(([subkey, subvalue]) => [parseHeader(subkey, attributesMap[key].schema), parseValue(subvalue)])
  }

  return val
}

function parseHeader (key, attributesList = attributesMap) {
  if (typeof key !== 'string') { return '' }
  if (typeof attributesList !== 'object' || !attributesList) { return '' }

  const { translationKey } = attributesList[key] || { translationKey: 'contactInformation' }

  // console.log('translationKey', translationKey, attributesList, key)

  return t(translationKey)
}

function toggleAccordian (index, row) {
  const arr = openedSupportingDocuments.value[row] || []
  openedSupportingDocuments.value = { row: [] }
  const i = arr.indexOf(index)
  if (i < 0) {
    openedSupportingDocuments.value[row] = [index]
  }
}

function getIsDocumentOpen (index, row) {
  return (openedSupportingDocuments.value[row] || []).indexOf(index) > -1
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
