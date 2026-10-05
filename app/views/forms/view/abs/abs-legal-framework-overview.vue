<template>
  <div
    id="Record"
    class="record"
  >
    <div class="record-body bg-white">
      <document-date :document-info="documentInfo" />

      <section v-if="legalFrameworkDocument?.government">
        <legend>{{ t('generalInformation') }}</legend>
        <div v-if="legalFrameworkDocument?.government">
          <label>{{ t('country') }}</label>
          <div class="km-value">
            <km-term
              :value="legalFrameworkDocument.government"
              :locale="locale"
            />
          </div>
        </div>
      </section>

      <section v-if="legalFrameworkDocument?.jurisdiction || legalFrameworkDocument?.jurisdictionImplementation">
        <legend>{{ t('jurisdictionSectionTitle') }}</legend>
        <div v-if="legalFrameworkDocument?.jurisdiction?.customValue">
          <label class="fw-bold">{{ t('jurisdictionName') }}</label>
          <ng
            v-vue-ng:km-value-ml
            :value="legalFrameworkDocument.jurisdiction.customValue"
            :locales="locale"
          />
        </div>
        <div v-if="legalFrameworkDocument?.jurisdiction">
          <label>{{ t('jurisdiction') }}</label>
          <div class="km-value">
            <km-term
              :value="legalFrameworkDocument.jurisdiction"
              :locale="locale"
            />
          </div>
        </div>
        <div v-if="legalFrameworkDocument?.jurisdictionImplementation">
          <label>{{ t('jurisdictionScopeDescription') }}</label>
          <ng
            v-vue-ng:km-value-ml
            :value="legalFrameworkDocument.jurisdictionImplementation"
            :locales="locale"
          />
        </div>
      </section>

      <section v-if="isAnswered(legalFrameworkDocument?.establishedMeasure)">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('generalAbsMeasuresTitle') }}
        </legend>
        <response-value
          :caption="t('establishedMeasure')"
          :response="legalFrameworkDocument?.establishedMeasure"
          :options="threeWayOptions({ true: t('yesAllCases') })"
          :locale="locale"
        />
      </section>

      <section v-if="isAnswered(legalFrameworkDocument?.agrSubjectToPic)">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('accessToGeneticResourcesTitle') }}
        </legend>
        <response-value
          :caption="t('agrSubjectToPic')"
          :response="legalFrameworkDocument?.agrSubjectToPic"
          :options="threeWayOptions({ true: t('agrSubjectToPicYesAllCases'), trueSome: t('agrSubjectToPicYesSomeCases') })"
          :locale="locale"
        />
        <template v-if="isYesOrSome(legalFrameworkDocument?.agrSubjectToPic)">
          <response-value
            :caption="t('agrCommercialPermitRequired')"
            :response="legalFrameworkDocument?.agrCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.agrCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.agrCommercialPermitRequired)"
            :caption="t('agrCommercialPermitException')"
            :response="legalFrameworkDocument?.agrCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
          <response-value
            :caption="t('agrNonCommercialPermitRequired')"
            :response="legalFrameworkDocument?.agrNonCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.agrNonCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.agrNonCommercialPermitRequired)"
            :caption="t('agrNonCommercialPermitException')"
            :response="legalFrameworkDocument?.agrNonCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
        </template>
      </section>

      <section v-if="isAnswered(legalFrameworkDocument?.iplcPresent) || isAnswered(legalFrameworkDocument?.iplcDomesticLawRecognizesRight)">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('iplcSectionTitle') }}
        </legend>
        <response-value
          :caption="t('iplcPresent')"
          :response="legalFrameworkDocument?.iplcPresent"
          :options="twoWayOptions()"
          :locale="locale"
        />

        <template v-if="isYes(legalFrameworkDocument?.iplcPresent)">
          <h4>{{ t('tkAccessTitle') }}</h4>
          <response-value
            :caption="t('tkSubjectToPic')"
            :response="legalFrameworkDocument?.tkSubjectToPic"
            :options="threeWayOptions()"
            :locale="locale"
          />
          <response-value
            :caption="t('tkCommercialPermitRequired')"
            :response="legalFrameworkDocument?.tkCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.tkCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.tkCommercialPermitRequired)"
            :caption="t('tkCommercialPermitException')"
            :response="legalFrameworkDocument?.tkCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
          <response-value
            :caption="t('tkNonCommercialPermitRequired')"
            :response="legalFrameworkDocument?.tkNonCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.tkNonCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.tkNonCommercialPermitRequired)"
            :caption="t('tkNonCommercialPermitException')"
            :response="legalFrameworkDocument?.tkNonCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
        </template>

        <template v-if="isAnswered(legalFrameworkDocument?.iplcDomesticLawRecognizesRight)">
          <h4>{{ t('iplcGrTitle') }}</h4>
          <response-value
            :caption="t('iplcDomesticLawRecognizesRight')"
            :response="legalFrameworkDocument?.iplcDomesticLawRecognizesRight"
            :options="threeWayOptions()"
            :locale="locale"
          />
        </template>
        <template v-if="isYesOrSome(legalFrameworkDocument?.iplcDomesticLawRecognizesRight)">
          <response-value
            :caption="t('iplcAccessBasedOnPic')"
            :response="legalFrameworkDocument?.iplcAccessBasedOnPic"
            :options="threeWayOptions()"
            :locale="locale"
          />
          <response-value
            :caption="t('iplcCommercialPermitRequired')"
            :response="legalFrameworkDocument?.iplcCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.iplcCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.iplcCommercialPermitRequired)"
            :caption="t('iplcCommercialPermitException')"
            :response="legalFrameworkDocument?.iplcCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
          <response-value
            :caption="t('iplcNonCommercialPermitRequired')"
            :response="legalFrameworkDocument?.iplcNonCommercialPermitRequired"
            :options="twoWayOptions()"
            :locale="locale"
            :no-border="isAnswered(legalFrameworkDocument?.iplcNonCommercialPermitRequired)"
          />
          <response-value
            v-if="isAnswered(legalFrameworkDocument?.iplcNonCommercialPermitRequired)"
            :caption="t('iplcNonCommercialPermitException')"
            :response="legalFrameworkDocument?.iplcNonCommercialPermitException"
            :options="twoWayOptions()"
            :locale="locale"
            nested
          />
        </template>
      </section>

      <section v-if="isAnswered(legalFrameworkDocument?.article8ResearchSupport) || isAnswered(legalFrameworkDocument?.article8Emergencies) || isAnswered(legalFrameworkDocument?.article8FoodSecurity)">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('article8Title') }}
        </legend>
        <response-value
          :caption="t('article8ResearchSupport')"
          :response="legalFrameworkDocument?.article8ResearchSupport"
          :options="threeWayOptions()"
          :locale="locale"
        />
        <response-value
          v-if="isYesOrSome(legalFrameworkDocument?.article8ResearchSupport)"
          :caption="t('article8SimplifiedAccessMeasures')"
          :response="legalFrameworkDocument?.article8SimplifiedAccessMeasures"
          :options="threeWayOptions()"
          :locale="locale"
        />
        <response-value
          :caption="t('article8Emergencies')"
          :response="legalFrameworkDocument?.article8Emergencies"
          :options="threeWayOptions()"
          :locale="locale"
        />
        <response-value
          :caption="t('article8FoodSecurity')"
          :response="legalFrameworkDocument?.article8FoodSecurity"
          :options="threeWayOptions()"
          :locale="locale"
        />
      </section>

      <section v-if="isAnswered(legalFrameworkDocument?.article15Implemented) || isAnswered(legalFrameworkDocument?.article16Implemented) || isAnswered(legalFrameworkDocument?.article17Implemented)">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('complianceTitle') }}
        </legend>
        <response-value
          :caption="t('article15Implemented')"
          :response="legalFrameworkDocument?.article15Implemented"
          :options="threeWayOptions()"
          :locale="locale"
        />
        <response-value
          :caption="t('article16Implemented')"
          :response="legalFrameworkDocument?.article16Implemented"
          :options="threeWayOptions()"
          :locale="locale"
        />
        <response-value
          :caption="t('article17Implemented')"
          :response="legalFrameworkDocument?.article17Implemented"
          :options="threeWayOptions()"
          :locale="locale"
        />
      </section>

      <section v-if="legalFrameworkDocument?.faqs?.length">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('faqTitle') }}
        </legend>
        <div
          :id="faqAccordionId"
          class="accordion"
        >
          <div
            v-for="(faq, index) in legalFrameworkDocument.faqs"
            :key="index"
            class="accordion-item"
          >
            <h3 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${faqAccordionId}-collapse-${index}`"
                aria-expanded="true"
                :aria-controls="`${faqAccordionId}-collapse-${index}`"
              >
                {{ lstring(faq.question) }}
              </button>
            </h3>
            <div
              :id="`${faqAccordionId}-collapse-${index}`"
              class="accordion-collapse collapse show"
            >
              <div class="accordion-body">
                {{ lstring(faq.answer) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="legalFrameworkDocument?.additionalInformation || legalFrameworkDocument?.additionalDocuments?.length">
        <legend class="border-bottom pb-1 mb-3">
          {{ t('additionalInfoTitle') }}
        </legend>
        <div v-if="legalFrameworkDocument?.additionalInformation">
          <label>{{ t('additionalInformation') }}</label>
          <ng
            v-vue-ng:km-value-ml
            :value="legalFrameworkDocument.additionalInformation"
            :locales="locale"
            html
            km-pre
          />
        </div>
        <div v-if="legalFrameworkDocument?.additionalDocuments?.length">
          <label>{{ t('additionalDocuments') }}</label>
          <div class="km-value">
            <ng
              v-vue-ng:km-link-list
              :value="legalFrameworkDocument.additionalDocuments"
              :locale="locale"
            />
          </div>
        </div>
      </section>

      <div>
        <ng
          v-model:ng-model="docHeader.identifier"
          v-vue-ng:view-referenced-records
        />
      </div>
    </div>
    <ng v-vue-ng:document-metadata-vue :document-info="documentInfo" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type ModelRef } from 'vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
// @ts-expect-error importing js file
import kmTerm from '~/components/km/KmTerm.vue'
import messages from '~/app-text/views/forms/view/abs/legal-framework-overview.json'
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { lstring } from '~/components/kb/filters'
import type { LegalFrameworkDocument, NrResponse } from '~/types/components/legal-framework-overview'
import responseValue from '~/components/forms/view/abs/lfo/legal-framework-overview-response-value.vue'
import '~/views/directives/document-metadata-vue-directive'

const { t } = useI18n({ messages })
interface Props {
  documentInfo: { body: LegalFrameworkDocument }
  locale: string
}
const props = defineProps<Props>()
const header = {
  identifier: '',
  schema: '',
  languages: []
}

const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const docHeader = ref(header)
const faqAccordionId = `faq-accordion-${Math.random().toString(36).slice(2)}`

onMounted(() => {
  ({ documentInfo: { body: legalFrameworkDocument.value } } = props)
})

// Methods
function isYes (response?: NrResponse) {
  return response?.value === 'true'
}

function isYesOrSome (response?: NrResponse) {
  return response?.value === 'true' || response?.value === 'true.some'
}

function isAnswered (response?: NrResponse) {
  return response?.value !== undefined
}

function twoWayOptions () {
  return [
    { value: 'true', title: t('yes') },
    { value: 'false', title: t('no') }
  ]
}

// labels overrides the 'true'/'true.some' wording for questions whose doc text differs from the
// generic "Yes"/"Yes, to some extent" (e.g. establishedMeasure's "Yes, all measures are in place").
function threeWayOptions (labels?: { true?: string, trueSome?: string }) {
  return [
    { value: 'true', title: labels?.true ?? t('yes') },
    { value: 'true.some', title: labels?.trueSome ?? t('yesSomeCases') },
    { value: 'false', title: t('no') }
  ]
}
</script>
<style scoped>
.accordion-button,
.accordion-button:not(.collapsed) {
  font-size: 12px;
  font-weight: 500;
  color: #666;
}
</style>
