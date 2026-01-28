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
                html
              />
            </ng>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <ng
              v-vue-ng:km-control-group
              required
              name="government"
              :caption="t('country')"
              class="border border-1 p-2"
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
                ng-disabled="userHasGovernment"
              />
            </ng>
          </div>
        </div>

        <div
          class="row"
        >
          <div class="col-xs-12">
            <div
              class="document-attribute border border-1 p-2"
            >
              <ng
                v-vue-ng:km-control-group
                required
                name="jurisdiction" :caption="t('jurisdiction')"
                :bold="true"
                class="mb-2"
              >
                <div class="ps-1">
                  <div
                    v-for="option in jurisdictions"
                    :key="option.value"
                    class="radio-option"
                  >
                    <label
                      class="radio-inline"
                      :for="`jurisdiction-${option.title}`"
                    >
                      <input
                        :id="`option-${option.value}`"
                        v-model="legalFrameworkDocument.jurisdiction"
                        type="radio"
                        :value="{ identifier: option.identifier }"
                        :name="option.title"
                        class="me-1"
                        @change="setJurisdictionCaption"
                      >
                      {{ option.title }}
                    </label>
                  </div>
                </div>
              </ng>

              <ng
                ref="jurisdictionCaption"
                v-vue-ng:km-control-group
                required
                name="jurisdictionImplementation"
                :caption="jurisdictionImplementationCaption"
                class="mb-2"
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
          v-for="attribute in documentAttributes"
          :key="attribute.key"
          class="row"
        >
          <div
            v-if="isQuestion(attribute)"
            class="col-xs-12"
          >
            <div
              class="document-attribute border border-1 p-2"
              :class="{ 'inactive pe-none': isQuestionDisabled(attribute) }"
            >
              <ng
                v-vue-ng:km-control-group
                required
                :name="attribute.key"
                :caption="attribute.title"
                :class="{ 'form-group--bold': attribute.bold }"
              >
                <div class="open-box">
                  <ng
                    v-model:ng-model="legalFrameworkDocument[attribute.key]"
                    v-vue-ng:nr-yes-no
                    :ng-change="typeof attribute.onChange === 'function' ? attribute.onChange() : () => {}"
                    :required="true"
                    :question="attribute"
                    :locales="legalFrameworkDocument.header.languages"
                    :name="attribute.key"
                    binding-type="term[]"
                    class="ps-1"
                  />
                </div>
              </ng>

              <!-- SubQuestion -->
              <div class="open-box">
                <ng
                  v-for="subQuestion in attribute.questions"
                  :key="subQuestion.key"
                  v-vue-ng:km-control-group
                  :name="subQuestion.key"
                  :caption="subQuestion.title"
                  :bold="String(subQuestion.bold)"
                  required
                  class="mt-3"
                >
                  <ng
                    v-model:ng-model="legalFrameworkDocument[subQuestion.key]"
                    v-vue-ng:nr-yes-no
                    :required="true"
                    :question="subQuestion"
                    :locales="legalFrameworkDocument.header.languages"
                    :name="subQuestion.key"
                    binding-type="term[]"
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
              :title="attribute.title"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { inject, shallowRef, onMounted, ref, type Ref, type ModelRef, type ComponentPublicInstance } from 'vue'
