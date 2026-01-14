<template>
  <div
    :data-question-type="question.data.type"
    :data-key="question.data.key"
  >
    <label
      v-if="question.data.type !== 'legend'"
      :name="question.data.key"
      :for="question.data.key"
      class="question-label px-0"
      v-html="getQuestionLabel(question.data)"
    />

    <component
      :is="questionComponent.component"
      v-bind="questionComponent.props"
    />

    <div v-if="hasAdditionalInfo(question)">
      <label> {{ $t('additionalInformation') }} </label>
      <KmValueMl
        :question="getAdditionalInfo(question)"
        :locales="[locale]"
        :html="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  computed, type ComputedRef, type Component
} from 'vue'
import KmValueMl from './km-value-ml.vue'
import OptionsValue from './options-value.vue'
import DocumentLegend from './document-legend.vue'
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { QuestionMap, Question, DocumentValue, QuestionProps } from '~/types/common/document-report'

const { locale, t } = useI18n()

const props = defineProps<{
  question: Question,
}>()

// Computed
const questionComponent: ComputedRef<{ component: Component, props: QuestionProps }> = computed(() => {
  const { question: { data: { type } } } = props
  const questionProps: QuestionProps = { question: props.question, locales: [locale.value] }

  switch (type) {
    case 'lstringRte':
      questionProps.html = true
      return { component: KmValueMl, props: questionProps }
    case 'int':
    case 'lstring':
      return { component: KmValueMl, props: questionProps }
    case 'term':
    case 'option':
      return { component: OptionsValue, props: questionProps }
    case 'legend':
      return { component: DocumentLegend, props: { title: props.question.data.title } }
    default:
      return { component: KmValueMl, props: questionProps }
  }
})

// Methods

/**
 * Get label for question including the question number and sanatize any HTML in the label.
 */
function getQuestionLabel (questionMap: QuestionMap): string {
  const spaceSubQuestion = (number: string | undefined): string => {
    if (number === '' || number === undefined) { return '' }
    return number.replace(/(?:[0-9]{1,3})(?:[a-z])/, '$1 $2') + '. '
  }

  if (parseInt(questionMap.number, 10) >= 0) {
    return `${spaceSubQuestion(questionMap.number)}${questionMap.title ?? ''}`
  }
  return sanitizeHtml(questionMap.title ?? '')
}

/**
 * Does the value include a translated string?
 */
function hasLocaleValue (value: string | Record<string, string> | null | undefined): value is string | Record<string, string> {
  return typeof value === 'string' || typeof value === 'object'
}

/**
 * Does the value have additional information included with it?
 */
function hasAdditionalInfo (q: Question): boolean {
  if (q.values.length !== 1) { return false }
  return hasLocaleValue(q.values[0]?.additionalInformation) || hasLocaleValue(q.values[0]?.details)
}

/**
 * Get the translated additional information string (stored either under the details or additionalInformation key).
 */
function getAdditionalInfo (q: Question): Question {
  const getAdditionalInfo = (value: string | Record<string, string> | undefined | null): string => {
    const langKey = locale.value.toLowerCase()
    if (typeof value === 'object' && value !== null && typeof value[langKey] === 'string') {
      return value[langKey]
    }
    if (typeof value === 'string') {
      return value
    }
    return ''
  }

  const value = getAdditionalInfo(q.values[0]?.details ?? q.values[0]?.additionalInformation)
  const values: DocumentValue[] = [{
    value,
    title: value,
    caption: t('additionalInformation'),
    type: 'lstring'
  }]
  return { values, data: q.data }
}
</script>
<style scoped>
label.question-label + div {
  padding-top: 1px;
}
</style>
