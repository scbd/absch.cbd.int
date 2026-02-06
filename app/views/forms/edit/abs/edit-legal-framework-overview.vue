<template>
  <div
    v-if="legalFrameworkDocument?.header"
    class="edit-legal-framework-overview"
  >
    <section class="panel">
      <div class="panel-body mb-5">
        <div class="row">
          <div class="col-xs-12">
            <document-legend
              :title="t('generalInformation')"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <ng
              v-vue-ng:km-control-group
              name="languages"
              required
              :caption="t('languageToPublish')"
              class="border border-1 p-2"
            >
              <ng
                v-model:ng-model="legalFrameworkDocument.header.languages"
                v-vue-ng:km-form-languages
                multiple
                required
              />
            </ng>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <ng
              v-vue-ng:km-control-group
              required="true"
              name="government"
              :caption="`1. ${t('country')}`"
              class="form-group--bold border border-1 p-2"
            >
              <ng
                v-model:ng-model="legalFrameworkDocument.government"
                v-vue-ng:afc-autocomplete
                :selectbox="true"
                :required="true"
                :source="countries"
                :filter="genericFilter"
                :mapping="genericMapping"
                :placeholder="t('selectCountry')"
                name="government"
                :ng-disabled="userHasGovernment"
              />
            </ng>
          </div>
        </div>

        <div
          class="row"
        >
          <div class="col-xs-12">
            <div
              class="document-question border border-1 p-2"
            >
              <ng
                v-vue-ng:km-control-group
                required="true"
                name="jurisdiction"
                :caption="`2. ${t('jurisdiction')}`"
                class="form-group--bold mb-2"
              >
                <div class="ps-1">
                  <div
                    v-for="option in jurisdictions"
                    :key="option.identifier"
                    class="d-flex flex-column"
                  >
                    <div
                      class="radio-option"
                    >
                      <input
                        :id="`jurisdictions-option-${option.identifier}`"
                        v-model="legalFrameworkDocument.jurisdiction"
                        type="radio"
                        :value="{ identifier: option.identifier }"
                        :name="lstring(option.value)"
                        class="me-1"
                      >
                      <label
                        :for="`jurisdictions-option-${option.identifier}`"
                        class="radio-inline"
                      >
                        {{ option.title }}
                      </label>
                    </div>
                    <ng
                      v-if="!isNational && option.identifier === legalFrameworkDocument.jurisdiction?.identifier"
                      v-vue-ng:km-control-group
                      :caption="t('jurisdictionCustomValue')"
                      required="true"
                      name="jurisdiction.customValue"
                      class="ms-3 my-1 hidden-label d-flex flex-column"
                    >
                      <ng
                        id="jurisdiction-custom-value"
                        v-model:ng-model="legalFrameworkDocument.jurisdiction.customValue"
                        v-vue-ng:km-textbox-ml
                        :locales="legalFrameworkDocument.header.languages"
                        :placeholder="jurisdictionNamePlaceholder"
                        name="custom-value"
                      />
                    </ng>
                  </div>
                </div>
              </ng>

              <label
                class="fw-semibold d-flex flex-column"
              >
                <span
                  class="mb-2 me-auto"
                  :class="{ inactive: !isNational && isJurisdictionDefined }"
                >
                  {{ t('jurisdictionImplementationNational') }}
                </span>
                <span
                  class="me-auto"
                  :class="{ inactive: isNational && isJurisdictionDefined }"
                >
                  {{ t('jurisdictionImplementationSubNational') }}
                </span>
              </label>
              <ng
                v-vue-ng:km-control-group
                required
                name="jurisdictionImplementation"
                :caption="t('jurisdictionImplementation')"
                class="mb-2 d-flex flex-column hidden-label"
              >
                <ng
                  v-model:ng-model="legalFrameworkDocument.jurisdictionImplementation"
                  v-vue-ng:km-textbox-ml
                  :locales="legalFrameworkDocument.header.languages"
                  name="jurisdictionImplementation"
                />
              </ng>
            </div>
          </div>
        </div>

        <!-- Dynamic Questions -->
        <div
          v-for="question in documentQuestions"
          :key="question.key"
          class="row"
        >
          <div
            v-if="isQuestion(question)"
            class="col-xs-12"
          >
            <div
              class="document-question border border-1 p-2"
              :class="{ 'inactive pe-none': isQuestionDisabled(question) }"
            >
              <ng
                v-vue-ng:km-control-group
                :required="question.mandatory"
                :name="question.key"
                :caption="`${question.number}. ${question.title}`"
                :class="{ 'form-group--bold': question.bold }"
              >
                <div class="open-box">
                  <ng
                    v-model:ng-model="legalFrameworkDocument[question.key]"
                    v-vue-ng:nr-yes-no
                    :ng-change="typeof question.onChange === 'function' ? question.onChange() : () => {}"
                    :question="question"
                    :locales="legalFrameworkDocument.header.languages"
                    :name="question.key"
                    :info-label="`${question.key}.additionalInformation`"
                    :required="question.mandatory"
                    class="ps-1"
                  />
                </div>
              </ng>

              <!-- SubQuestion -->
              <div class="open-box">
                <ng
                  v-for="subQuestion in question.questions"
                  :key="subQuestion.key"
                  v-vue-ng:km-control-group
                  :name="subQuestion.key"
                  :caption="`${subQuestion.number}. ${subQuestion.title}`"
                  :required="subQuestion.mandatory"
                  class="mt-3"
                  :class="{ 'form-group--bold': question.bold }"
                >
                  <ng
                    v-model:ng-model="legalFrameworkDocument[subQuestion.key]"
                    v-vue-ng:nr-yes-no
                    :required="subQuestion.mandatory"
                    :question="subQuestion"
                    :locales="legalFrameworkDocument.header.languages"
                    :name="subQuestion.key"
                    :info-label="`${subQuestion.key}.additionalInformation`"
                    class="ps-1"
                  />
                </ng>
              </div>
            </div>
          </div>
          <div
            v-else
            class="col-xs-12"
          >
            <document-legend
              :title="question.title ?? ''"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, computed, ref, type Ref, type ModelRef } from 'vue'
