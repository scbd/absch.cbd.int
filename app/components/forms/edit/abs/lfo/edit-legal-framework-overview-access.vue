<template>
  <section class="card mb-4 p-4">
    <legend>{{ t("accessToGeneticResourcesTitle") }}</legend>

    <div class="row">
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="agrSubjectToPic"
          required
          :caption="t('agrSubjectToPic')"
        >
          <ng
            v-model:ng-model="document.agrSubjectToPic"
            v-vue-ng:nr-yes-no
            required
            :question="agrSubjectToPicQuestion"
            :locales="locales"
          />
        </ng>
      </div>
    </div>

    <div
      v-if="!isYesOrSome(document.agrSubjectToPic)"
      class="alert alert-info"
    >
      {{ t('agrPermitSectionInfo') }}
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYesOrSome(document.agrSubjectToPic) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="agrCommercialPermitRequired"
          required
          :caption="t('agrCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.agrCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            required
            :question="agrCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYesOrSome(document.agrSubjectToPic)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isAnswered(document.agrCommercialPermitRequired) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="agrCommercialPermitException"
          :caption="t('permitException')"
        >
          <ng
            v-model:ng-model="document.agrCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="agrCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isAnswered(document.agrCommercialPermitRequired)"
          />
        </ng>
      </div>
    </div>

    <div
      class="row"
      :class="{ 'disabled-section': !isYesOrSome(document.agrSubjectToPic) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="agrNonCommercialPermitRequired"
          required
          :caption="t('agrNonCommercialPermitRequired')"
        >
          <ng
            v-model:ng-model="document.agrNonCommercialPermitRequired"
            v-vue-ng:nr-yes-no
            required
            :question="agrNonCommercialPermitRequiredQuestion"
            :locales="locales"
            @ng-disabled="() => !isYesOrSome(document.agrSubjectToPic)"
          />
        </ng>
      </div>
    </div>
    <div
      class="row"
      :class="{ 'disabled-section': !isAnswered(document.agrNonCommercialPermitRequired) }"
    >
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="agrNonCommercialPermitException"
          :caption="t('permitException')"
        >
          <ng
            v-model:ng-model="document.agrNonCommercialPermitException"
            v-vue-ng:nr-yes-no
            :question="agrNonCommercialPermitExceptionQuestion"
            :locales="locales"
            @ng-disabled="() => !isAnswered(document.agrNonCommercialPermitRequired)"
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
import { isYesOrSome, isAnswered, twoWayOptions, threeWayOptions, yesExplainOnlyOptions } from './legal-framework-overview-options'
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
// Question objects are memoized so their identity stays stable across re-renders -
// the ng-vue bridge (beforeUpdate in vue-ng.js) does a strict `===` check before pushing
// a prop down to Angular, so a freshly-built object on every render (e.g. from typing in
// an unrelated field, which mutates the reactive `document` and re-renders this whole
// component) makes Angular think `question` changed, tearing down and rebuilding the
// nr-yes-no radio list (no `track by` on its ng-repeat) - causing visible flicker.
const agrSubjectToPicQuestion = computed(() => ({
  key: 'agrSubjectToPic',
  options: threeWayOptions(t, { true: t('agrSubjectToPicYesAllCases'), trueSome: t('agrSubjectToPicYesSomeCases') }),
  additionalKeyName: 'agrSubjectToPic.additionalInformation',
  additionalMandatoryValues: ['true.some']
}))

const agrCommercialPermitRequiredQuestion = computed(() => ({
  key: 'agrCommercialPermitRequired',
  options: twoWayOptions(t),
  additionalKeyName: 'agrCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const agrCommercialPermitExceptionQuestion = computed(() => ({
  key: 'agrCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'agrCommercialPermitException.additionalInformation',
  additionalMandatoryValues: ['true']
}))

const agrNonCommercialPermitRequiredQuestion = computed(() => ({
  key: 'agrNonCommercialPermitRequired',
  options: twoWayOptions(t),
  additionalKeyName: 'agrNonCommercialPermitRequired.additionalInformation',
  additionalMandatoryValues: []
}))

const agrNonCommercialPermitExceptionQuestion = computed(() => ({
  key: 'agrNonCommercialPermitException',
  options: yesExplainOnlyOptions(t),
  additionalKeyName: 'agrNonCommercialPermitException.additionalInformation',
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
