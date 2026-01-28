<template>
  <div
    v-if="legalFrameworkDocument?.header"
  >
    <section class="panel">
      <div class="panel-body mb-5">
        <legend>{{ t("generalInformation") }}</legend>
        <div class="row">
          <div class="col-xs-12">
            <ng
              v-vue-ng:km-control-group
              name="languages"
              required
              :bold="true"
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
              :bold="true"
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

        <div class="row">
          <div class="col-xs-12">
            <div
              class="document-attribute border border-1 p-2"
            >
              <ng
                v-vue-ng:km-control-group
                required
                name="jurisdiction"
                :caption="t('jurisdiction')"
                :bold="true"
                :has-margins="false"
              >
                <div class="mt-2 ps-1">
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
                      >
                      {{ option.title }}
                    </label>
                  </div>
                </div>
              </ng>

              <ng
                v-vue-ng:km-control-group
                required
                name="jurisdictionImplementation"
                :caption="jurisdictionImplementationCaption"
                :has-margins="false"
                class="mt-3"
              >
                <div class="mt-2">
                  <ng
                    v-model:ng-model="legalFrameworkDocument.jurisdictionImplementation"
                    v-vue-ng:km-textbox-ml
                    :locales="legalFrameworkDocument.header.languages"
                    name="jurisdictionImplementation"
                  />
                </div>
              </ng>
            </div>
          </div>
        </div>

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
            >
              <ng
                v-vue-ng:km-control-group
                required
                :name="attribute.key"
                :caption="attribute.title"
                :bold="attribute.bold"
                :has-margins="false"
              >
                <ng
                  v-model:ng-model="legalFrameworkDocument[attribute.key]"
                  v-vue-ng:nr-yes-no
                  :required="true"
                  :question="attribute"
                  :locales="legalFrameworkDocument.header.languages"
                  :name="attribute.key"
                  binding-type="term[]"
                  class="mt-2 ps-1"
                />
              </ng>

              <!-- SubQuestion -->
              <ng
                v-if="typeof attribute.subQuestion === 'object'"
                v-vue-ng:km-control-group
                required
                :name="attribute.subQuestion.key"
                :caption="attribute.subQuestion.title"
                :bold="attribute.subQuestion.bold"
                :has-margins="false"
                class="mt-3"
              >
                <ng
                  v-model:ng-model="legalFrameworkDocument[attribute.subQuestion.key]"
                  v-vue-ng:nr-yes-no
                  :required="true"
                  :question="attribute.subQuestion"
                  :locales="legalFrameworkDocument.header.languages"
                  :name="attribute.subQuestion.key"
                  binding-type="term[]"
                  class="mt-2 ps-1"
                />
              </ng>
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
import { inject, onMounted, ref, type Ref, type ModelRef } from 'vue'
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
const jurisdictionImplementationCaption = `<span>${t('jurisdictionImplementationSubNational')}</span><br/><span class='mt-2'>${t('jurisdictionImplementationNational')}</span>`

// Refs
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const countries: Ref<Option[]> = ref([])
const jurisdictions: Ref<Option[]> = ref([])
const documentAttributes: Ref<Array<Question | Legend>> = ref(legalFrameworkOverviewAttributes(t))

onMounted(async () => {
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

async function fetchCountries (): Promise<Option[]> {
  const terms = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.COUNTRIES)
  return terms.map((country: Option) => Object.assign(country, { __value: lstring(country.title, locale) }))
}
</script>
<style scope>
  .document-attribute {
    margin: 0 0 20px 0;
  }

  .text-focus {
    font-size: 1.05em;
    font-weight: 1000;
  }
</style>
