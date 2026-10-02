<template>
  <div v-if="legalFrameworkDocument?.header">
    <section class="card mb-4 p-4">
      <legend>{{ t("generalInformation") }}</legend>

      <div class="row">
        <div class="col-xs-12">
          <ng
            v-vue-ng:km-control-group
            name="languages"
            required
            :caption="t('languageToPublish')"
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
        <div
          v-if="countries.length"
          class="col-xs-12"
        >
          <ng
            v-vue-ng:km-control-group
            name="government"
            required
            :caption="t('country')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.government"
              v-vue-ng:afc-autocomplete
              name="government"
              required
              :source="countries"
              :placeholder="t('selectCountry')"
              :selectbox="true"
              :filter="genericFilter"
              :mapping="genericMapping"
              @ng-disabled="() => userGovernment"
            />
          </ng>
        </div>
      </div>
    </section>

    <section class="card mb-4 p-4">
      <legend class="mb-3">
        {{ t("jurisdictionSectionTitle") }}
      </legend>
      <div class="help-info">
        {{ t("jurisdictionSectionInfo") }}
      </div>

      <div class="row">
        <div
          v-if="jurisdictions.length"
          class="col-sm-12"
        >
          <ng
            v-vue-ng:km-control-group
            name="jurisdiction"
            required
            :caption="t('jurisdiction')"
          >
            <div>
              <div class="help-info">
                {{ t("jurisdictionRecordUniquenessInfo") }}
                <br>
                {{ t("jurisdictionSubNationalInfo") }}
              </div>
              <ng
                v-model:ng-model="legalFrameworkDocument.jurisdiction"
                v-vue-ng:afc-autocomplete
                name="jurisdiction"
                required
                :source="jurisdictions"
                :placeholder="t('selectJurisdiction')"
                :selectbox="true"
                :filter="genericFilter"
                :mapping="genericMapping"
              />
            </div>
          </ng>
        </div>
        <div
          v-if="isJurisdictionSubNationalOrCommunityOrOther"
          class="col-sm-12"
        >
          <ng
            v-vue-ng:km-control-group
            name="jurisdiction.customValue"
            required
            :caption="t('jurisdictionName')"
          >
            <ng
              v-model:ng-model="jurisdictionCustomValue"
              v-vue-ng:km-textbox-ml
              required
              :locales="legalFrameworkDocument.header.languages"
            />
          </ng>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="jurisdictionImplementation"
            required
            :caption="t('jurisdictionScopeDescription')"
          >
            <div>
              <div class="help-info">
                {{ t("jurisdictionScopeDescriptionInfo") }}
              </div>
              <ng
                v-model:ng-model="legalFrameworkDocument.jurisdictionImplementation"
                v-vue-ng:km-textbox-ml
                required
                rows="3"
                :locales="legalFrameworkDocument.header.languages"
              />
            </div>
          </ng>
        </div>
      </div>
    </section>

    <section class="card mb-4 p-4">
      <legend>{{ t("generalAbsMeasuresTitle") }}</legend>
      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="establishedMeasure"
            required
            :caption="t('establishedMeasure')"
          >
            <div>
              <div class="help-info">
                {{ t("establishedMeasureInfo") }}
              </div>
              <ng
                v-model:ng-model="legalFrameworkDocument.establishedMeasure"
                v-vue-ng:nr-yes-no
                required
                :question="establishedMeasureQuestion"
                :locales="legalFrameworkDocument.header.languages"
              />
            </div>
          </ng>
        </div>
      </div>
    </section>

    <edit-legal-framework-overview-access
      v-model="legalFrameworkDocument"
      :locales="legalFrameworkDocument.header.languages"
    />

    <edit-legal-framework-overview-iplc
      v-model="legalFrameworkDocument"
      :locales="legalFrameworkDocument.header.languages"
    />

    <section class="card mb-4 p-4">
      <legend>{{ t("article8Title") }}</legend>

      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="article8ResearchSupport"
            :caption="t('article8ResearchSupport')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.article8ResearchSupport"
              v-vue-ng:nr-yes-no
              :question="article8ResearchSupportQuestion"
              :locales="legalFrameworkDocument.header.languages"
            />
          </ng>
        </div>
      </div>
      <div
        class="row"
        :class="{ 'disabled-section': !isYesOrSome(legalFrameworkDocument?.article8ResearchSupport) }"
      >
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="article8SimplifiedAccessMeasures"
            :caption="t('article8SimplifiedAccessMeasures')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.article8SimplifiedAccessMeasures"
              v-vue-ng:nr-yes-no
              :question="article8SimplifiedAccessMeasuresQuestion"
              :locales="legalFrameworkDocument.header.languages"
              @ng-disabled="() => !isYesOrSome(legalFrameworkDocument?.article8ResearchSupport)"
            />
          </ng>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="article8Emergencies"
            :caption="t('article8Emergencies')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.article8Emergencies"
              v-vue-ng:nr-yes-no
              :question="article8EmergenciesQuestion"
              :locales="legalFrameworkDocument.header.languages"
            />
          </ng>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="article8FoodSecurity"
            :caption="t('article8FoodSecurity')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.article8FoodSecurity"
              v-vue-ng:nr-yes-no
              :question="article8FoodSecurityQuestion"
              :locales="legalFrameworkDocument.header.languages"
            />
          </ng>
        </div>
      </div>
    </section>

    <edit-legal-framework-overview-compliance
      v-model="legalFrameworkDocument"
      :locales="legalFrameworkDocument.header.languages"
    />

    <section class="card mb-4 p-4">
      <legend>{{ t("faqTitle") }}</legend>
      <div class="row">
        <div class="col-sm-12">
          <legal-framework-overview-faqs
            v-model="legalFrameworkDocument.faqs"
            :locales="legalFrameworkDocument.header.languages"
          />
        </div>
      </div>
    </section>

    <section class="card mb-4 p-4">
      <legend>{{ t("additionalInfoTitle") }}</legend>
      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="additionalInformation"
            :caption="t('additionalInformation')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.additionalInformation"
              v-vue-ng:km-rich-textbox
              rows="4"
              :locales="legalFrameworkDocument.header.languages"
            />
          </ng>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ng
            v-vue-ng:km-control-group
            name="additionalDocuments"
            :caption="t('additionalDocuments')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.additionalDocuments"
              v-vue-ng:km-link
              :allow-link="true"
              :allow-file="true"
              :identifier="legalFrameworkDocument.header.identifier"
            />
          </ng>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { inject, computed, ref, type ModelRef } from 'vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js'
