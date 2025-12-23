<!--
Warning Overlay

Fade out the screen and show a warning message in the foreground.
-->
<template>
  <Overlay
    :opacity="1"
    @click="() => $emit('close')"
  >
    <div class="overlay-box d-flex p-5 w-50 bg-white">
      <div class="d-flex flex-column">
        <div
          v-if="hasErrors"
          class="d-flex flex-fill flex-column"
        >
          <h1>
            <i class="bi bi-exclamation-triangle-fill " />
            {{ $t('warning') }}
          </h1>
          <div
            class="mx-3 mt-2 mb-3 lead"
          >
            {{ $t('incorrectFields') }}
          </div>
          <div
            class="d-flex flex-column px-3 py-2 overflow-auto bg-gray-100 border rounded"
          >
            <div
              v-for="([index, errors]) in erroredDocuments"
              :key="index"
              class="w-100"
            >
              <h2 class="m-1 mb-2">
                {{ getTitle(index) }}
              </h2>
              <ModalErrors
                :errors="errors"
              />
            </div>
          </div>

          <div class="mx-3 mt-3 lead">
            {{ $t('confirmWithErrors') }}
          </div>
        </div>

        <div
          v-else
          class="d-flex flex-fill flex-column"
        >
          <h1 class="mb-3">
            {{ $t("createDraftConfirmation") }}
          </h1>

          <div class="d-flex flex-column px-3 py-2 overflow-auto bg-gray-100 border rounded">
            <div
              v-for="(_doc, index) in sheet"
              :key="index"
              class="w-100"
            >
              <h2 class="m-1 mb-2">
                {{ getTitle(index) }}
              </h2>
            </div>
          </div>
        </div>

        <div class="mt-4 w-100 d-flex gap-2 justify-content-center">
          <button
            class="btn btn-secondary"
            type="button"
            @click="() => $emit('close')"
          >
            {{ $t("cancel") }}
          </button>
          <button
            class="btn btn-primary"
            type="button"
            @click="() => $emit('handleConfirm')"
          >
            {{ $t("confirmCreate") }}
          </button>
        </div>
      </div>
    </div>
  </Overlay>
</template>
<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { AttrsList, DocError, DocumentAttributes, AttrTypes } from '~/types/components/documents-uploader/document-schema'
import Overlay from '../common/overlay.vue'
import ModalErrors from './modal-errors.vue'
import { ImportDocuments } from './utilities/import-documents'

type DocumentErrors = [number, DocError[]]

const props = defineProps<{
  sheet: AttrsList
  documentErrors: DocError[][]
}>()

const erroredDocuments: ComputedRef<DocumentErrors[]> = computed(() => props.sheet
  .reduce((arr: DocumentErrors[], _attributes: DocumentAttributes<AttrTypes>, index: number) => {
    const { documentErrors: { [index]: errors } } = props
    if (errors === undefined) { return arr }
    if (errors.length > 0) { arr.push([index, errors]) }
    return arr
  }, [])
)

const hasErrors = computed(() => erroredDocuments.value.length > 0)

const $emit = defineEmits(['handleConfirm', 'close'])

function getTitle (index: number): string {
  return ImportDocuments.getTitle(index, props.sheet)
}
</script>
<style scoped>
.overlay-box {
  max-height: 77%;
}
.overlay-box > div {
  max-height: 100%;
}

.overlay-box > div > div:first-child {
  min-height: 0;
}
</style>
