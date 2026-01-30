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
      v-html="sanitizeHtml(label)"
    />

    <component
      :is="questionComponent.component"
      v-bind="questionComponent.props"
    />

    <div v-if="question.values[0]?.details !== undefined">
      <label> {{ $t('additionalInformation') }} </label>
      <KmValueMl
        :value="question.values[0]?.details"
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
import KmValueMl from '~/components/common/km-value-ml.vue'
import OptionsValue from './options-value.vue'
import DocumentLegend from '../document-legend.vue'
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { Question, QuestionProps } from '~/types/common/document-report'

const { locale } = useI18n()

const props = defineProps<{
  question: Question,
  label: string,
  locales?: string[],
}>()

// Computed
const questionComponent: ComputedRef<{ component: Component, props: QuestionProps }> = computed(() => {
  const { question: { data: { type } } } = props
  const questionProps: QuestionProps = { value: props.question.values[0]?.value, locales: props.locales ?? [locale.value] }

  switch (type) {
    case 'lstringRte':
      questionProps.html = true
      return { component: KmValueMl, props: questionProps }
    case 'int':
    case 'lstring':
      return { component: KmValueMl, props: questionProps }
    case 'term':
    case 'option':
      return { component: OptionsValue, props: { question: props.question, locales: [locale.value] } }
    case 'legend':
      return { component: DocumentLegend, props: { title: props.question.data.title } }
    default:
      return { component: KmValueMl, props: questionProps }
  }
})
</script>
<style scoped>
label.question-label + div {
  padding-top: 1px;
}
</style>
