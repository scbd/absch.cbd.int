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
      :is="questionComponent"
    />

    <div v-if="hasAdditionalInfo(question)">
      <label> {{ $t('additionalInformation') }} </label>
      <LocaleValue
        :question="getAdditionalInfo(question)"
        :locales="[locale]"
        :html="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  computed, defineComponent, h, withDirectives,
  type ComputedRef, type Component
} from 'vue'
import LocaleValue from './locale-value.vue'
import OptionsValue from './options-value.vue'
import DocumentLegend from './document-legend.vue'
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { QuestionMap, Question, DocumentValue } from '~/types/common/document-report'

const { locale, t } = useI18n()

const props = defineProps<{
  question: Question,
}>()

// Directives
const questionComponent: ComputedRef<Component> = computed(() => {
  const { question: { data: { type } } } = props
  const componentProps = {
    question: props.question,
    locales: [locale.value]
  }

  switch (type) {
    case 'lstringRte':
      return defineComponent(() => () => h('div', h(LocaleValue, Object.assign(componentProps, { html: true }))))
    case 'int':
    case 'lstring':
      return defineComponent(() => () => h('div', h(LocaleValue, componentProps)))
    case 'term':
    case 'option':
      return defineComponent(() => () => h('div', h(OptionsValue, componentProps)))
    case 'legend':
      return defineComponent(() => () => h('div', h(DocumentLegend, componentProps)))
    default:
      return defineComponent(() => () => h('div', props.question.values[0]?.title))
  }
})

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

function hasLocaleValue (value: string | Record<string, string> | null | undefined): value is string | Record<string, string> {
  return typeof value === 'string' || typeof value === 'object'
}
function hasAdditionalInfo (q: Question): boolean {
  if (q.values.length !== 1) { return false }
  return hasLocaleValue(q.values[0]?.additionalInformation) || hasLocaleValue(q.values[0]?.details)
}

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
