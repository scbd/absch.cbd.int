<!--
InformationFromNr1

Information from the first national report based on a list of questions.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <div
    v-if="questions.length > 0"
    id="country-summary"
    class="px-4 py-3 mt-3 bg-white"
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
import { ref, computed, onBeforeMount, withDefaults, type Ref } from 'vue'
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import editAbsNationalReportT from '~/app-text/views/forms/edit/abs/edit-abs-national-report.json'
import editNationalReportT from '~/app-text/views/forms/edit/abs/edit-national-report-1.json'
import viewNationalReportT from '~/app-text/views/forms/view/view-national-report.json'
import { getQuestionValues } from './getQuestionData'
import DocumentQuestion from './document-question.vue'
// @ts-expect-error importing js file
import { useRealm } from '~/services/composables/realm.js'
// @ts-expect-error importing js file
import { analyzerMapping } from '~/app-data/report-analyzer-mapping.js'
// @ts-expect-error importing js file
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import type {
  DocumentData, QuestionMap, ReportSection, Question,
  CountryRecord, AnalyzerMap, RelatedQuestionsList
} from '~/types/common/document-report'

// Props
export interface Props {
  countryRecords?: CountryRecord[]
  countryCode: string
  relatedQuestions: RelatedQuestionsList[]
}
const props = withDefaults(defineProps<Props>(), {
  countryRecords: () => []
})

// Translation Keys
const { mergeLocaleMessage, locale } = useI18n()

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

// Constants
const { realm, notificationTemplateFolder } = useRealm()

// Computed Properties
const firstNationalReportRecord = computed(() => props.countryRecords
  .find(countryRecord => countryRecord.shortCode === 'NR1'))
const publishedDate = computed(() => parseDate(firstNationalReportRecord.value?.docs[0]?.rec_date))
const nr1Url = computed(() => `/database/${firstNationalReportRecord.value?.shortCode}/${firstNationalReportRecord.value?.docs[0]?.uniqueIdentifier_s.toUpperCase()}`)

// Refs
const questions: Ref<Question[]> = ref([])
const nationalReportData: Ref<DocumentData> = ref({})

// Event Hooks
onBeforeMount(async () => {
  const realmKey = notificationTemplateFolder.toLowerCase()
  const map = analyzerMapping[realmKey]
    .find((map: AnalyzerMap) => map.type === 'absNationalReport1')

  const getCountryRecord = (key: string): CountryRecord | undefined => props.countryRecords
    .find(countryRecord => countryRecord.key === key)

  // Get question keys that will be displayed from the NR1 based on the documents
  // missing from the current country's report.
  const filteredQuestionsList = props.relatedQuestions
    .filter((map) => (getCountryRecord(map.key)?.docs ?? []).length < 1)
    .map(map => map.questions)
    .flat()

  // Params to fetch NR1 for the current country from the server.
  // Only get fetch relevant questions from the NR1 data on the server.
  const f = filteredQuestionsList.reduce((acc: Record<string, number>, value: string) => {
    const obj = acc
    obj[value] = 1
    return obj
  }, {})
  const q = { government_REL: { $in: [props.countryCode.toLowerCase()] } }

  // Fetch the NR1
  // https://absch.cbddev.xyz/api/v2019/report-analyzer/abs-national-report-1
  const nr1 = await axios.get(map.dataUrl, { params: { q, realm, f } })
  const { data } = nr1

  const [nrData] = data

  if (nrData === undefined) { return }
  nationalReportData.value = nrData

  questions.value = filteredQuestionsList
    .map((questionKey: string) => getQuestion(questionKey))
    .filter(doesQuestionExist)
})

// Methods
function parseDate (dateString: string | undefined): string {
  if (dateString === undefined) { return '' }
  const date = new Date(dateString)
  return `${date.toLocaleString(locale, { day: 'numeric' })} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
}

function getQuestion (questionKey: string): Question {
  const questionMap: QuestionMap = getQuestionMap(questionKey)
  return { values: getQuestionValues(nationalReportData.value, questionMap), data: questionMap }
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
