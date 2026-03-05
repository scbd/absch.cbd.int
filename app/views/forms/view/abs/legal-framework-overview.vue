<template>
  <div
    id="Record"
    class="record legal-framework-overview-review"
  >
    <div
      class="record-body bg-white"
    >
      <div class="px-4 bg-white d-flex flex-column gap-1">
        <document-date
          :document-info="documentInfo"
        />
        <document-legend
          :title="t('generalInformation')"
          class="pt-3"
          data-question-type="legend"
        />
        <!-- Government -->
        <div
          v-if="typeof legalFrameworkDocument?.government === 'object'"
          data-question-type="option"
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

        <!-- Jurisdiction -->
        <div
          v-if="typeof legalFrameworkDocument?.jurisdiction === 'object'"
          data-question-type="option"
        >
          <label
            name="jurisdiction"
            for="jurisdiction"
            class="question-label px-0"
          >
            2. {{ t('jurisdiction') }}
          </label>
          <ng

            :value="legalFrameworkDocument.jurisdiction"
            :locale="locale"
          />
          <div
            class="input-group"
          >
            <div
              class="form-control km-value km-value-ml-div km-value-ml-html"
              aria-describedby="basic-addon1"
            >
              <span>
                <km-term
                  :value="legalFrameworkDocument.jurisdiction"
                  :locale="locale"
                />
                <span
                  v-if="!isNational"
                  class="ms-1"
                >
                  {{ `(${lstring(legalFrameworkDocument.jurisdiction.customValue, locale)})` }}
                </span>
              </span>
            </div>
            <span
              id="basic-addon1"
              class="input-group-text"
              style="cursor: default"
            >
              {{ locale.toUpperCase() }}
            </span>
          </div>
        </div>
        <div
          v-if="typeof legalFrameworkDocument?.jurisdictionImplementation === 'object'"
          data-question-type="option"
        >
          <label
            class="fw-semibold d-flex flex-column"
          >
            <span
              class="mb-1 me-auto"
            >
              {{ isNational ? t('jurisdictionImplementationNational') : t('jurisdictionImplementationSubNational') }}
            </span>
          </label>
          <km-value-ml
            :value="legalFrameworkDocument?.jurisdictionImplementation ?? ''"
            :locales="[locale]"
          />
        </div>

        <!-- Radio Questions -->
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
// @ts-expect-error importing js file
import kmTerm from '~/components/km/KmTerm.vue'
import documentLegend from '~/components/common/document-legend.vue'
import kmValueMl from '~/components/common/km-value-ml.vue'
import documentReview from '~/components/common/document-report/document-review.vue'
import { legalFrameworkOverviewQuestions, isQuestion, type Legend, type DocQuestion } from '~/app-data/abs/legal-framework-overview'
// @ts-expect-error importing js file
import { THESAURUS_TERMS } from '~/constants/thesaurus'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { LanguageCode } from '~/types/languages'
import type { ETerm } from '~/types/common/documents'
import type { ReportSection } from '~/types/common/document-report'

const { t } = useI18n({ messages })
interface Props {
  documentInfo: { body: LegalFrameworkDocument }
  locale: LanguageCode
}

const props = defineProps<Props>()
const header = {
  identifier: '',
  schema: '',
  languages: []
}

const auth = useAuth()
const thesaurusApi = new ThesaurusApi({ tokenReader: () => auth.token() })

const reportQuestions = legalFrameworkOverviewQuestions(t)
  .reduce((acc: Array<DocQuestion | Legend>, question) => {
    const q = question

    acc.push(q)

    if (!isQuestion(q)) { return acc }

    if (!Array.isArray(q.questions)) { return acc }
    return [...acc, ...q.questions]
  }, [])

const relatedQuestions: string[] = reportQuestions.map((question) => question.key)
const reportSection: ReportSection[] = [{ questions: reportQuestions, key: 'lfo', title: 'lfo' }]

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = ref(header)
const government = ref()
// Computed
const isNational = computed(() => legalFrameworkDocument.value?.jurisdiction?.identifier === THESAURUS_TERMS.NATIONAL_JURISDICTION)

onMounted(async () => {
  const data: LegalFrameworkDocument = props.documentInfo.body
  legalFrameworkDocument.value = data

  government.value = await getTerm(legalFrameworkDocument.value.government)
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
#Record.legal-framework-overview-review :deep(div[data-key*="Article"]) > legend {
  margin-top: 0px;
}

/* Only show legend when there are answered questions underneath it. */
.legal-framework-overview-review :deep(*[data-question-type="legend"]) {
  display: none;
}

.legal-framework-overview-review :deep(*[data-question-type="legend"]:has(+ *[data-question-type="option"], + .document-review > * [data-question-type="option"]:first-child)),
.legal-framework-overview-review :deep(*[data-key="benefitSharing"]:has(~ *[data-key*="Article"] + *[data-question-type="option"])) {
  display: initial;
}
</style>
