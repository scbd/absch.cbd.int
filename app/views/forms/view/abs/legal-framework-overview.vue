<template>
  <div
    id="Record"
    class="record legal-framework-overview-review"
  >
    <div
      class="record-body bg-white pb-4 d-flex flex-column"
    >
      <document-date
        :document-info="documentInfo"
        class="d-flex justify-content-end"
      />
      <div class="bg-white d-flex flex-column gap-2">
        <div
          v-if="showGeneralInformation"
          class="d-flex flex-column gap-2"
        >
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
              {{ t('country') }}
            </label>
            <km-value-ml
              :value="''"
              :locales="[locale]"
            >
              <km-term
                :value="legalFrameworkDocument.government"
                :locale="locale"
              />
            </km-value-ml>
          </div>
          <!-- Jurisdiction -->
          <div>
            <div
              v-if="typeof legalFrameworkDocument?.jurisdiction === 'object'"
              data-question-type="option"
            >
              <label
                name="jurisdiction"
                for="jurisdiction"
                class="question-label px-0"
              >
                {{ t('jurisdiction') }}
              </label>
              <km-value-ml
                :value="''"
                :locales="[locale]"
              >
                <km-term
                  :value="legalFrameworkDocument.jurisdiction"
                  :locale="locale"
                />
                <span
                  v-if="!isNational && legalFrameworkDocument.jurisdiction.customValue !== undefined"
                  class="ms-1"
                >
                  {{ `(${lstring(legalFrameworkDocument.jurisdiction.customValue, locale)})` }}
                </span>
              </km-value-ml>
            </div>
            <div
              v-if="typeof legalFrameworkDocument?.jurisdictionImplementation === 'object'"
              data-question-type="option"
            >
              <label
                class="fw-semibold d-flex flex-column question-label"
              >
                <span
                  class="mt-1 me-auto"
                >
                  {{ isNational ? t('jurisdictionImplementationNational') : t('jurisdictionImplementationSubNational') }}
                </span>
              </label>
              <km-value-ml
                :value="legalFrameworkDocument?.jurisdictionImplementation ?? ''"
                :locales="[locale]"
              />
            </div>
          </div>
        </div>

        <!-- Radio Questions -->
        <div v-if="legalFrameworkDocument !== undefined">
          <document-review
            :document-data="legalFrameworkDocument"
            :report-sections="legalFrameworkOverviewQuestions(t)"
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
    <ng
      v-if="legalFrameworkDocument !== undefined"
      v-vue-ng:document-metadata-vue
      :document-info="documentInfo"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, type ModelRef } from 'vue'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
// @ts-expect-error importing js file
import kmTerm from '~/components/km/KmTerm.vue'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import documentLegend from '~/components/common/document-legend.vue'
import kmValueMl from '~/components/common/km-value-ml.vue'
import documentReview from '~/components/common/document-report/document-review.vue'
import { legalFrameworkOverviewQuestions } from '~/app-data/abs/legal-framework-overview'
import { THESAURUS_TERMS } from '~/constants/thesaurus'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { LanguageCode } from '~/types/languages'

const { t } = useI18n({ messages })
interface Props {
  documentInfo: {
    body: LegalFrameworkDocument
    identifier: string
    documentID: string
    type: string
  }
  locale: LanguageCode
}

const props = defineProps<Props>()
const header = {
  identifier: '',
  schema: '',
  languages: []
}

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = computed(() => props.documentInfo.body.header ?? header)
// Computed
const isNational = computed(() => legalFrameworkDocument.value?.jurisdiction?.identifier === THESAURUS_TERMS.NATIONAL_JURISDICTION)
const showGeneralInformation = computed(() => legalFrameworkDocument.value?.jurisdiction !== undefined ||
  legalFrameworkDocument.value?.government !== undefined ||
  legalFrameworkDocument.value?.establishedMeasure !== undefined
)

onMounted(() => {
  const data: LegalFrameworkDocument = props.documentInfo.body
  legalFrameworkDocument.value = data
})
</script>
<style scoped>
#Record.legal-framework-overview-review :deep(div[data-key*="Article"]) > legend {
  margin-top: 0px;
  padding-top: 8px;
}
#Record :deep(.km-value) {
  margin-bottom: 0px;
}
#Record :deep(label.question-label + div) {
  margin-top: 2px;
}
</style>