import { legalFrameworkOverviewQuestions, isQuestion } from '~/app-data/abs/legal-framework-overview'
import documentLegend from '~/components/common/document-legend.vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js'
// @ts-expect-error importing js file
import { sanitizeDocument } from '~/services/filters/common'
// @ts-expect-error importing js file
import { THESAURUS_DOMAINS } from '~/constants/thesaurus.js'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import { genericFilter, genericMapping } from '~/services/filters/arrays'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import legalFramewordOverviewT from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { Inject, LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { DocQuestion, Legend } from '~/app-data/abs/legal-framework-overview'
import type { ETerm } from '~/types/common/documents'

const user = useAuth().user()
// Constants
const angularGetCleanDocument: Inject = inject('getCleanDocument') ?? (() => undefined)
const { t, mergeLocaleMessage, locale } = useI18n()
Object.entries(legalFramewordOverviewT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const thesaurusApi = new ThesaurusApi()

// Refs
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const countries: Ref<ETerm[]> = ref(thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.COUNTRIES))
const jurisdictions: Ref<ETerm[]> = ref([])

const documentQuestions: Ref<Array<DocQuestion | Legend>> = ref(legalFrameworkOverviewQuestions(t)
  .map((question) => {
    if (!isQuestion(question)) { return question }
    return Object.assign(question, { onChange: () => enableOrDisableQuestions(question) })
  }))

// Computed
const isJurisdictionDefined = computed(() => legalFrameworkDocument.value?.jurisdiction?.identifier !== undefined)
const currentJurisdiction = computed(() => jurisdictions.value
  .find((jurisdiction) => jurisdiction.identifier === legalFrameworkDocument.value?.jurisdiction?.identifier))
const isNational = computed(() => currentJurisdiction.value?.value === 'National / Federal' &&
  typeof currentJurisdiction.value.value === 'string')
const jurisdictionNamePlaceholder = computed(() => currentJurisdiction.value?.value === 'Community'
  ? t('communityName')
  : t('subNationalName'))
const userHasGovernment = computed(() => user.government !== undefined && user.government !== null)

// Hooks
onMounted(async () => {
  documentQuestions.value
    .forEach(question => enableOrDisableQuestions(question))

  const jurisdictionsFetch = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.CP_JURISDICTIONS)
  jurisdictions.value = jurisdictionsFetch.map((j: ETerm) => ({ title: lstring(j.title, locale), value: j.name, type: j.type, identifier: j.identifier }))

  const countryTerms = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.COUNTRIES)
  countries.value = countryTerms.map((country: ETerm) => Object.assign(country, { __value: lstring(country.title, locale) }))
})

