<template>
  <div
    :data-question-type="question.data.type"
    :data-key="question.data.key"
    :class="{ 'mb-1': question.data.type !== 'legend' }"
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
    <div
      v-if="isDetailsDefined(question.values[0]?.details)"
      class="additional-information"
    >
      <label> {{ question.values[0].caption ?? t('additionalInformation') }} </label>
      <KmValueMl
        :value="question.values[0]?.details"
        :locales="definedLocales"
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
import messages from '~/app-text/components/common/document-question.json'
import type { Question, QuestionProps } from '~/types/common/document-report'
import type { LanguageCode, LString } from '~/types/languages'

const { t, locale } = useI18n({ messages })

const props = defineProps<{
  question: Question,
  label: string,
  locales?: LanguageCode[],
}>()

// Computed
const definedLocales: ComputedRef<LanguageCode[]> = computed(() => props.locales ?? [locale.value])

const questionComponent: ComputedRef<{ component: Component, props: QuestionProps }> = computed(() => {
  const { question: { data: { type } } } = props
  const questionProps: QuestionProps = { value: props.question.values[0]?.value, locales: definedLocales.value }

  switch (type) {
    case 'lstringRte':
      questionProps.html = true
      return { component: KmValueMl, props: questionProps }
    case 'int':
    case 'lstring':
      return { component: KmValueMl, props: questionProps }
    case 'term':
    case 'option':
      return { component: OptionsValue, props: { question: props.question, locales: definedLocales.value } }
    case 'legend':
      return {
        component: DocumentLegend,
        props: { title: props.question.data.title, linkHref: props.question.data.linkHref }
      }
    default:
      return { component: KmValueMl, props: questionProps }
  }
})

function isDetailsDefined (details: string | LString | undefined): details is string | LString {
  if (details === undefined) { return false }

  if (typeof details === 'string') { return true }

  return definedLocales.value.some((locale) => details[locale] !== undefined)
}
</script>
<style scoped>
label.question-label + div {
  padding-top: 1px;
}
</style>
