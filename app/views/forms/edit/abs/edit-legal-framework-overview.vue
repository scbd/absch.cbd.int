<template>
  <div v-if="legalFrameworkDocument?.header">
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
            <km-control-group
              :required="true"
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
            </km-control-group>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <div
              class="document-attribute border border-1 p-2"
            >
              <km-control-group
                :required="true"
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
              </km-control-group>

              <km-control-group
                :required="true"
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
              </km-control-group>
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
              <km-control-group
                :required="true"
                :name="attribute.key"
                :caption="attribute.title"
                :bold="true"
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
              </km-control-group>

              <!-- SubQuestion -->
              <km-control-group
                v-if="typeof attribute.subQuestion === 'object'"
                :required="true"
                :name="attribute.subQuestion.key"
                :caption="attribute.subQuestion.title"
                :bold="true"
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
              </km-control-group>
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
import documentLegend from '~/components/common/document-legend.vue'
import kmControlGroup from '~/components/common/km-control-group.vue'
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

interface Option {
  value: string
  title: string
  type?: string
  name?: string
  identifier?: string
  caption?: string
}

interface AttributeMap<Key> {
  options?: Option[]
  key: Key
  section?: string
  type: string
  title: string
  multiple?: boolean
  subQuestion?: Question
}

type Question = AttributeMap<keyof LegalFrameworkDocument>
type Legend = AttributeMap<string>

// Constants
const auth = useAuth()
const angularGetCleanDocument: Inject = inject('getCleanDocument') ?? (() => undefined)

const { t, mergeLocaleMessage, locale } = useI18n()
Object.entries(legalFramewordOverviewT)
  .forEach(([key, value]) => mergeLocaleMessage(key, value))

const thesaurusApi = new ThesaurusApi({ tokenReader: () => auth.token() })
const userHasGovernment = ref(true)
const jurisdictionImplementationCaption = `<div>${t('jurisdictionImplementationSubNational')}</div> <div class='mt-2'>${t('jurisdictionImplementationNational')}</div>`

// Refs
const documentAttributes: Ref<Array<Question | Legend>> = ref([])
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()
const countries: Ref<Option[]> = ref([])
const jurisdictions: Ref<Option[]> = ref([])

onMounted(async () => {
  const jurisdictionsFetch = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.CP_JURISDICTIONS)
  jurisdictions.value = jurisdictionsFetch.map((j: Option) => ({ title: lstring(j.title, locale), value: j.name, type: j.type, identifier: j.identifier }))

  countries.value = await fetchCountries()

  const { government } = useUser()
  userHasGovernment.value = government !== undefined && government !== null

  const measureOptions = [
    { value: 'true', title: t('yesAllMeasures'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesToSomeExtent'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const yesNoOptions = [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const casesOptions = [
    { value: 'true', title: t('yesAllCases'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesSomeCases'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('noCountryDetermined'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const getArgCaption = (type: string): string => (`${t('argPermitRequired')} <span class="label-hightlight">${type}</span> ${t('argPermitUtilization')}`)

  documentAttributes.value = [
    // General Information
    {
      type: 'option',
      options: measureOptions,
      key: 'establishedMeasure',
      title: t('establishedMeasure')
    },
    // Access to genetic resources
    {
      key: 'geneticResources',
      section: 'GeneticResources',
      type: 'legend',
      title: t('geneticResources')
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'agrMeasureForAccess',
      title: t('agrMeasureForAccess')
    },
    {
      type: 'option',
      options: casesOptions,
      key: 'agrSubjectToPic',
      title: t('agrSubjectToPic')
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'agrCommercialPermitRequired',
      title: getArgCaption(t('commercial')),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'agrCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'agrNonCommercialPermitRequired',
      title: getArgCaption(t('nonCommercial')),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'agrNonCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      key: 'knowledgeAccess',
      section: 'knowledgeAccess',
      type: 'legend',
      title: t('knowledgeAccess')
    },
    {
      type: 'option',
      options: casesOptions,
      key: 'tkSubjectToPic',
      title: t('tkSubjectToPic')
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'tkMeasureForAccess',
      title: t('tkMeasureForAccess')
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'tkCommercialPermitRequired',
      title: t('tkPermitRequired', { msg: t('commercial') }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'tkCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'tkNonCommercialPermitRequired',
      title: t('tkPermitRequired', { msg: t('nonCommercial') }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'tkNonCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      key: 'benefitSharing',
      section: 'benefitSharing',
      type: 'legend',
      title: t('benefitSharing')
    },
    {
      key: 'Article5_3',
      section: 'Article_5_3',
      type: 'legend',
      title: `<a href='https://www.cbd.int/abs/text/articles/?sec=abs-05' target='_blank'>${t('article5_3')}</a>`
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'article53Implemented',
      title: t('article53Implemented')
    },
    {
      key: 'Article5_5',
      section: 'Article_5_5',
      type: 'legend',
      title: `<a href='https://www.cbd.int/abs/text/articles/?sec=abs-05' target='_blank'>${t('article5_5')}</a>`
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'article55Implemented',
      title: t('article55Implemented')
    }
  ]
})

// Methods
function getCleanDocument (doc: LegalFrameworkDocument | undefined): LegalFrameworkDocument | undefined {
  // TODO: Determine what needs to be done here.
  const lDocument = doc ?? legalFrameworkDocument.value
  if (typeof lDocument !== 'object') { return undefined }

  if (lDocument.notes !== undefined) {
    if (/^\s*$/g.test(lDocument.notes)) { lDocument.notes = undefined }
  }

  onSubmissionStatusChange()
  return sanitizeDocument(lDocument)
}

angularGetCleanDocument({
  getCleanDocument
})

function isQuestion (value: Question | Legend): value is Question {
  return value.type !== 'legend'
}

async function fetchCountries (): Promise<Option[]> {
  const terms = await thesaurusApi.getDomainTerms(THESAURUS_DOMAINS.COUNTRIES)
  return terms.map((country: Option) => Object.assign(country, { __value: lstring(country.title, locale) }))
}

// function updateAnswer (question: Question): undefined {
//   console.log('hellp', question)
//   if (typeof legalFrameworkDocument.value !== 'object') { return }
//   console.log(legalFrameworkDocument.value.jurisdiction)
//   // legalFrameworkDocument.value[term] = ''
// }

// TODO: Implement if needed
function onSubmissionStatusChange (): string {
  return legalFrameworkDocument.value?.status ?? ''
  // if (legalFrameworkDocument.value.status !== 'approved') {
  //   legalFrameworkDocument.value.approvedByCopDecision = undefined
  //   legalFrameworkDocument.value.approvedByGovernment = undefined
  //   legalFrameworkDocument.value.approvedByGovernmentOn = undefined
  // }
}
</script>
<style scope>
  .document-attribute {
    margin: 0 0 20px 0;
  }

  .label-hightlight {
    font-size: 1.1em;
    font-weight: 1000;
    text-decoration: underline;
  }
</style>
