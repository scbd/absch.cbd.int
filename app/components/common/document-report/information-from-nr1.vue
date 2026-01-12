<!--
InformationFromNr1

Information from the first national report based on a list of questions.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <div
    v-if="questions.length > 0"
    id="country-summary"
    class="px-4 pb-3 pt-2 bg-white"
  >
    <slot name="header">
      <h3 class="text-dark mb-2">
        {{ $t('relatedInformation') }}
        <a
          class="text-primary"
          type="button>?"
          :href="nr1Url"
        >
          {{ $t('firstNR') }}
        </a>
        {{ $t('publishedOn') }}
        {{ publishedDate }}
      </h3>
    </slot>
    <div class="d-flex flex-column gap-3">
      <div
        v-for="question in questions"
        :key="question.data.key"
      >
        <DocumentQuestion
          :question="question"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import editAbsNationalReportT from '~/app-text/views/forms/edit/abs/edit-abs-national-report.json'
import editNationalReportT from '~/app-text/views/forms/edit/abs/edit-national-report-1.json'
import viewNationalReportT from '~/app-text/views/forms/view/view-national-report.json'
import { getQuestionValues } from './getQuestionData'
import DocumentQuestion from './document-question.vue'
// @ts-expect-error importing js file
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'

import type {
  DocumentData, QuestionMap, ReportSection, Question, CountryRecord
} from '~/types/common/document-report'

// Props
export interface Props {
  countryCode: string
  relatedQuestions?: string[]
  firstNationalReportRecord: CountryRecord
  nationalReportData: DocumentData
}

const props = withDefaults(defineProps<Props>(), {
  relatedQuestions: () => []
})

// Translation Keys
const { mergeLocaleMessage, locale } = useI18n()

const messageGroups = [
  countryProfileT,
  editAbsNationalReportT,
  editNationalReportT,
  viewNationalReportT
]

const nr1Url = computed(() => `/database/${props.firstNationalReportRecord.shortCode}/${props.firstNationalReportRecord.docs[0]?.uniqueIdentifier_s.toUpperCase()}`)

messageGroups.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

// Constants
const publishedDate = computed(() => parseDate(props.firstNationalReportRecord.docs[0]?.rec_date))

const questions = computed(() => props.relatedQuestions
  .map((questionKey: string) => getQuestion(questionKey))
  .filter(doesQuestionExist))

// Methods
function parseDate (dateString: string | undefined): string {
  if (dateString === undefined) { return '' }
  const date = new Date(dateString)
  return `${date.toLocaleString(locale, { day: 'numeric' })} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
}

function getQuestion (questionKey: string): Question {
  const questionMap: QuestionMap = getQuestionMap(questionKey)
  return { values: getQuestionValues(props.nationalReportData, questionMap), data: questionMap }
}

function getQuestionMap (questionKey: string): QuestionMap {
  let question: QuestionMap = { type: '', key: '', options: [], number: '-1', multiple: false }
  absNationalReport1.forEach((section: ReportSection) => {
    if (section.questions === undefined) { return }
    section.questions.forEach((q) => {
      if (q.key === questionKey) {
        question = Object.assign({ key: '', number: '', type: '', multiple: false }, q)
      }
    })
  })
  return question
}

function doesQuestionExist (q: Question): boolean {
  if (typeof q.values[0] !== 'object') { return false }
  return q.values[0].title !== '' && q.data.type !== ''
}
</script>
