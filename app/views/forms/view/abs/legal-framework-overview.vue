<template>
  <div
    id="Record"
    class="record legal-framework-overview-review"
  >
    <div
      class="record-body bg-white"
    >
      <div class="px-4 bg-white d-flex flex-column gap-3">
        <document-date
          :document-info="documentInfo"
        />
        <document-legend
          :title="t('generalInformation')"
          class="pt-3"
        />
        <div>
          <label
            name="government"
            for="government"
            class="question-label px-0 "
          >
            {{ t('country') }}
          </label>
          <km-value-ml
            :value="legalFrameworkDocument?.government?.identifier ?? ''"
            :locales="legalFrameworkDocument?.header.languages ?? []"
          />
        </div>
        <div>
          <label
            name="jurisdiction"
            for="jurisdiction"
            class="question-label px-0"
          >
            {{ t('jurisdiction') }}
          </label>
          <km-value-ml
            :value="legalFrameworkDocument?.jurisdiction?.identifier ?? ''"
            :locales="legalFrameworkDocument?.header.languages ?? []"
          />
        </div>
        <div>
          <label
            name="jurisdictionImplementation"
            for="jurisdictionImplementation"
            class="question-label px-0"
          >
            <div class="fw-bold mb-1">{{ t('jurisdictionImplementationNational') }}</div>
            <div class="fw-bold mb-1">{{ t('jurisdictionImplementationSubNational') }}</div>
          </label>
          <km-value-ml
            :value="legalFrameworkDocument?.jurisdictionImplementation ?? ''"
            :locales="legalFrameworkDocument?.header.languages ?? []"
          />
        </div>
      </div>

      <document-review
        v-if="legalFrameworkDocument !== undefined"
        :related-questions="relatedQuestions"
        :national-report-data="legalFrameworkDocument"
        :questions-map="[ { questions: reportQuestions, key: 'lfo', title: 'lfo' }]"
        class="mt-2"
      >
        <slot name="header" />
      </document-review>
      <div>
        <ng
          v-model:ng-model="docHeader.identifier"
          v-vue-ng:view-referenced-records
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type ModelRef } from 'vue'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
import documentLegend from '~/components/common/document-legend.vue'
import kmValueMl from '~/components/common/km-value-ml.vue'
import documentReview from '~/components/common/document-report/document-review.vue'
import { legalFrameworkOverviewQuestions } from '~/app-data/abs/legal-framework-overview'
import messages from '~/app-text/views/reports/chm/marine-ebsa.json'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import legalFramewordOverviewT from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'

const { t, mergeLocaleMessage } = useI18n({ messages })
interface Props {
  documentInfo: { body: LegalFrameworkDocument }
  locale: string
}

Object.entries(legalFramewordOverviewT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const props = defineProps<Props>()
const header = {
  identifier: '',
  schema: '',
  languages: []
}

const reportQuestions = legalFrameworkOverviewQuestions(t)
const relatedQuestions: string[] = reportQuestions.map((question) => question.key)

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = ref(header)

onMounted(() => {
  const data: LegalFrameworkDocument = props.documentInfo.body
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value !== 'object' || value === null) {
      const questionMapIndex = reportQuestions.findIndex((q) => q.key === key)
      if (reportQuestions[questionMapIndex] === undefined) { return }
      reportQuestions[questionMapIndex].type = 'lstring'
    }
  })
  legalFrameworkDocument.value = data
  console.log('legalFrameworkDocument.value', legalFrameworkDocument.value)
})
</script>
<style scoped>
.legal-framework-overview-review {
  font-size: 1.2em;
}
</style>
