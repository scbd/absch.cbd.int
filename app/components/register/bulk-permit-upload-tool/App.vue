<template>
  <div id="bulk-documents-uploader"> </div>
</template>

<script setup lang="ts">
import { onMounted, createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './components/app.vue'


const props = defineProps<{
  documentType: string;
}>()

const $emit = defineEmits(['onClose'])


onMounted(() => {
  const englishMessages = {
    importIrccExcel: "Import IRCC Excel Document",
    confirm: 'Confirm',
    clear: 'Clear Imported Records',
    pleaseSelectExcelInfo: "Please select a excel file to begin importing data.",
    browse: "Browse"
  }

  const i18n = createI18n({
    fallbackLocale: 'en',
    legacy: false,
    locale: 'en',
    messages: {
      en: englishMessages
    },
  })
  console.log($emit)
  console.log('props.documentType', props.documentType)


  const handleClose = () => {
    console.log('handleClose', handleClose)
    $emit('onClose')
  }

  const app = createApp(App, {
    documentType: 'ircc',
    onClose: handleClose,
  })
  
  app.use(i18n)
  
  app.mount('#bulk-documents-uploader')
})
</script>
