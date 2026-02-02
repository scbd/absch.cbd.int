<!--
InformationFromNr1

Information from the first national report based on a list of questions.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <div
    v-if="questions.length > 0"
    id="related-information"
    class="px-4 pb-3 pt-2 bg-white"
  >
    <div class="d-flex flex-column gap-3">
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
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import editAbsNationalReportT from '~/app-text/views/forms/edit/abs/edit-abs-national-report.json'
import editNationalReportT from '~/app-text/views/forms/edit/abs/edit-national-report-1.json'
import viewNationalReportT from '~/app-text/views/forms/view/view-national-report.json'
import { getQuestionValues } from './getQuestionData'
import DocumentQuestion from './document-question.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type {
  DocumentData, QuestionMap, ReportSection, Question
} from '~/types/common/document-report'

const { mergeLocaleMessage, locale } = useI18n()
// Props
export interface Props {
  relatedQuestions?: string[]
  nationalReportData: DocumentData
  questionsMap: ReportSection[]
  locales?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  relatedQuestions: () => []
})

// Translation Keys
const messageGroups = [
  countryProfileT,
  editAbsNationalReportT,
  editNationalReportT,
  viewNationalReportT
]
messageGroups.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})
// Refs
const questions: Ref<Question[]> = ref([])

onMounted(() => {
  questions.value = props.relatedQuestions
    .map((questionKey: string) => getQuestion(questionKey, props.nationalReportData))
    .filter(doesQuestionExist)
  console.log('questions.value', questions.value)
  console.log('questionsMap', props.questionsMap)
})

// Methods

/**
 * Get information needed to render question from the document report (questionMap)
 * AND the NR1 document data fetched from server
 */
function getQuestion (questionKey: string, reportData: DocumentData): Question {
  const questionMap: QuestionMap = getQuestionMap(questionKey)
  return { values: getQuestionValues(reportData, questionMap), data: questionMap }
}
/**
 * Get information needed from the document report (absNationalReport1)
 */
function getQuestionMap (questionKey: string): QuestionMap {
  let question: QuestionMap = { type: '', key: '', options: [], number: '-1', multiple: false }
  props.questionsMap.forEach((section: ReportSection) => {
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
function getQuestionLabel (questionMap: QuestionMap): string {
  const spaceSubQuestion = (number: string | undefined): string => {
    if (number === '' || number === undefined) { return '' }
    return number.replace(/(?:[0-9]{1,3})(?:[a-z])/, '$1 $2') + '. '
  }

  if (parseInt(questionMap.number, 10) >= 0) {
    return `${spaceSubQuestion(questionMap.number)}${questionMap.title ?? ''}`
  }
  return questionMap.title ?? ''
}

function doesQuestionExist (q: Question): boolean {
  if (typeof q.values[0] !== 'object') { return false }
  return (q.values[0].title !== '' || q.values[0].value !== undefined) && q.data.type !== ''
}
</script>
