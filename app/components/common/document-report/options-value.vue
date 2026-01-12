<template>
  <div class="option-value">
    <div
      v-if="question.data.multiple"
      class="km-value"
    >
      <ul
        v-if="Array.isArray(question.values)"
        class="list"
      >
        <li
          v-for="item in question.values"
          :key="JSON.stringify(item)"
        >
          <span v-html="sanitizeHtml(displayText(item.value, question.data))" />
          <span
            v-if="hasAdditionalInfo(item)"
            v-html="formatAdditionalInfo(item)"
          />
        </li>
      </ul>
    </div>
    <div v-else>
      <KmValueMl
        v-if="hasSingleValue(question.values)"
        :question="question"
        :locales="locales"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
import KmValueMl from './km-value-ml.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { Question, DocumentValue, QuestionMap } from '~/types/common/document-report'

const { locale } = useI18n()

const props = defineProps<{
  question: Question
  locales: string[]
}>()

function hasAdditionalInfo (item: DocumentValue): boolean {
  return item.additionalInformation !== undefined
}

function formatAdditionalInfo (item: DocumentValue): string {
  const info = sanitizeHtml(getLocalizedString(item.additionalInformation, props.locales[0] ?? locale))
  return ` (${info})`
}

function hasSingleValue (values: DocumentValue[]): boolean {
  return typeof values[0] === 'object'
}

function displayText (answer: string | Record<string, string>, question: QuestionMap): string {
  if (Array.isArray(question.options) && typeof answer === 'string') {
    const option = question.options.find(option => option.value === answer)
    return option?.title ?? answer
  }
  if (typeof answer === 'string') { return answer }
  return ''
}

function getLocalizedString (value: string | Record<string, string> | number | undefined | null, locale: string): string {
  // Implement lstring logic for localization
  if (value === undefined || value === null) { return '' }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number') {
    return String(value)
  }

  // Handle localization object
  if (typeof value === 'object') {
    if (typeof locale === 'string' && typeof value[locale] === 'string') {
      return value[locale]
    }
  }
  return ''
}
</script>
