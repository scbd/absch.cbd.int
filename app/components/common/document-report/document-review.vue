<!--
Document Review

Show a list of document questions and answers given a list of questions.
-->
<template>
  <div
    v-if="questions.length > 0"
    class="document-review"
  >
    <slot name="header" />
    <div class="review-questions d-flex flex-column gap-1">
      <DocumentQuestion
        v-for="question in questions"
        :key="question.data.key"
        :question="question"
        :label="getQuestionLabel(question.data)"
        :locales="locales ?? [locale]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type Ref, type ComputedRef } from 'vue'

import { getQuestionValues, flattenQuestions } from './get-question-data'
import DocumentQuestion from './document-question.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { QuestionMap, Question, DocQuestion, Legend } from '~/types/common/document-report'
import type { DocumentData } from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'

const { locale } = useI18n()
// Props
export interface Props {
  relatedQuestions?: string[] | null
  documentData: DocumentData
  reportSections: Array<QuestionMap<DocumentData>>
  locales?: string[] | LanguageCode[] | undefined
}

const props = withDefaults(defineProps<Props>(), {
  relatedQuestions: null,
  locales: undefined
})

// Refs
const questions: Ref<Question[]> = ref([])
// Computed
const flatQuestionsData: ComputedRef<Array<DocQuestion | Legend>> = computed(() => flattenQuestions(props.reportSections, null))

onMounted(() => {
  const questionKeys = (props.relatedQuestions ?? flatQuestionsData.value.map(q => q.key))
  questions.value = questionKeys
    .map((questionKey: string) => getQuestion(questionKey, props.documentData))
    .filter(doesQuestionExist)
})

// Methods
/**
 * Get information needed to render question from the document report (questionMap)
 * AND document data (questions awnsers) fetched from server
 */
function getQuestion (questionKey: string, reportData: DocumentData): Question {
  const questionMap: QuestionMap<DocumentData> = getQuestionMap(questionKey)
  return { values: getQuestionValues(reportData, questionMap), data: questionMap }
}
/**
 * Get information needed from the document report (e.g. absNationalReport1)
 */
function getQuestionMap (questionKey: string): QuestionMap<DocumentData> {
  const question = flatQuestionsData.value
    .find(q => q.key === questionKey)
  return Object.assign({ key: '', number: '', type: '', multiple: false }, question)
}
/**
 * Get label for question including the question number in the label.
 */
function getQuestionLabel (questionMap: QuestionMap<DocumentData>): string {
  const spaceSubQuestion = (number: string | undefined): string => {
    if (number === '' || number === undefined) { return '' }
    return number.replace(/(?:[0-9]{1,3})(?:[a-z])/, '$1 $2') + '. '
  }

  if (parseInt(questionMap.number ?? '-1', 10) >= 0) {
    return `${spaceSubQuestion(questionMap.number)}${questionMap.title ?? ''}`
  }
  return questionMap.title ?? ''
}

function doesQuestionExist (q: Question): boolean {
  if (typeof q.values[0] !== 'object') { return false }
  if (q.data.type === 'legend') {
    if (!Array.isArray(q.data.questions)) { return true }
    return flattenQuestions(q.data.questions, 1).some(q => props.documentData[q.key] !== undefined)
  }
  return (q.values[0].title !== '' && q.data.type !== '')
}
</script>
