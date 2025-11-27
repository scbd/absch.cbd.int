<template>
  <div
    class="preview-list ps-3 pe-3 overflow-auto"
  >
    <div
      v-for="(document, documentIndex) in documents"
      :key="document.permitEquivalent"
      class="h-50 bg-gray-100"
    >
      <h6 class="p-1 m-0 bg-greendark color-white border-bottom border-2 border-warning">
        {{ document[3][1] }}
      </h6>
      <div
        class="d-flex p-2 justify-content-center border border-bottom border-left border-right gap-2 flex-wrap mw-100 "
      >
        <div
          v-for="[index, value] in document"
          :key="index"
          class="preview-box border bg-white text-center flex-fill"
        >
          <div
            v-if="Boolean(value) && value instanceof Array"
            role="button"
            class="position-relative"
            @click="() => toggleSubDocument(index, documentIndex)"
          >
            <div
              class="d-flex justify-content-center fw-bold bg-grey2 px-2 border-bottom overflow-hidden"
            >
              <div class="me-2 text-truncate">
                {{ getHeader(index) }}
              </div>
              <div
                class="document-accordian-icon"
                :class="{ 'document-accordian-icon--open': getIsDocumentOpen(index, documentIndex) }"
              >
                <i class="fa fa-chevron-down" />
              </div>
            </div>

            <div
              class="accordian-box"
              :class="{ 'accordian-box--open': getIsDocumentOpen(index, documentIndex) }"
            >
              <div class="mw-100 bg-white border px-2 py-1 overflow-hidden">
                <div
                  v-for="[subIndex, subValue] in value"
                  :key="subValue"
                  class="mb-1"
                >
                  <div class="fw-bold">
                    {{ getHeader(subIndex) }}:
                  </div>
                  <div>
                    {{ subValue }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="fw-bold bg-grey2 px-2 border-bottom overflow-hidden"
            >
              {{ getHeader(index) }}
            </div>

            <div
              class="px-2 text-truncate"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import Schema from './utilities/document-attributes-to-schema-json/schemas/schema'

const props = defineProps({
  sheet: {
    type: Object,
    default: () => ({ headers: [], data: [], errors: [] })
  }
}, row)

const openedSubDocuments = ref({})

const documents = computed(() => {
  const getIsDate = (val) => val instanceof Date
  const getParsedValue = (val) => getIsDate(val) ? Schema.parseDate(val) : val

  const map = (row) => {
    let index = 0

    const mapRow = (currentRow) => {
      const mappedRow = []
      Object.values(currentRow)
        .forEach((value) => {
          if (!value || (value || '').length < 1) {
            index += 1
            return
          }

          if (!getIsDate(value) && value instanceof Object) {
            mappedRow.push([index, mapRow(value)])
            return
          }

          mappedRow.push([index, getParsedValue(value)])
          index += 1
        })
      return mappedRow
    }

    return mapRow(row)
  }

  return props.sheet.data.map(map)
})

function getHeader (index) {
  return props.sheet.headers[index].replace('*', '').trim()
}

function getIsDocumentOpen (index, row) {
  return (openedSubDocuments.value[row] || []).indexOf(index) > -1
}

function toggleSubDocument (index, row) {
  const arr = openedSubDocuments.value[row] || []
  openedSubDocuments.value = { row: [] }

  const i = arr.indexOf(index)
  if (i < 0) {
    openedSubDocuments.value[row] = [index]
  }
}

</script>
<style scoped>
  .preview-list  {
    max-height: 70vh;
  }
  @media screen and (max-height: 800px) {
    .preview-list  {
      max-height: 50vh;
    }
  }
  .bg-greendark {
    background-color: var(--bs-green);
  }
  .preview-list > div:not(:first-child) {
    margin-top: 1.5rem;
  }
  .preview-box {
    max-height: 5em;
    width: 12.5%;
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
    max-height: 50vh;
  }
</style>
