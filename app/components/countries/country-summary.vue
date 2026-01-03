<template>
  <div
    id="country-summary"
    class="px-4 py-3 bg-white"
  >
    <h3 class="text-dark mb-2">
      {{ $t('relatedInformation') }}
      <a class="text-primary"> {{ $t('firstNR') }} </a>
      {{ $t('publishedOn') }}
    </h3>

    <div
      v-for="question in questions"
      :key="question.title"
      class="mt-1"
    >
      <label
        class="mb-1"
        name="generalQuestions6Title"
      >
        {{ question.title }}
      </label>
      <div class="form-control km-value km-value-ml-div ng-binding ng-scope">
        {{ question.value }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import editAbsNationalReportT from '~/app-text/views/forms/edit/abs/edit-abs-national-report.json'
import editNationalReportT from '~/app-text/views/forms/edit/abs/edit-national-report-1.json'
// @ts-expect-error importing js file
import { useRealm } from '../../services/composables/realm.js'
// @ts-expect-error importing js file
import { analyzerMapping } from '~/app-data/report-analyzer-mapping.js'
// @ts-expect-error importing js file
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { realm, notificationTemplateFolder } = useRealm()

const { mergeLocaleMessage, t } = useI18n()

interface Option {
  value: string,
  title: string,
  type: string,
  caption: string
}

interface Question {
  key: string
  number: string
  type: string
  title?: string
  options: Option[]
}

interface Section {
  questions: Question[]
}

interface AnalyzerMap {
  type: string
  dataUrl: string
}
interface QuestionData { value: string, title: string }

type NationalReportData = Record<string, { value: string }>


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

const props = defineProps({
  countryRecords: {
    default: () => ({}),
    type: Object
  }
})

const nationalReportData: Ref<NationalReportData> = ref({})
const questionsMap = [
  // No ABS-NFP
  // {
  //   isShowing: () => {},
  //   questions:
  // },
  ['Q003'],
  // No CNA
  ['Q004', 'Q004a', 'Q004b', 'Q011'],
  // No CP
  ['Q005', 'Q005a', 'Q005b'],
  // No MSR
  ['Q007', 'Q007a'],
  // No CPC
  ['Q021a', 'Q021b', 'Q021c'],
  // No PROs
  ['Q010', 'Q010a'],
  // No IRCC
  ['Q012', 'Q012a', 'Q012b'],
  // No NMCC
  ['Q013', 'Q013a']
]
const questions: Ref<QuestionData[]> = ref([])

onBeforeMount(async () => {
  console.log('country records', props.countryRecords)
  const realmKey = notificationTemplateFolder.toLowerCase()

  const map = analyzerMapping[realmKey]
    .find((map: AnalyzerMap) => map.type === 'absNationalReport1')
  const q = { government_REL: { $in: ['az', 'bh'] } }

  // https://absch.cbddev.xyz/api/v2019/report-analyzer/abs-national-report-1
  const firstNationalReport = await axios.get(map.dataUrl, { params: { q, realm } })
  const { data } = firstNationalReport
  const [nrData] = data
  nationalReportData.value = nrData

  questions.value = questionsMap.flat()
    .map((questionKey: string) => ({ value: getQuestionValue(questionKey), title: getQuestionTitle(questionKey) }))
    .filter((q: QuestionData) => q.value !== '' && q.title !== '')

  console.log('data', data)
  console.log('first national report', firstNationalReport)
})

// Methods
function getQuestion (questionKey: string): Question {
  // f={"Q003":1,"Q004":1,"Q004_a":1,"Q004_b":1,"Q005":1,"Q005_a":1,"Q005_b":1,"Q006":1,"documentId":1,"government":1}&q={"government_REL":{"$in":["az","bh"]}}&realm=ABS-DEV
  let question: Question = { type: '', key: '', options: [] }
  absNationalReport1.forEach((section: Section) => {
    section.questions.forEach((q) => {
      if (q.key === questionKey) {
        question = q
      }
    })
  })
  return question
}

function getQuestionTitle (questionKey: string): string {
  const question: Question = getQuestion(questionKey)
  return `${question.number}. ${t(question.title ?? '')}`
}

function getQuestionValue (questionKey: string): string {
  const { value: { [questionKey]: questionData } } = nationalReportData
  const questionValue = typeof questionData?.value === 'string' ? questionData.value : ''
  console.log('questionValue', questionValue)
  console.log('nationalReportData', nationalReportData.value)
  console.log('value', nationalReportData.value[questionKey])

  const question = getQuestion(questionKey)
  console.log('question', question)

  if (question.type === 'option') {
    const selectedOption = question.options
      .find((option: Option) => {
        const { value: optionValue } = option
        return optionValue === questionValue
      })
    console.log('selectedOption', selectedOption)

    console.log('selectedOption?.title', selectedOption?.title)
    return t(selectedOption?.title ?? '')
  }
  console.log('questionValue', questionValue)
  return t(questionValue)
}
</script>
