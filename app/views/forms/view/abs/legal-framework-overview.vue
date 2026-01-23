<template>
  <div
    id="Record"
    class="record"
  >
    <div
      v-if="legalFrameworkDocument"
      class="record-body bg-white"
    >
      <document-date
        :document-info="documentInfo"
      />

      <section v-if="legalFrameworkDocument.summary || legalFrameworkDocument.areaIntroduction || legalFrameworkDocument.title">
        <legend>{{ t('generalInformation') }} </legend>
        <div v-if="legalFrameworkDocument.title">
          <label>{{ t('title') }} </label>
          <ng
            v-vue-ng:km-value-ml
            :value="legalFrameworkDocument.title"
            :locales="locale"
            html
          />
        </div>

        <div v-if="legalFrameworkDocument.summary">
          <label>{{ t('summary') }} </label>
          <ng
            v-vue-ng:km-value-ml
            :value="legalFrameworkDocument.summary"
            :locales="locale"
            html
            km-pre
          />
        </div>

        <div v-if="legalFrameworkDocument.countries">
          <label>{{ t('relatedCountries') }}</label>
          <div class="km-value">
            <li
              v-for="term in legalFrameworkDocument.countries"
              :key="term"
            >
              <km-term
                :value="term"
                :locale="locale"
              />
            </li>
          </div>
        </div>
      </section>
      <div>
        <ng
          v-model:ng-model="legalFrameworkDocument.header.identifier"
          v-vue-ng:view-referenced-records
        />
      </div>
    </div>

    <ng
      v-vue-ng:document-metadata-vue
      :document-info="documentInfo"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
// @ts-expect-error importing js file
import kmTerm from '~/components/km/KmTerm.vue'
import messages from '~/app-text/views/reports/chm/marine-ebsa.json'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ messages })
const props = defineProps({
  documentInfo: { type: Object, required: true },
  locale: { type: String, required: true }
})

const legalFrameworkDocument = computed(() => props.documentInfo['body'])
</script>
