<template>
  <Modal
    ref="modalRef"
    :modal-size="modalSize"
    header-class="bg-grey"
    footer-class="bg-grey"
    @on-close="onClose"
  >
    <template #header>
      <BulkUploaderHeader
        @close-modal="onClose"
      >
        <template #header>
          <slot name="header" />
        </template>
      </BulkUploaderHeader>
    </template>

    <UploadButton
      v-if="!hasParsedFiles && !hasErrors"
      :is-loading="isLoading"
      @on-file-change="onFileChange"
    />

    <DocumentsPreview
      v-if="hasParsedFiles"
      :sheet="sheet.data"
      :errors="documentErrors"
      :document-type="documentType"
    />

    <LoadingOverlay
      v-if="isLoading && hasParsedFiles"
      :caption="$t('creatingDocumentsLoader')"
    />

    <ModalErrors
      :errors="modalErrors"
    />

    <WarningOverlay
      v-if="isWarningIndicatorOpen"
      :sheet="sheet.data"
      :document-errors="documentErrors"
      @handle-confirm="createDocuments"
      @close="() => isWarningIndicatorOpen = false"
    />

    <template #footer>
      <BulkUploaderFooter
        v-if="hasParsedFiles"
        :has-errors="hasErrors"
        @handle-confirm="handleConfirm"
        @handle-clear="handleClearFile"
      />
      <div
        v-else
        class="m-4"
      />
    </template>
  </Modal>
</template>
<script setup lang="ts">
import {
  ref, computed, onMounted, shallowRef,
  type Ref, type ComputedRef
} from 'vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useRealm } from '../../services/composables/realm.js'
// @ts-expect-error importing js file
import KmDocumentApi from '~/api/km-document'
import ModalErrors from './modal-errors.vue'
import BulkUploaderHeader from './uploader-header.vue'
import BulkUploaderFooter from './uploader-footer.vue'
import DocumentsPreview from './documents-preview.vue'
import LoadingOverlay from '../common/loading-overlay.vue'
import UploadButton from './upload-button.vue'
import Modal from '../common/modal.vue'
import uploaderMessages from '~/app-text/components/bulk-documents-uploader.json'
import absMessages from '~/app-text/views/forms/edit/abs/edit-absPermit.json'
import recordListMessages from '~/app-text/views/register/record-list.json'
import contactMessages from '~/app-text/views/forms/edit/directives/edit-contact.json'
import { ImportDocuments } from './utilities/import-documents.js'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list.js'
import type { DocError, HTMLInputEvent, DocsResp } from '~/types/components/documents-uploader/document-schema.js'
import type { DocumentStore } from '~/types/common/documents.js'
import type { ReadFileResult } from './utilities/read-xlsx-file.js'
import WarningOverlay from './warning-overlay.vue'

const { realm } = useRealm()
const { mergeLocaleMessage, t } = useI18n()
const auth = useAuth()

const messages = [
  uploaderMessages,
  absMessages,
  contactMessages,
  recordListMessages
]

messages.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

const props = defineProps<{
  documentType: DocumentTypes
}>()

const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token(), realm })
const importDocuments = new ImportDocuments(t, props.documentType)

const $emit = defineEmits(['onClose', 'refreshRecord'])

// Refs
const documents: Ref<DocumentStore> = ref({ documents: [], subDocuments: [] })
const sheet: Ref<ReadFileResult> = ref({ data: [], errors: [] })
const isLoading = ref(false)
const errors: Ref<DocError[]> = ref([])
const modalSize = ref('xl')
const modalRef = shallowRef({ show: () => undefined, close: () => undefined })
const isWarningIndicatorOpen = ref(false)

// Computed Properties
const hasErrors = computed(() => errors.value
  .some((error) => error.level === 'error'))

const modalErrors = computed(() => errors.value
  .filter((error) => {
    const e = error
    if (e.row === undefined) { return true }
    return !Number.isInteger(e.row) || e.row < 0
  }))

const documentErrors: Ref<DocError[][]> = ref([])

const hasParsedFiles: ComputedRef<boolean> = computed(() => sheet.value.data.length > 0)

// Event Hooks
onMounted(async () => {
  modalRef.value.show()

  isLoading.value = true

  await importDocuments.getKeywordsMap()

  const { errors: docErrors } = importDocuments
  errors.value = docErrors

  isLoading.value = false
})

// Methods
function handleClearFile (): undefined {
  isLoading.value = false
  errors.value = []
  importDocuments.setErrors([])
  documents.value = { documents: [], subDocuments: [] }
  modalSize.value = 'xl'
  sheet.value = { data: [], errors: [] }
  isWarningIndicatorOpen.value = false
}

async function handleConfirm (): Promise<DocsResp> {
  const hasErrors = documentErrors.value.some((errors: DocError[]) => errors.length > 0)

  if (hasErrors && !isWarningIndicatorOpen.value) {
    isWarningIndicatorOpen.value = true
    return []
  }
  return await createDocuments()
}

async function createDocuments (): Promise<DocsResp> {
  isLoading.value = true

  // Create subdocuments. PIC, The Provider etc..
  await Promise.all(
    documents.value.subDocuments
      .map(async (doc) => await kmDocumentApi.createDocument(doc)))

  // Create documents
  const resp = await Promise.all(
    documents.value.documents
      .map(async (doc) => await kmDocumentApi.createDocumentDraft(doc)))

  isLoading.value = false
  $emit('refreshRecord')
  handleClearFile()
  onClose()
  modalRef.value.close()

  return resp
}

function onClose (): undefined {
  $emit('onClose')
}

async function onFileChange (changeEvent: HTMLInputEvent): Promise<DocumentStore> {
  handleClearFile()

  isLoading.value = true

  // Read File
  sheet.value = await importDocuments.readXLSXFile(changeEvent)

  // Map document attributes to the document schema
  const documentStore: DocumentStore = await importDocuments.mapDocumentAttributesToSchemaJson(sheet.value.data)

  isLoading.value = false

  // Store errors
  const { errors: docErrors } = importDocuments
  errors.value = docErrors
  documentErrors.value = importDocuments.parseDocumentErrors()

  // Store document json
  documents.value = documentStore
  modalSize.value = 'xxl'

  return documentStore
}
</script>