import '~/views/forms/directives/nr-yes-no.js'
// @ts-expect-error importing js file
import { sanitizeDocument } from '~/services/filters/common'
// @ts-expect-error importing js file
import { THESAURUS } from '~/services/filters/constant'
import { genericMapping, genericFilter } from '~/services/filters/arrays'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring.js'
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { Inject, LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { LString } from '~/types/languages'
import legalFrameworkOverviewFaqs from '~/components/forms/edit/abs/lfo/legal-framework-overview-faqs.vue'
import editLegalFrameworkOverviewAccess from '~/components/forms/edit/abs/lfo/edit-legal-framework-overview-access.vue'
import editLegalFrameworkOverviewIplc from '~/components/forms/edit/abs/lfo/edit-legal-framework-overview-iplc.vue'
import editLegalFrameworkOverviewCompliance from '~/components/forms/edit/abs/lfo/edit-legal-framework-overview-compliance.vue'
import { isYesOrSome, threeWayOptions as sharedThreeWayOptions } from '~/components/forms/edit/abs/lfo/legal-framework-overview-options'

// Model
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()

// Composables
const auth = useAuth()
const { t, locale } = useI18n({ messages })
const angularGetCleanDocument: Inject = (inject('getCleanDocument') ?? (() => undefined))

// Constants
// Jurisdiction domain declared on EAbsLegalFramework.jurisdiction (Km/ClearingHouse/Schemas/Abs/EAbsLegalFramework.cs)
const JURISDICTION_DOMAIN = 'D7BD5BDE-A6B9-4261-B788-16839CCC4F7E'
// The shared "Other" term appended wherever a Term field declares AllowOther=true (TermAttribute.OTHER_DOMAIN_TERM)
const JURISDICTION_OTHER_TERM = '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
const JURISDICTION_SUBNATIONAL_TERM = 'DEBB019D-8647-40EC-8AE5-10CA88572F6E'
const JURISDICTION_COMMUNITY_TERM = '9627DF2B-FFAC-4F85-B075-AF783FF2A0B5'

// Vars
const thesaurusApi = new ThesaurusApi({ tokenReader: async () => await auth.token() })

const jurisdictions = ref<unknown[]>([])
const countryTerms = ref<Array<{ title?: LString }>>([])

thesaurusApi.getDomainTerms(THESAURUS.COUNTRIES)
  .then((terms: Array<{ title?: LString }>) => { countryTerms.value = terms })

thesaurusApi.getDomainTerms(JURISDICTION_DOMAIN)
  .then((terms: unknown[]) => thesaurusApi.getTerm(JURISDICTION_OTHER_TERM)
    .then((other: unknown) => { jurisdictions.value = [...terms, other] }))

// Computed
const countries = computed(() => [...countryTerms.value]
  .sort((a, b) => lstring(a.title, locale.value).localeCompare(lstring(b.title, locale.value))))

const userGovernment = computed(() => {
  const user = auth.user()
  return user && typeof user === 'object' && 'government' in user ? user.government : undefined
})

const isJurisdictionSubNationalOrCommunityOrOther = computed(() => {
  const identifier = legalFrameworkDocument.value?.jurisdiction?.identifier
  return identifier === JURISDICTION_SUBNATIONAL_TERM ||
    identifier === JURISDICTION_COMMUNITY_TERM ||
    identifier === JURISDICTION_OTHER_TERM
})

const jurisdictionCustomValue = computed({
  get: () => legalFrameworkDocument.value?.jurisdiction?.customValue,
  set: (value) => {
    if (legalFrameworkDocument.value?.jurisdiction) {
      legalFrameworkDocument.value.jurisdiction.customValue = value
    }
  }
})

// Methods
function threeWayOptions (labels?: { true?: string, trueSome?: string }, footnote?: string) {
  return sharedThreeWayOptions(t, labels, footnote)
}

// Question objects are memoized so their identity stays stable across re-renders - the
// ng-vue bridge does a strict `===` check before pushing a prop into Angular, so a fresh
// object literal on every render (e.g. typing into any field re-renders this component)
// makes Angular think `question` changed and tears down/rebuilds the nr-yes-no radio
// list (no `track by` on its ng-repeat), causing visible flicker.
const establishedMeasureQuestion = computed(() => ({
  key: 'establishedMeasure',
  options: threeWayOptions({ true: t('yesAllCases') }),
  additionalKeyName: 'establishedMeasure.additionalInformation',
  additionalMandatoryValues: ['true.some', 'false']
}))

const article8ResearchSupportQuestion = computed(() => ({
  key: 'article8ResearchSupport',
  options: threeWayOptions(),
  additionalKeyName: 'article8ResearchSupport.additionalInformation',
  additionalMandatoryValues: []
}))

const article8SimplifiedAccessMeasuresQuestion = computed(() => ({
  key: 'article8SimplifiedAccessMeasures',
  options: threeWayOptions(),
  additionalKeyName: 'article8SimplifiedAccessMeasures.additionalInformation',
  additionalMandatoryValues: ['true.some', 'false']
}))

const article8EmergenciesQuestion = computed(() => ({
  key: 'article8Emergencies',
  options: threeWayOptions(undefined, t('article8EmergenciesInfo')),
  additionalKeyName: 'article8Emergencies.additionalInformation',
  additionalMandatoryValues: []
}))

const article8FoodSecurityQuestion = computed(() => ({
  key: 'article8FoodSecurity',
  options: threeWayOptions(undefined, t('article8FoodSecurityInfo')),
  additionalKeyName: 'article8FoodSecurity.additionalInformation',
  additionalMandatoryValues: []
}))

function getCleanDocument (doc: LegalFrameworkDocument | undefined): LegalFrameworkDocument | undefined {
  const lDocument = doc ?? legalFrameworkDocument.value
  if (typeof lDocument !== 'object') { return undefined }

  if (lDocument.notes !== undefined) {
    if (/^\s*$/g.test(lDocument.notes)) { lDocument.notes = undefined }
  }

  return sanitizeDocument(lDocument)
}
angularGetCleanDocument({
  getCleanDocument
})
</script>
<style scoped src="./edit-legal-framework-overview.css"></style>
