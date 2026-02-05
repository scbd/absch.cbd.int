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
    <div class="review-questions d-flex flex-column gap-3">
      <div
        v-for="question in questions"
        :key="question.data.key"
      >
        <DocumentQuestion
          :question="question"
          :label="getQuestionLabel(question.data)"
          :locales="locales ?? [locale]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import { getQuestionValues } from './get-question-data'
import DocumentQuestion from './document-question.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { QuestionMap, ReportSection, Question } from '~/types/common/document-report'
import type { DocumentData } from '~/types/common/documents'
import type { LanguageCode } from '~/types/languages'

const { locale } = useI18n()
// Props
export interface Props {
  relatedQuestions?: string[]
  documentData: DocumentData
  reportSections: ReportSection[]
  locales?: string[] | LanguageCode[] | undefined
}

const props = withDefaults(defineProps<Props>(), {
  relatedQuestions: () => [],
  locales: undefined
})

// Refs
const questions: Ref<Question[]> = ref([])

onMounted(() => {
  questions.value = props.relatedQuestions
    .map((questionKey: string) => getQuestion(questionKey, props.documentData))
    .filter(doesQuestionExist)
})

// Methods

/**
 * Get information needed to render question from the document report (questionMap)
 * AND the NR1 document data fetched from server
 */
function getQuestion (questionKey: string, reportData: DocumentData): Question {
  const questionMap: QuestionMap<DocumentData> = getQuestionMap(questionKey)
  return { values: getQuestionValues(reportData, questionMap), data: questionMap }
}
/**
 * Get information needed from the document report (absNationalReport1)
 */
function getQuestionMap (questionKey: string): QuestionMap<DocumentData> {
  let question: QuestionMap<DocumentData> = { type: '', key: '', options: [], number: '-1', multiple: false }
  props.reportSections.forEach((section: ReportSection) => {
    if (section.questions === undefined) { return }
    section.questions.forEach((q) => {
      if (q.key === questionKey) {
        question = Object.assign({ key: '', number: '', type: '', multiple: false }, q)
      }
    })
  })
  return question
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
  return (q.values[0].title !== '' && q.data.type !== '') || q.data.type === 'legend'
}
</script>
