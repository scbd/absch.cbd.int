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
        {{ value }}
      </div>

      <!-- HTML version -->
      <div
        v-else
        :class="['form-control', 'km-value', 'km-value-ml-div', 'km-value-ml-html', {
          markdown: markdown,
          'km-pre': kmPre
        }]"
        aria-describedby="basic-addon1"
        v-html="sanitizeHtml(value)"
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

const props = withDefaults(defineProps<Props>(), {
  markdown: false,
  kmPre: false,
  html: false
})

const value = computed(() => props.question.data.type === 'option' ? props.question.values[0]?.title : props.question.values[0]?.value)

function isLast (index: number, totalLength: number): boolean {
  return index === totalLength - 1
}

// Locale display formatting
function getLocaleDisplay (locale: string | undefined): string {
  return (locale ?? '').toUpperCase()
}
</script>
