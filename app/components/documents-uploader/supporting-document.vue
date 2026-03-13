<template>
  <div
    class="position-relative"
  >
    <div
      class="d-flex justify-content-center fw-bold small bg-grey2 px-2 border-bottom overflow-hidden"
      data-toggle="tooltip"
      data-placement="top"
      :title="title"
    >
      <div class="me-2 text-dark text-truncate">
        {{ title }}
      </div>
      <div
        class="document-accordian-icon"
        :class="{ 'document-accordian-icon--open': isOpen }"
      >
        <i class="fa fa-chevron-down" />
      </div>
    </div>
    <div
      class="accordian-box"
      :class="{ 'accordian-box--open': isOpen }"
    >
      <div
        class="mw-100 position-relative px-2 py-1 overflow-hidden"
        :class="[hasDocumentError ? 'alert-danger' : 'bg-white']"
      >
        <div
          v-for="entry in document"
          :key="entry.key"
          class="mb-1"
        >
          <div class="fw-bold text-dark small">
            {{ entry.header }}:
          </div>
          <div>
            <span
              v-if="checkColumnErrors(entry.key)"
              class="fw-bold me-1"
            >
              <i
                class="bi bi-x-circle-fill text-danger"
              />
              Warning:
            </span>
            {{ entry.value || '⠀' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { DocError, GridData } from '~/types/components/documents-uploader/document-schema'

const props = defineProps<{
  document: GridData[]
  title: string
  isOpen: boolean
  errors: DocError[]
  hasColumnErrors: (key: string)=> boolean
}>()

const hasDocumentError = ref(false)

function checkColumnErrors (key: string): boolean {
  const hasColumnError = props.hasColumnErrors(key)
  if (hasColumnError) {
    hasDocumentError.value = true
  }
  return hasColumnError
}

</script>
<style scoped>
.document-accordian-icon {
  transition: transform 0.2s ease-in-out;
  transform: rotate(-90deg);
}

.document-accordian-icon.document-accordian-icon--open {
  transform: rotate(0);
}

.accordian-box > div {
  transition: max-height, z-index;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  z-index: 1;
  max-height: calc(3em - 4px);
  position: absolute;
  top: 0;
  left: 0;
}

.accordian-box {
  position: relative;
}

.accordian-box--open > div {
  max-height: 100vh;
  border: 2px solid #dee2e6;
  border-bottom: 3px solid #dee2e6;
  z-index: 2;
}
.bg-grey2 {
  background-color: #eaeaea;
}
 </style>