import { legalFrameworkOverviewAttributes } from '~/app-data/abs/legal-framework-overview'
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
import { useAuth, useUser } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import legalFramewordOverviewT from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { Inject, LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { Question, Legend, Option } from '~/app-data/abs/legal-framework-overview'

// Constants
const auth = useAuth()
const angularGetCleanDocument: Inject = inject('getCleanDocument') ?? (() => undefined)

const { t, mergeLocaleMessage, locale } = useI18n()
Object.entries(legalFramewordOverviewT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const thesaurusApi = new ThesaurusApi({ tokenReader: () => auth.token() })
const userHasGovernment = ref(true)

const jurisdictionImplementationCaption = ref(`<div class="national-jurisdiction mb-2">${t('jurisdictionImplementationNational')}</div><span class="subnational-jurisdiction">${t('jurisdictionImplementationSubNational')}</span>`)

// Refs
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const countries: Ref<Option[]> = ref([])
const jurisdictions: Ref<Option[]> = ref([])
const documentAttributes: Ref<Array<Question | Legend>> = ref(getTransformedDocumentAttributes())
const jurisdictionCaption = shallowRef<ComponentPublicInstance>()

onMounted(async () => {
  documentAttributes.value
    .forEach(attribute => enableOrDisableQuestions(attribute))

  const jurisdictionsFetch = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.CP_JURISDICTIONS)
  jurisdictions.value = jurisdictionsFetch.map((j: Option) => ({ title: lstring(j.title, locale), value: j.name, type: j.type, identifier: j.identifier }))

  countries.value = await fetchCountries()

  const { government } = useUser()
  userHasGovernment.value = government !== undefined && government !== null
})

angularGetCleanDocument({
  getCleanDocument
})

// Methods
function getCleanDocument (doc: LegalFrameworkDocument | undefined): LegalFrameworkDocument | undefined {
  // TODO: Determine what needs to be done here.
  const lDocument = doc ?? legalFrameworkDocument.value
  if (typeof lDocument !== 'object') { return undefined }

  if (lDocument.notes !== undefined) {
    if (/^\s*$/g.test(lDocument.notes)) { lDocument.notes = undefined }
  }

  return sanitizeDocument(lDocument)
}

function isQuestion (value: Question | Legend): value is Question {
  return value.type !== 'legend'
}

function isQuestionDisabled (attribute: Question): boolean {
  if (attribute.enable === undefined) { return false }
  return !attribute.enable
}

function enableOrDisableQuestions (attribute: Question | Legend): Question | Legend {
  if (!isQuestion(attribute)) { return attribute }
  if (!Array.isArray(attribute.validations)) { return attribute }
  attribute.validations.forEach((validation) => {
    const validationQuestionIndex = documentAttributes.value.findIndex(attr => attr.key === validation.question)

    if (typeof legalFrameworkDocument.value !== 'object') { return }

    if (typeof documentAttributes.value[validationQuestionIndex] !== 'object') { return }

    if (!isQuestion(documentAttributes.value[validationQuestionIndex])) { return }

    const currentValue = legalFrameworkDocument.value[attribute.key] ?? { value: '' }

    const isEnabled = validation.values.includes(lstring(currentValue))
    documentAttributes.value[validationQuestionIndex].enable = isEnabled
  })
  return attribute
}

function getTransformedDocumentAttributes (): Array<Question | Legend> {
  const attributes = legalFrameworkOverviewAttributes(t)

  attributes.forEach((_, index) => {
    const { [index]: attribute } = attributes
    if (attribute === undefined) { return }
    if (!isQuestion(attribute)) { return }

    attribute.onChange = () => enableOrDisableQuestions(attribute)
  })
  return attributes
}

function setJurisdictionCaption (): undefined {
  const currentJurisidiction = jurisdictions.value
    .find((jurisdiction) => jurisdiction.identifier === legalFrameworkDocument.value?.jurisdiction?.identifier)

  if (currentJurisidiction === undefined) { return }

  const isNational = currentJurisidiction.value === 'National / Federal'
  const nationalEl = jurisdictionCaption.value?.$el.$ngElement.getElementsByClassName('national-jurisdiction')[0]
  const subNationalEl = jurisdictionCaption.value?.$el.$ngElement.getElementsByClassName('subnational-jurisdiction')[0]

  if (isNational) {
    nationalEl?.classList.remove('inactive')
    subNationalEl?.classList.add('inactive')
    return
  }
  nationalEl?.classList.add('inactive')
  subNationalEl?.classList.remove('inactive')
}

async function fetchCountries (): Promise<Option[]> {
  const terms = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.COUNTRIES)
  return terms.map((country: Option) => Object.assign(country, { __value: lstring(country.title, locale) }))
}
</script>
<style scope>
  .document-attribute {
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

  div.row:has(+ .row > div > .document-attribute.inactive) {
    margin-bottom: 5px;
  }

  div.row:has(> div > .document-attribute):has(+ .row > div > legend) {
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

  .document-attribute.inactive .form-group {
    margin: 0;
  }

  .inactive {
    opacity: 0.5;
    background-color: rgba(0, 0, 0, .26);
  }

  .document-attribute .open-box {
    grid-template-rows: 0fr;
    display: grid;
  }

  .document-attribute:not(.inactive) .open-box {
    grid-template-rows: 1fr;
  }

  .document-attribute:not(.inactive) .form-group > label {
    margin-bottom: 0.5rem;
  }

  .document-attribute .open-box > div {
    overflow: hidden;
  }
</style>
