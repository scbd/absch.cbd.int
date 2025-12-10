<!--
Warning Overlay

Fade out the screen and show a warning message in the foreground.
-->
<template>
  <Overlay
    :opacity="1"
    @click="() => $emit('close')"
  >
    <div class="d-flex justify-content-center p-5 w-50 h-75 bg-white">
      <div
        class="d-flex flex-column mb-3"
      >
        <h1 class="mt-2"> <i class="bi bi-exclamation-triangle-fill"></i> Warning </h1>
        <div class="mx-3 mt-4 mb-3 lead"> {{ $t('incorrectFields') }} </div>
        
        <div
          class="d-flex flex-column px-3 flex-grow-1 overflow-auto"
        >
          <div
            v-for="([index, errors]) in erroredDocuments"
            :key="index"
            class="w-100"
          >
            <h2 class="m-1 mb-2"> {{ (sheet[index] || {})['permitEquivalent'] }} </h2>
            <ModalErrors
              :errors="errors"
            />
          </div>
        </div>

        <div class="mx-3 my-4 lead"> {{ $t('confirmWithErrors') }} </div>
        <button
          class="mx-auto w-20 btn btn-primary"
          type="button"
          @click="() => $emit('handleConfirm')"
        >
          {{ $t("confirmCreateDraftRecords") }}
        </button>
      </div>
    </div>
  </Overlay>
</template>
<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { DocError, DocumentAttributes } from '~/types/components/documents-uploader/document-schema'
import Overlay from '../common/overlay.vue'
import ModalErrors from './modal-errors.vue'

type DocumentErrors = [number, DocError[]]

const props = defineProps<{
  sheet: DocumentAttributes[] 
  documentErrors: DocError[][]
}>()

const erroredDocuments :ComputedRef<DocumentErrors[]> = computed(() => props.sheet
  .reduce((arr: DocumentErrors[], _attributes: DocumentAttributes, index: number) => {
    const errors = props.documentErrors[index] || []
    if (errors.length > 0) { arr.push([index, errors]) }
    return arr
  }, [])
)

const $emit = defineEmits(['handleConfirm', 'close'])
</script>
