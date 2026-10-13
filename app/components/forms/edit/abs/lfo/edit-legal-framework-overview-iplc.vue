<template>
  <section class="card mb-4 p-4">
    <legend>{{ t("iplcSectionTitle") }}</legend>
    <div class="row">
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcPresent"
          :caption="t('iplcPresent')"
        >
          <ng
            v-model:ng-model="document.iplcPresent"
            v-vue-ng:nr-yes-no
            :question="iplcPresentQuestion"
            :locales="locales"
          />
        </ng>
      </div>
    </div>

    <legend>{{ t("tkAccessTitle") }}</legend>

    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="tkSubjectToPic"
          :caption="t('tkSubjectToPic')"
        >
          <ng
            v-model:ng-model="document.tkSubjectToPic"
            v-vue-ng:nr-yes-no
            :question="tkSubjectToPicQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="tkCommercialPermitRequired"
          :caption="t('tkCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.tkCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            :question="tkCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.tkCommercialPermitRequired) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="tkCommercialPermitException"
          :caption="t('tkCommercialPermitException')"
        >
          <ng
            v-model:ng-model="document.tkCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="tkCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.tkCommercialPermitRequired) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="tkNonCommercialPermitRequired"
          :caption="t('tkNonCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.tkNonCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            :question="tkNonCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.tkNonCommercialPermitRequired) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="tkNonCommercialPermitException"
          :caption="t('tkNonCommercialPermitException')"
        >
          <ng
            v-model:ng-model="document.tkNonCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="tkNonCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.tkNonCommercialPermitRequired) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <legend>{{ t("iplcGrTitle") }}</legend>

    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcDomesticLawRecognizesRight"
          :caption="t('iplcDomesticLawRecognizesRight')"
        >
          <ng
            v-model:ng-model="document.iplcDomesticLawRecognizesRight"
            v-vue-ng:nr-yes-no
            :question="iplcDomesticLawRecognizesRightQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcAccessBasedOnPic"
          :caption="t('iplcAccessBasedOnPic')"
        >
          <ng
            v-model:ng-model="document.iplcAccessBasedOnPic"
            v-vue-ng:nr-yes-no
            :question="iplcAccessBasedOnPicQuestion"
            :locales="locales"
            @ng-disabled="() => !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcCommercialPermitRequired"
          :caption="t('iplcCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.iplcCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            :question="iplcCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcCommercialPermitRequired) || !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcCommercialPermitException"
          :caption="t('iplcCommercialPermitException')"
        >
          <ng
            v-model:ng-model="document.iplcCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="iplcCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcCommercialPermitRequired) || !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcNonCommercialPermitRequired"
          :caption="t('iplcNonCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.iplcNonCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            :question="iplcNonCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isYes(document.iplcNonCommercialPermitRequired) || !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="iplcNonCommercialPermitException"
          :caption="t('iplcNonCommercialPermitException')"
        >
          <ng
            v-model:ng-model="document.iplcNonCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="iplcNonCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isYes(document.iplcNonCommercialPermitRequired) || !isYesOrSome(document.iplcDomesticLawRecognizesRight) || !isYes(document.iplcPresent)"
          />
        </ng>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import '~/views/forms/directives/nr-yes-no.js'
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import { isYes, isYesOrSome, twoWayOptions, threeWayOptions, yesExplainOnlyOptions } from './legal-framework-overview-options'
import type { LanguageCode } from '~/types/languages'

// Types
interface Props {
  locales: LanguageCode[]
}

// Props
defineProps<Props>()

// Composables
const { t } = useI18n({ messages })

// Model
const document = defineModel<LegalFrameworkDocument>({ required: true })

// Computed
// Memoized so identity stays stable across re-renders - the ng-vue bridge does a strict
// `===` check before pushing a prop into Angular, so a fresh object literal on every
// render (e.g. typing into any field re-renders this whole component) makes Angular
// think `question` changed and tears down/rebuilds the nr-yes-no radio list, flickering.
const iplcPresentQuestion = computed(() => ({
  key: 'iplcPresent',
  options: twoWayOptions(t),
  additionalKeyName: 'iplcPresent.additionalInformation',
  additionalMandatoryValues: []
}))

const tkSubjectToPicQuestion = computed(() => ({
  key: 'tkSubjectToPic',
  options: threeWayOptions(t, undefined, t('tkSubjectToPicInfo')),
  additionalKeyName: 'tkSubjectToPic.additionalInformation',
  additionalMandatoryValues: []
}))

const tkCommercialPermitRequiredQuestion = computed(() => ({
  key: 'tkCommercialPermitRequired',
  options: twoWayOptions(t, t('tkCommercialPermitRequiredInfo')),
  additionalKeyName: 'tkCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const tkCommercialPermitExceptionQuestion = computed(() => ({
  key: 'tkCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'tkCommercialPermitException.additionalInformation',
  additionalMandatoryValues: ['true']
}))

const tkNonCommercialPermitRequiredQuestion = computed(() => ({
  key: 'tkNonCommercialPermitRequired',
  options: twoWayOptions(t, t('tkNonCommercialPermitRequiredInfo')),
  additionalKeyName: 'tkNonCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const tkNonCommercialPermitExceptionQuestion = computed(() => ({
  key: 'tkNonCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'tkNonCommercialPermitException.additionalInformation',
  additionalMandatoryValues: ['true']
}))

const iplcDomesticLawRecognizesRightQuestion = computed(() => ({
  key: 'iplcDomesticLawRecognizesRight',
  options: threeWayOptions(t),
  additionalKeyName: 'iplcDomesticLawRecognizesRight.additionalInformation',
  additionalMandatoryValues: []
}))

const iplcAccessBasedOnPicQuestion = computed(() => ({
  key: 'iplcAccessBasedOnPic',
  options: threeWayOptions(t),
  additionalKeyName: 'iplcAccessBasedOnPic.additionalInformation',
  additionalMandatoryValues: []
}))

const iplcCommercialPermitRequiredQuestion = computed(() => ({
  key: 'iplcCommercialPermitRequired',
  options: twoWayOptions(t),
  additionalKeyName: 'iplcCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const iplcCommercialPermitExceptionQuestion = computed(() => ({
  key: 'iplcCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'iplcCommercialPermitException.additionalInformation',
  additionalMandatoryValues: ['true']
}))

const iplcNonCommercialPermitRequiredQuestion = computed(() => ({
  key: 'iplcNonCommercialPermitRequired',
  options: twoWayOptions(t),
  additionalKeyName: 'iplcNonCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const iplcNonCommercialPermitExceptionQuestion = computed(() => ({
  key: 'iplcNonCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'iplcNonCommercialPermitException.additionalInformation',
  additionalMandatoryValues: ['true']
}))
</script>
<style scoped>
/* Matches the darker gray of the national-report edit form's disabled sub-questions
   (.disabled + the block-region dimmer overlay stacked on top, template.css:1018-1053),
   without pulling in that loading-spinner directive just for its color effect. */
.disabled-section {
  background-color: rgba(0, 0, 0, 0.26);
}
</style>
