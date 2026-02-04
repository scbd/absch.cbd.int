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
        <div
          v-if="typeof legalFrameworkDocument?.government === 'object'"
        >
          <label
            name="government"
            for="government"
            class="question-label px-0 "
          >
            1. {{ t('country') }}
          </label>
          <km-value-ml
            :value="government?.title"
            :locales="[locale]"
          />
        </div>
        <div
          v-if="typeof legalFrameworkDocument?.jurisdiction === 'object'"
        >
          <label
            name="jurisdiction"
            for="jurisdiction"
            class="question-label px-0"
          >
            2. {{ t('jurisdiction') }}
          </label>
          <km-value-ml
            :value="jurisdiction?.title"
            :locales="[locale]"
          />
        </div>
        <div
          v-if="typeof legalFrameworkDocument?.jurisdictionImplementation === 'object'"
        >
          <label
            class="fw-semibold d-flex flex-column"
          >
            <span
              :class="{ inactive: !isNational }"
              class="mb-2 me-auto"
            >
              {{ t('jurisdictionImplementationNational') }}
            </span>
            <span
              :class="{ inactive: isNational }"
              class="mb-1 me-auto"
            >
              {{ t('jurisdictionImplementationSubNational') }}
            </span>
          </label>
          <km-value-ml
            :value="legalFrameworkDocument?.jurisdictionImplementation ?? ''"
            :locales="[locale]"
          />
        </div>

        <document-review
          v-if="legalFrameworkDocument !== undefined"
          :related-questions="relatedQuestions"
          :document-data="legalFrameworkDocument"
          :report-sections="reportSection"
          :locales="[locale]"
        />
        <div>
          <ng
            v-model:ng-model="docHeader.identifier"
            v-vue-ng:view-referenced-records
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, type ModelRef } from 'vue'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
import documentLegend from '~/components/common/document-legend.vue'
import kmValueMl from '~/components/common/km-value-ml.vue'
import documentReview from '~/components/common/document-report/document-review.vue'
import { legalFrameworkOverviewQuestions } from '~/app-data/abs/legal-framework-overview'
import messages from '~/app-text/views/reports/chm/marine-ebsa.json'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import legalFramewordOverviewT from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { LanguageCode } from '~/types/languages'
import type { ETerm } from '~/types/common/documents'
import type { ReportSection } from '~/types/common/document-report'

const { t, mergeLocaleMessage } = useI18n({ messages })
interface Props {
  documentInfo: { body: LegalFrameworkDocument }
  locale: LanguageCode
}

// Translation Keys
const messageGroups = [
  countryProfileT,
  legalFramewordOverviewT
]
messageGroups.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

const props = defineProps<Props>()
const header = {
  identifier: '',
  schema: '',
  languages: []
}

const auth = useAuth()
const thesaurusApi = new ThesaurusApi({ tokenReader: () => auth.token() })

const reportQuestions = legalFrameworkOverviewQuestions(t)
const relatedQuestions: string[] = reportQuestions.map((question) => question.key)
const reportSection: ReportSection[] = [{ questions: reportQuestions, key: 'lfo', title: 'lfo' }]

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = ref(header)
const government = ref()
const jurisdiction = ref()
// Computed
const isNational = computed(() => jurisdiction.value?.name === 'National / Federal')

onMounted(async () => {
  const data: LegalFrameworkDocument = props.documentInfo.body
  legalFrameworkDocument.value = data

  government.value = await getTerm(legalFrameworkDocument.value.government)
  jurisdiction.value = await getTerm(legalFrameworkDocument.value.jurisdiction)
})

async function getTerm (value: ETerm | undefined): Promise<ETerm> {
  const id: string | undefined = value?.identifier
  if (id === undefined) {
    return {
      title: { [props.locale]: '' },
      identifier: '',
      value: ''
    }
  }
  return await thesaurusApi.getTerm(id)
}
</script>
<style scoped>
#Record.legal-framework-overview-review :deep(label) {
  font-size: 15px;
  color: #333;
}
#Record .record-body :deep(legend) {
  font-size: 20px;
}
#Record.legal-framework-overview-review :deep(.km-value) {
  font-size: 15px;
}
</style>
