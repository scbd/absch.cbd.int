<template>
  <div
    class="preview-list ps-3 pe-3 overflow-auto"
  >
    <div
      v-for="document in documents"
      :key="document.permitEquivalent"
      class="h-50 bg-gray-100 border"
    >
      <h6 class="p-1 m-0 page-content border-bottom">
        {{ document.permitEquivalent }}
      </h6>
      <div
        class="d-flex p-2 justify-content-center gap-1 flex-wrap mw-100"
      >
        <div
          v-for="([key, value], index) in Object.entries(document)"
          :key="index"
          class="border text-center flex-fill preview-box shadow-sm"
        >
          <div
            class="fw-bold bg-grey2 px-2 border-bottom preview-list--cell"
          >
            {{ key }}
          </div>

          <div
            class="preview-list--cell px-2 text-truncate bg-white"
          >
            {{ value }}
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
    type: Array,
    default: () => []
  }
})
const documents = computed(() => {
  console.log('props.sheet', props.sheet)

  const temp = props.sheet.map((row) => {
    return Object.entries(row)
      .reduce((acc, [key, value]) => {
        if (!value || (value || '').length < 1) { return acc }
        acc[key] = (value instanceof Date) ? Schema.parseDate(value) : value
        return acc
      }, {})
  })
  console.log(temp)
  return temp
})

</script>
<style scoped>
  .preview-list  {
    max-height: 450px
  }
  .preview-list > div:not(:first-child) {
    margin-top: 1.3rem;
  }
  .preview-box {
    max-width: 20em;
  }
  .bg-grey2 {
    background-color: #eaeaea;
  }
</style>
