<!--
RelatedInformationFromNr1

Related information from the first national report if the country is missing documents in their report.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <div
    v-if="questions.length > 0"
    id="country-summary"
    class="px-4 py-3 mt-3 bg-white"
  >
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

    <div class="d-flex flex-column gap-2">
      <div
        v-for="questionKey in questions"
        :key="questionKey"
      >
        <DocumentQuestion
          :question-key="questionKey"
          :question-map="getQuestionMap(questionKey)"
          :report-data="nationalReportData"
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
import DocumentQuestion from '../common/document-question/document-question.vue'
// @ts-expect-error importing js file
import { useRealm } from '../../services/composables/realm.js'
// @ts-expect-error importing js file
import { analyzerMapping } from '~/app-data/report-analyzer-mapping.js'
// @ts-expect-error importing js file
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import type { DocumentData, QuestionMap, ReportSection } from '~/types/common/document-report'
import type { CountryRecord, AnalyzerMap, RelatedQuestionsList } from '~/types/components/related-information-from-nr1'

// Props
export interface Props {
  countryRecords?: CountryRecord[]
  code: string
}
const props = withDefaults(defineProps<Props>(), {
  countryRecords: () => []
})

// Translation Keys
const { mergeLocaleMessage, locale } = useI18n()

const messages = [
  countryProfileT,
  editAbsNationalReportT,
  editNationalReportT
]
messages.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})
Object.entries(countryProfileT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

// Constants
const { realm, notificationTemplateFolder } = useRealm()

// Determines what information will be shown from the NR1 if
// the country is missing document data.
const relatedQuestions: RelatedQuestionsList[] = [
  {
    questions: ['Q003'],
    key: 'focalPoint' // If No ABS-NFP
  },
  {
    questions: ['Q004', 'Q004_a', 'Q004_b'],
    key: 'authority' // If No CNA
  },
  {
    questions: ['Q005', 'Q005_a', 'Q005_b'],
    key: 'absCheckpoint' // If No CP
  },
  {
    questions: ['Q007', 'Q007_a'],
    key: 'measure' // If No MSR
  },
  {
    questions: ['Q010', 'Q010_a'],
    key: 'absCheckpointCommunique' // If No PROs
  },
  {
    questions: ['Q011'],
    key: 'authority' // If No CNA
  },
  {
    questions: ['Q012', 'Q012_a', 'Q012_b'],
    key: 'absPermit' // If No IRCC
  },
  {
    questions: ['Q013', 'Q013_a'],
    key: 'absNationalModelContractualClause' // If No NMCC
  },
  {
    questions: ['Q021a', 'Q021_b', 'Q021_c'],
    key: 'absCheckpointCommunique' // If No CPC
  }
]

// Computed Properties
const firstNationalReportRecord = computed(() => props.countryRecords
  .find(countryRecord => countryRecord.shortCode === 'NR1'))
const publishedDate = computed(() => parseDate(firstNationalReportRecord.value?.docs[0]?.rec_date))
const nr1Url = computed(() => `/database/${firstNationalReportRecord.value?.shortCode}/${firstNationalReportRecord.value?.docs[0]?.uniqueIdentifier_s.toUpperCase()}`)

// Refs
const questions: Ref<string[]> = ref([])
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
  const filteredQuestionsList = relatedQuestions
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
  const q = { government_REL: { $in: [props.code.toLowerCase()] } }

  // Fetch the NR1
  // https://absch.cbddev.xyz/api/v2019/report-analyzer/abs-national-report-1
  const nr1 = await axios.get(map.dataUrl, { params: { q, realm, f } })
  const { data } = nr1

  const [nrData] = data

  if (nrData === undefined) { return }
  nationalReportData.value = nrData

  questions.value = filteredQuestionsList
})

// Methods
function parseDate (dateString: string | undefined): string {
  if (dateString === undefined) { return '' }
  const date = new Date(dateString)
  return `${date.toLocaleString(locale, { day: 'numeric' })} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
}

function getQuestionMap (questionKey: string): QuestionMap {
  let question: QuestionMap = { type: '', key: '', options: [], number: '-1', multiple: false }
  absNationalReport1.forEach((section: ReportSection) => {
    section.questions.forEach((q) => {
      if (q.key === questionKey) {
        question = q
      }
    })
  })
  return question
}
</script>related-informa
