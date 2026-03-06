<template>
  <div
    id="Record"
    class="record legal-framework-overview-review pb-4"
  >
    <div
      class="record-body bg-white"
    >
      <div class="px-4 bg-white d-flex flex-column gap-1">
        <document-date
          :document-info="documentInfo"
        />
        <div
          v-if="showGeneralInformation"
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
              1. {{ t('country') }}
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
            <km-value-ml
              :value="''"
              :locales="[locale]"
            >
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
            </km-value-ml>
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
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, type ModelRef } from 'vue'
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
// @ts-expect-error importing js file
import { THESAURUS_TERMS } from '~/constants/thesaurus'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { LanguageCode } from '~/types/languages'

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

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = ref(header)
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