angularGetCleanDocument({
  getCleanDocument
})

// Methods
/**
* Allow parent Angular component to get the document data from then form to pass the data to the recview and submit page.
*/
function getCleanDocument (doc: LegalFrameworkDocument | undefined): LegalFrameworkDocument | undefined {
  const dirtyDocument = doc ?? legalFrameworkDocument.value

  if (typeof dirtyDocument !== 'object') { return undefined }

  const lDocument = removeDisabledValues(dirtyDocument)

  return sanitizeDocument(lDocument)
}

/**
* Determine if the question is disabled based on the questions enabled property.
*/
function isQuestionDisabled (question: DocQuestion): boolean {
  if (question.enable === undefined) { return false }
  return !question.enable
}

function removeDisabledValues (doc: LegalFrameworkDocument): LegalFrameworkDocument {
  const cleanDocument = doc
  // If value have been set in Questions that are now disabled then remove those values.
  Object.entries(cleanDocument).forEach(([key, questionData]) => {
    if (questionData === undefined) { return }

    const questionMap = documentQuestions.value
      .find((map) => map.key === key)

    if (questionMap === undefined) { return }
    if (!('value' in questionData)) { return }

    if (!Array.isArray(questionMap.validations)) { return }

    questionMap.validations.forEach((validation) => {
      if (validation.values.includes(lstring(questionData.value))) { return }
      cleanDocument[validation.question] = undefined
    })
  })
  return cleanDocument
}

/**
* Set each questions enable property based on validations data from the questions map.
*/
function enableOrDisableQuestions (question: DocQuestion | Legend): DocQuestion | Legend {
  if (!isQuestion(question)) { return question }
  if (!Array.isArray(question.validations)) { return question }
  question.validations.forEach((validation) => {
    const validationQuestionIndex = documentQuestions.value.findIndex(attr => attr.key === validation.question)

    if (typeof legalFrameworkDocument.value !== 'object') { return }

    if (typeof documentQuestions.value[validationQuestionIndex] !== 'object') { return }

    if (!isQuestion(documentQuestions.value[validationQuestionIndex])) { return }

    const currentValue = legalFrameworkDocument.value[question.key] ?? { value: '' }

    const isEnabled = validation.values.includes(lstring(currentValue))
    documentQuestions.value[validationQuestionIndex].enable = isEnabled
  })
  return question
}
</script>
<style scope>
  .document-question {
    position: relative;
    opacity: 1;
    background: none;
    transition: opacity 0.2s ease-in-out, background 0.2s ease-in-out;
  }

  div.row:has(.form-group) {
    margin-bottom: 20px;
  }

  div.row:has(legend) {
    margin-bottom: 10px;
  }

  div.row:has(+ .row > div > .document-question.inactive) {
    margin-bottom: 5px;
  }

  div.row:has(> div > .document-question):has(+ .row > div > legend) {
    margin-bottom: 20px
  }

  .text-focus {
    font-size: 1.05em;
    font-weight: 600;
  }

  .form-group--bold > label {
    font-weight: 600;
  }

  .edit-legal-framework-overview .form-group {
    margin: 0px 0px 5px 0px;
  }

  .document-question.inactive .form-group {
    margin: 0;
  }

  .inactive {
    opacity: 0.5;
    background-color: rgba(0, 0, 0, .26);
  }

  .document-question .open-box {
    grid-template-rows: 0fr;
    display: grid;
  }

  .document-question:not(.inactive) .open-box {
    grid-template-rows: 1fr;
  }

  .document-question:not(.inactive) .form-group > label {
    margin-bottom: 0.5rem;
  }

  .document-question .open-box > div {
    overflow: hidden;
  }

  .hidden-label label {
    visibility: collapse;
  }
</style>
