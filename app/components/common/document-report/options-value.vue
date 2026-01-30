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
            v-if="item.details !== undefined"
            v-html="sanitizeHtml(lstring(item.value, locales[0]))"
          />
        </li>
      </ul>
    </div>
    <div v-else>
      <KmValueMl
        v-if="typeof question.values[0] === 'object'"
        :value="question.values[0].value"
        :locales="locales"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import KmValueMl from '~/components/common/km-value-ml.vue'
import type { Question, QuestionMap } from '~/types/common/document-report'

defineProps<{
  question: Question
  locales: string[]
}>()

function displayText (answer: string | Record<string, string>, question: QuestionMap): string {
  if (Array.isArray(question.options) && typeof answer === 'string') {
    const option = question.options.find(option => option.value === answer)
    return option?.title ?? answer
  }
  if (typeof answer === 'string') { return answer }
  return ''
}
</script>
