<template>
  <div
    class="preview-list ps-3 pe-3 overflow-auto"
  >
    <div
      v-for="document in documents"
      :key="document.permitEquivalent"
      class="h-50 bg-gray-100"
    >
      <h6 class="p-1 m-0 bg-gray-600 color-white border-bottom border-2">
        {{ document[3][1] }}
      </h6>
      <div
        class="d-flex p-2 gap-1 justify-content-center border border-bottom border-left border-right flex-wrap mw-100 "
      >
        <div
          v-for="([header, value], index) in document"
          :key="index"
          class="preview-box border border-2 bg-white text-center flex-fill"
        >
          <div>
            <div
              class="fw-bold small bg-grey2 px-2 border-bottom overflow-hidden"
            >
              {{ parseHeader(header) }}
            </div>

            <div
              class="px-2 text-truncate"
            >
              {{ parseValue(value) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import Schema from './utilities/document-attributes-to-schema-json/schemas/schema'

const props = defineProps({
  sheet: {
    type: Object,
    default: () => ({ headers: [], data: [], errors: [] })
  }
})

// Filter any empty cells
const documents = computed(() => props.sheet.headers
  .map((row) => row
    .filter((column) => typeof column[1] === 'string'
      ? column[1].trim().length > 0
      : Boolean(column[1])
    )
  )
)

function parseValue (val) {
  const getIsDate = (val) => val instanceof Date
  return getIsDate(val) ? Schema.parseDate(val) : val
}

function parseHeader (header) {
  if (typeof header !== 'string') { return '' }
  return header.replace('*', '').trim()
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
