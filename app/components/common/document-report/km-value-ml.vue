<template>
  <div id="km-value-ml">
    <div
      v-for="(locale, index) in locales"
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
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import type { LString } from '~/types/languages'

interface Props {
  locales: string[]
  value: LString
  markdown?: boolean
  kmPre?: boolean
  html?: boolean
}

withDefaults(defineProps<Props>(), {
  markdown: false,
  kmPre: false,
  html: false
})

function isLast (index: number, totalLength: number): boolean {
  return index === totalLength - 1
}

function getLocaleDisplay (locale: string | undefined | object): string {
  if (typeof locale !== 'string') { return '' }
  return locale.toUpperCase()
}
</script>
