<template>
  <div
    class="panel-body p-0"
  >
    <div
      v-for="questionSchema in reportSection.questions"
      :key="`${reportSection.title} ${questionSchema.key}`"
      style="border:1px solid #eee;margin:5px"
      class="row py-3"
      :class="{'disabled': getIsDisabled(questionSchema), 'isLegend': getIsLegend(questionSchema) }"
    >
      <div v-if="getIsReportSection(questionSchema)">
        <div
          v-for="subQuestionSchema in questionSchema.questions"
          :key="`${reportSection.title} ${questionSchema.key} ${subQuestionSchema.key}`"
          style="border:1px solid #eee; margin:10px"
          class="row py-3"
          :class="{'disabled': !document[subQuestionSchema.key]}"
        >
          <div ng-if="vueComponent">
            <DocumentQuestion
              :question="getQuestion(subQuestionSchema as QuestionMap)"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <DocumentQuestion
          :question="getQuestion(questionSchema)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DocumentQuestion from './document-question.vue'
import { getQuestionValues } from './getQuestionData'
import viewNationalReportT from '~/app-text/views/forms/view/view-national-report.json'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type {
  Question, QuestionMap, DocumentData, ReportSection
} from '~/types/common/document-report'

const { mergeLocaleMessage } = useI18n()
Object.entries(viewNationalReportT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const props = defineProps<{
  document: DocumentData,
  reportSection: ReportSection,
}>()

function getIsReportSection (value: QuestionMap | ReportSection): value is ReportSection {
  const map: ReportSection = Object.assign({ questions: undefined, title: '', key: '' }, value)
  return Array.isArray(map.questions)
}

function getQuestion (questionSchema: QuestionMap): Question {
  return { values: getQuestionValues(props.document, questionSchema), data: questionSchema }
}

function getIsLegend (questionSchema: QuestionMap | ReportSection): boolean {
  const map: QuestionMap = Object.assign({
    key: '',
    number: '',
    type: '',
    multiple: false
  }, questionSchema)

  return map.type === 'legend'
}

function getIsDisabled (questionSchema: QuestionMap | ReportSection): boolean {
  if (getIsReportSection(questionSchema)) {
    return false
  }
  return typeof props.document[questionSchema.key] !== 'object' && questionSchema.type !== 'legend'
}
</script>
