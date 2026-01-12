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
        {{ getValue(question, locale) }}
      </div>

      <!-- HTML version -->
      <div
        v-else
        :class="['form-control', 'km-value', 'km-value-ml-div', 'km-value-ml-html', {
          markdown: markdown,
          'km-pre': kmPre
        }]"
        aria-describedby="basic-addon1"
        v-html="sanitizeHtml(getValue(question, locale))"
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
import type { Question } from '~/types/common/document-report'

interface Props {
  locales: string[]
  question: Question
  markdown?: boolean
  kmPre?: boolean
  html?: boolean
}

withDefaults(defineProps<Props>(), {
  markdown: false,
  kmPre: false,
  html: false
})

function getValue (q: Question, locale: string): string {
  if (q.data.type === 'option') {
    return q.values[0]?.title ?? parseLocaleValue(q.values[0]?.value, locale)
  }
  return parseLocaleValue(q.values[0]?.value, locale)
}

function isLast (index: number, totalLength: number): boolean {
  return index === totalLength - 1
}

function parseLocaleValue (value: string | Record<string, string> | undefined, locale: string): string {
  if (typeof value === 'object' && typeof value[locale] === 'string') {
    return value[locale]
  }
  if (typeof value === 'string') { return value }

  if (typeof value !== 'object') { return String(value) }
  return ''
}

function getLocaleDisplay (locale: string | undefined | object): string {
  if (typeof locale !== 'string') { return '' }
  return locale.toUpperCase()
}
</script>
