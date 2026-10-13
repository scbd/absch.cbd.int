<template>
  <section class="card mb-4 p-4">
    <legend>{{ t("complianceTitle") }}</legend>

    <div class="row">
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="article15Implemented"
          :caption="t('article15Implemented')"
        >
          <ng
            v-model:ng-model="document.article15Implemented"
            v-vue-ng:nr-yes-no
            :question="article15ImplementedQuestion"
            :locales="locales"
          />
        </ng>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="article16Implemented"
          :caption="t('article16Implemented')"
        >
          <ng
            v-model:ng-model="document.article16Implemented"
            v-vue-ng:nr-yes-no
            :question="article16ImplementedQuestion"
            :locales="locales"
          />
        </ng>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <ng
          v-vue-ng:km-control-group
          name="article17Implemented"
          :caption="t('article17Implemented')"
        >
          <ng
            v-model:ng-model="document.article17Implemented"
            v-vue-ng:nr-yes-no
            :question="article17ImplementedQuestion"
            :locales="locales"
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
import { threeWayOptions } from './legal-framework-overview-options'
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
const article15ImplementedQuestion = computed(() => ({
  key: 'article15Implemented',
  options: threeWayOptions(t),
  additionalKeyName: 'article15Implemented.additionalInformation',
  additionalMandatoryValues: []
}))

const article16ImplementedQuestion = computed(() => ({
  key: 'article16Implemented',
  options: threeWayOptions(t),
  additionalKeyName: 'article16Implemented.additionalInformation',
  additionalMandatoryValues: []
}))

const article17ImplementedQuestion = computed(() => ({
  key: 'article17Implemented',
  options: threeWayOptions(t),
  additionalKeyName: 'article17Implemented.additionalInformation',
  additionalMandatoryValues: []
}))
</script>
