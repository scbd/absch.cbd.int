<template>
  <div id="bulk-documents-uploader" />
</template>

<script setup>
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '../../services/composables/realm.js'
import { onMounted, createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import KmDocumentApi from '~/api/km-document'
// TODO: Improve translation import process and refine translation keys
import englishMessages from '~/app-text/components/common/import-file.json'
import UploadModal from './uploader-modal.vue'

const { realm } = useRealm()

const auth = useAuth()
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token(), realm })

const props = defineProps({
  documentType: {
    type: String,
    default: ''
  },
  createDocument: {
    type: Function,
    default: () => []
  }
})

const $emit = defineEmits(['onClose', 'refreshRecord'])

onMounted(() => {
  const i18n = createI18n({
    fallbackLocale: 'en',
    legacy: false,
    locale: 'en',
    messages: englishMessages
  })

  const createDocument = (apiJson) => kmDocumentApi.createDocument(apiJson)

  const app = createApp(UploadModal, {
    documentType: props.documentType,
    onClose: () => $emit('onClose'),
    createDocument,
    recordRefresh: () => $emit('refreshRecord')
  })

  app.use(i18n)
  app.mount('#bulk-documents-uploader')
})
</script>
