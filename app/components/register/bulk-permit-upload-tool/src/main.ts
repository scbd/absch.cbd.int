import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import fileMessages from './app-text/components/common/import-file.json'
import irccMessages from './app-text/components/common/import-file-ircc.json'

const englishMessages = Object.assign({}, fileMessages, irccMessages)

const i18n = createI18n({
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: {
    en: englishMessages
  },
})

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)

app.mount('#app')
