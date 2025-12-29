<template>
  <Modal
    ref="modalRef"
    :modal-size="modalSize"
    backdrop="static"
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
      :sheet="sheet"
      :errors="documentErrors"
      :document-type="documentType"
    />

    <LoadingOverlay
      v-if="isLoading && hasParsedFiles"
      :caption="loaderText"
    />

    <ModalErrors
      :errors="modalErrors"
    />

    <WarningOverlay
      v-if="isConfirmationIndicatorOpen"
      :sheet="sheet"
      :document-errors="documentErrors"
      @handle-confirm="createDocuments"
      @close="() => isConfirmationIndicatorOpen = false"
    />

    <template #footer>
      <BulkUploaderFooter
        v-if="hasParsedFiles"
        :has-errors="hasErrors"
        @handle-confirm="handleConfirm"
        @handle-clear="handleClearFile"
        @close-modal="onClose"
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
import { ImportDocuments } from './utilities/import-documents.js'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list.js'
import type { DocError, HTMLInputEvent, DocsResp, SheetData } from '~/types/components/documents-uploader/document-schema.js'
import type { DocumentStore } from '~/types/common/documents.js'
import WarningOverlay from './warning-overlay.vue'

const { realm } = useRealm()
const auth = useAuth()

const props = defineProps<{
  documentType: DocumentTypes
}>()
const { t, locale } = useI18n()

const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token(), realm })
const importDocuments = new ImportDocuments(t, locale.value, props.documentType)

const $emit = defineEmits(['onClose', 'refreshRecord'])

// Refs
const documents: Ref<DocumentStore> = ref({ documents: [], subDocuments: [] })
const sheet: Ref<SheetData> = ref([])
const isLoading = ref(false)
const loaderText = ref(t('uploadingLoader'))
const errors: Ref<DocError[]> = ref([])
const modalSize = ref('xl')
const modalRef = shallowRef({ show: () => undefined, close: () => undefined })
const isConfirmationIndicatorOpen = ref(false)

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

const hasParsedFiles: ComputedRef<boolean> = computed(() => sheet.value.length > 0)

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
  sheet.value = []
  isConfirmationIndicatorOpen.value = false
  loaderText.value = t('uploadingLoader')
}

async function handleConfirm (): Promise<DocsResp> {
  if (!isConfirmationIndicatorOpen.value) {
    isConfirmationIndicatorOpen.value = true
    return []
  }
  return await createDocuments()
}

async function createDocuments (): Promise<DocsResp> {
  loaderText.value = t('creatingDocumentsLoader')
  isLoading.value = true

  // Create subdocuments. PIC, The Provider etc..
  const subdocuments = documents.value.subDocuments
    .map((doc) => kmDocumentApi.createDocument(doc)
      .catch((error: unknown) => {
        // Attempt to create a document draft of the supporting document
        // if the supporting document contains errors.
        console.warn(error) // eslint-disable-line no-console -- Show error in console
        kmDocumentApi.createDocumentDraft(doc)
      }))

  const docs = documents.value.documents
    .map(async (doc) => await kmDocumentApi.createDocumentDraft(doc))

  // Create all documents
  const resp = await Promise.all([...docs, ...subdocuments])

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
  const readResult = await importDocuments.readXLSXFile(changeEvent)

  // Map document attributes to the document schema
  const documentStore: DocumentStore = await importDocuments.mapDocumentAttributesToSchemaJson(readResult.data)

  // Parse the spreasheet object into header(description), and value pairs parsed to be displayed to the user.
  sheet.value = await importDocuments.parseSheetForDisplay(readResult.data)

  isLoading.value = false

  // Store errors
  const { errors: importErrors, documentErrors: docErrors } = importDocuments
  errors.value = importErrors
  documentErrors.value = docErrors

  // Store document json
  documents.value = documentStore
  modalSize.value = 'xxl'

  return documentStore
}
</script>
