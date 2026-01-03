<template>
  <div
    class="d-flex flex-column"
    :data-question-type="question.data.type"
    :data-key="questionKey"
  >
    <label
      v-if="question.data.type !== 'legend'"
      :name="question.data.title"
    >
      {{ getQuestionLabel(question.data) }}
    </label>

    <component
      :is="questionComponent"
      :question="question"
      :locales="[locale]"
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
import { computed, defineComponent, h, type ComputedRef, type Component } from 'vue'
import LocaleValue from './locale-value.vue'
import LinksListValue from './links-list-value.vue'
import OptionsValue from './options-value.vue'
import DocumentLegend from './document-legend.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { QuestionMap, Question, Option, DocumentData } from '~/types/common/document-report'

const { locale, t } = useI18n()

const props = defineProps<{
  questionKey: string,
  questionMap: QuestionMap
  reportData: DocumentData
}>()

const question: ComputedRef<Question> = computed(() => ({ values: getQuestionValues(props.questionKey, props.reportData), data: props.questionMap }))

const questionComponent: ComputedRef<Component> = computed(() => {
  const { value: { data: { type } } } = question
  switch (type) {
    case 'lstringRte':
    case 'int':
    case 'lstring':
      return LocaleValue
    case 'link':
      return LinksListValue
    case 'term':
    case 'option':
      return OptionsValue
    case 'legend':
      return DocumentLegend
    default:
      return defineComponent(() => () => h('div', question.value.values[0]?.title))
  }
})

function getQuestionLabel (q: QuestionMap): string {
  if (parseInt(q.number, 10) >= 0) {
    return `${q.number}. ${q.title ?? ''}`
  }
  return q.title ?? ''
}

function getQuestionValues (questionKey: string, reportData: DocumentData): Option[] {
  const { [questionKey]: questionData } = reportData

  const defaultOption = {
    value: '',
    title: '',
    type: '',
    caption: ''
  }

  // TODO: Handle other types.
  if (props.questionMap.type === 'option') {
    const questionValue = typeof questionData?.value === 'string' ? questionData.value : ''
    const selectedOptions = props.questionMap.options
      .filter((option: Option) => {
        const { value: optionValue } = option
        return optionValue === questionValue
      })
      .map((mapOption) => Object.assign(mapOption, questionData))

    return selectedOptions
  }

  return [Object.assign(defaultOption, questionData)]
}

function hasLocaleValue (value: string | Record<string, string> | null | undefined): value is string | Record<string, string> {
  return typeof value === 'string' || typeof value === 'object'
}
function hasAdditionalInfo (q: Question): boolean {
  if (q.values.length < 1) { return false }
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
  const values: Option[] = [{
    value,
    title: value,
    caption: t('additionalInformation'),
    type: 'lstring'
  }]
  return { values, data: q.data }
}

// function doesQuestionExist (q: Question): boolean {
//   if (typeof q.values[0] !== 'object') { return false }
//   return q.values[0].title !== '' && q.data.type !== ''
// }
</script>
