<template>
  <div
    id="Record"
    class="record"
  >
    <div
      class="record-body bg-white"
    >
      <document-date
        :document-info="documentInfo"
      />

      <section>
        <legend>{{ t('generalInformation') }} </legend>
        <div v-if="legalFrameworkDocument?.countries">
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
          v-model:ng-model="docHeader.identifier"
          v-vue-ng:view-referenced-records
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type ModelRef } from 'vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
// @ts-expect-error importing js file
import documentDate from '~/views/forms/view/directives/document-date.vue'
// @ts-expect-error importing js file
import kmTerm from '~/components/km/KmTerm.vue'
import messages from '~/app-text/views/reports/chm/marine-ebsa.json'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'

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

onMounted(() => {
  ({ documentInfo: { body: legalFrameworkDocument.value } } = props)
})

</script>
