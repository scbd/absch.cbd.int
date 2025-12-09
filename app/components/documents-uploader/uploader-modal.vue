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

    <!-- TODO: Display Document Preview -->
    <DocumentsPreview
      v-if="hasParsedFiles"
      :sheet="sheet"
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
import { ref, computed, onMounted, shallowRef, Ref, ComputedRef } from 'vue'
// @ts-ignore
import { useI18n } from 'vue-i18n'
// @ts-ignore
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-ignore
import { useRealm } from '../../services/composables/realm.js'
// @ts-ignore
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
import recordListMessages from '~/app-text/views/register/record-list.json'; 
import contactMessages from '~/app-text/views/forms/edit/directives/edit-contact.json'
import { ImportDocuments } from './utilities/import-documents.js'
import { DocumentTypes} from '~/types/components/documents-uploader/document-types-list.js'
import { DocError } from '~/types/components/documents-uploader/document-schema.js'
import { StandardError } from '~/types/errors.js'
import { ReadFileResult } from './utilities/read-xlsx-file.js'

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
const defaultDocumentJson = [{ header: { identifier: '' } }]
const documents = ref(defaultDocumentJson)
const sheet :Ref<ReadFileResult> = ref({ data: [], errors: [] })
const isLoading = ref(false)
const errors :Ref<Array<StandardError | DocError>> = ref([])
const modalSize = ref('xl')
const modalRef = shallowRef({ show: () => undefined, close: () => undefined })

// Computed Properties
const hasErrors = computed(() => errors.value
  .some((error) => error.level === 'error'))

const modalErrors = computed(() => errors.value
  .filter((error) => !Number.isInteger((error as DocError).row)))

const documentErrors :ComputedRef<DocError[]> = computed(() => (errors.value as DocError[])
  .filter((error) => Number.isInteger((error as DocError).row)))

const hasParsedFiles = computed(() => {
  return sheet.value.data.length > 0
})

// Event Hooks
onMounted(async () => {
  modalRef.value.show()

  isLoading.value = true

  await importDocuments.getKeywordsMap()

  errors.value = importDocuments.errors

  isLoading.value = false
})

// Methods
function handleClearFile () {
  isLoading.value = false
  errors.value = []
  importDocuments.setErrors([])
  documents.value = defaultDocumentJson
  modalSize.value = 'xl'
  sheet.value = { data: [], errors: [] }
}

async function handleConfirm () {
  isLoading.value = true

  const requestPromises = documents.value.map((doc) => kmDocumentApi.createDocumentDraft(doc))

  return Promise.all(requestPromises)
    .then(() => {
      $emit('refreshRecord')
      handleClearFile()
      onClose()
      modalRef.value.close()
    })
}

function onClose () {
  $emit('onClose')
}

async function onFileChange (changeEvent: Event) {
  handleClearFile()

  isLoading.value = true

  // Read File
  sheet.value = await importDocuments.readXLSXFile(changeEvent)

  // Map document attributes to the document schema
  const documentsJson = await importDocuments.mapDocumentAttributesToSchemaJson(sheet.value.data)

  isLoading.value = false

  // Store errors
  errors.value = importDocuments.errors

  // Store document json
  documents.value = documentsJson
  modalSize.value = 'xxl'

  return documents
}
</script>
