<!--
InformationFromNr1

Information from the first national report based on a list of questions.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <div
    v-if="relatedQuestions.length > 0"
    class="related-information"
  >
    <document-review
      :related-questions="relatedQuestions"
      :document-data="nationalReportData"
      :report-sections="absNationalReport1"
      :locales="[locale]"
      class="px-4 pb-3 pt-2 bg-white"
    >
      <template #header>
        <h3 class="text-dark mb-2">
          {{ $t('relatedInformation') }}
          <a
            class="text-primary"
            type="button>?"
            :href="nr1Url"
          >
            {{ $t('firstNR') }}
          </a>
          {{ $t('publishedOn') }}
          {{ publishedDate }}
        </h3>
      </template>
    </document-review>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import countryProfileT from '~/app-text/views/countries/country-profile.json'
import editAbsNationalReportT from '~/app-text/views/forms/edit/abs/edit-abs-national-report.json'
import editNationalReportT from '~/app-text/views/forms/edit/abs/edit-national-report-1.json'
import viewNationalReportT from '~/app-text/views/forms/view/view-national-report.json'
import documentReview from './document-review.vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js'
import type { CountryRecord } from '~/types/common/document-report'
import type { DocumentData } from '~/types/common/documents'

// Props
export interface Props {
  relatedQuestions?: string[]
  firstNationalReportRecord: CountryRecord
  nationalReportData: DocumentData
}

const props = withDefaults(defineProps<Props>(), {
  relatedQuestions: () => []
})

// Translation Keys
const { mergeLocaleMessage, locale } = useI18n()
const messageGroups = [
  countryProfileT,
  editAbsNationalReportT,
  editNationalReportT,
  viewNationalReportT
]
messageGroups.forEach((messageGroup) => {
  Object.entries(messageGroup)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})
// Computed
const publishedDate = computed(() => parseDate(props.firstNationalReportRecord.docs[0]?.rec_date))
const nr1Url = computed(() => `/database/${props.firstNationalReportRecord.shortCode}/${props.firstNationalReportRecord.docs[0]?.uniqueIdentifier_s.toUpperCase()}`)

// Methods

/**
 * Parse the date to DD MMM YYYY for the NR1 published date.
 */
function parseDate (dateString: string | undefined): string {
  if (dateString === undefined) { return '' }
  const date = new Date(dateString)
  return `${date.toLocaleString(locale, { day: 'numeric' })} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()}`
}
</script>
<style scoped>
:deep(.document-review) {
  padding: 0.5rem 1.5rem 1rem 1.5rem;
}
</style>
