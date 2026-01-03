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
          <span v-html="sanitizeHtml(item.value)" />
          <span
            v-if="hasAdditionalInfo(item)"
            v-html="formatAdditionalInfo(item)"
          />
        </li>
      </ul>
    </div>
    <div v-else>
      <LocaleValue
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
import LocaleValue from './locale-value.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { Question, Option } from '~/types/common/document-report'

const { locale } = useI18n()

const props = defineProps<{
  question: Question
  locales: string[]
}>()

function hasAdditionalInfo (item: Option): boolean {
  return item.additionalInformation !== undefined
}

function formatAdditionalInfo (item: Option): string {
  const info = sanitizeHtml(getLocalizedString(item.additionalInformation, props.locales[0] ?? locale))
  return `(${info})`
}

function hasSingleValue (values: Option[]): boolean {
  return typeof values[0] === 'object'
}

function getLocalizedString (value: string | Record<string, string> | undefined | null, locale: string): string {
  // Implement lstring logic for localization
  if (value === undefined || value === null) { return '' }

  if (typeof value === 'string') {
    return value
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
