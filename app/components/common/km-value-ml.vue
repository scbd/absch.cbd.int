<template>
  <div id="km-value-ml">
    <div
      v-for="(locale, index) in displayLocales"
      :key="locale"
      :class="['input-group', {
        'multiple-languages': locales.length > 1 && !isLast(index, locales.length)
      }]"
    >
      <!-- Non-HTML version -->
      <div
        v-if="!html"
        :class="['form-control', 'km-value', 'km-value-ml-div', {
          markdown: markdown,
          'km-pre': kmPre
        }]"
        aria-describedby="basic-addon1"
      >
        {{ lstring(value, locales[0]) }}
      </div>

      <!-- HTML version -->
      <div
        v-else
        :class="['form-control', 'km-value', 'km-value-ml-div', 'km-value-ml-html', {
          markdown: markdown,
          'km-pre': kmPre
        }]"
        aria-describedby="basic-addon1"
        v-html="sanitizeHtml(lstring(value, locales[0]))"
      />

      <span
        id="basic-addon1"
        class="input-group-text"
        style="cursor: default"
      >
        {{ getLocaleDisplay(locale) }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { languages } from '~/app-data/un-languages'
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import type { LanguageCode, LString } from '~/types/languages'

interface Props {
  locales: string[]
  value: LString | number | string
  markdown?: boolean
  kmPre?: boolean
  html?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  markdown: false,
  kmPre: false,
  html: false
})

/**
 * If we are passing more than one locale value to display but the document does not have a value for that locale
 * do not display a value box element for that locale.
 */
const displayLocales = computed(() => props.locales.filter(hasLocaleValue))

// Methods
function hasLocaleValue (locale: string): boolean {
  if (props.locales.length === 1) { return true }

  if (typeof props.value !== 'object') { return true }

  const isLangCode = (value: string): value is LanguageCode => Object.keys(languages).includes(value)
  if (!isLangCode(locale)) { return false }

  return props.value[locale] !== undefined
}

function isLast (index: number, totalLength: number): boolean {
  return index === totalLength - 1
}

function getLocaleDisplay (locale: string | undefined | object): string {
  if (typeof locale !== 'string') { return '' }
  return locale.toUpperCase()
}
</script>
