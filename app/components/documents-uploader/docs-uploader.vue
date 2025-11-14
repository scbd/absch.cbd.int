<template>
  <div id="bulk-documents-uploader" />
</template>

<script setup>
import { onMounted, createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import UploadModal from './uploader-modal.vue'

const props = defineProps({
  documentType: {
    type: String,
    default: '',
  }
})

const $emit = defineEmits(['onClose'])

onMounted(() => {
  const englishMessages = {
    importIrccExcel: 'Import IRCC Excel Document',
    confirm: 'Confirm',
    clear: 'Clear Imported Records',
    pleaseSelectExcelInfo: 'Please select a excel file to begin importing data.',
    browse: 'Browse'
  }

  const i18n = createI18n({
    fallbackLocale: 'en',
    legacy: false,
    locale: 'en',
    messages: {
      en: englishMessages
    }
  })

  const handleClose = () => {
    console.log('handleClose', handleClose)
    $emit('onClose')
  }

  const app = createApp(UploadModal, {
    documentType: props.documentType,
    onClose: handleClose
  })

  app.use(i18n)

  app.mount('#bulk-documents-uploader')
})
</script>
