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
          class="preview-box border border-2 bg-white text-center flex-fill overflow-hidden"
        >
          <div
            class="h-100"
            :class="{ 'alert-danger': hasColumnErrors(key, index) }"
          >
            <div
              class="fw-bold text-dark small bg-grey2 px-2 border-bottom overflow-hidden"
            >
              {{ $t(parseHeader(key)) }}
            </div>

            <div
              class="px-2 text-truncate"
            >
              {{ parseValue(value) }}
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
import { computed } from 'vue'
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
const { attributesMap } = (documentsList[props.documentType] || { attributesMap: {} })

// Filter any empty cells unless the cell has errors
const documents = computed(() => props.sheet.data
  .map((row, rowIndex) =>
    Object.entries(row)
      .filter(([key, value]) => doesValueExist(value) || hasColumnErrors(key, rowIndex))
  )
)

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

function parseValue (val) {
  const getIsDate = (val) => val instanceof Date
  return getIsDate(val) ? Schema.parseDate(val) : val
}

function parseHeader (key) {
  if (typeof key !== 'string') { return '' }

  const { translationKey } = attributesMap[key] || {}

  return translationKey || 'contactInformation'
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

  .document-accordian-icon {
    transition: transform 0.2s ease-in-out;
    transform: rotate(-90deg);
  }

  .document-accordian-icon.document-accordian-icon--open {
    transform: rotate(0);
  }
  .accordian-box > div {
    transition: max-height 0.2s ease-in-out;
    z-index: 1;
    max-height: 3em;
  }

  .accordian-box--open {
    position: relative;
  }

  .accordian-box--open > div {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 100vh;
  }
</style>
