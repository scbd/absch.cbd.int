<!--
RelatedInformationFromNr1

Related information from the first national report if the country is missing documents in their report.

Used on the countries profile page e.g. /en/countries/BH
-->
<template>
  <InformationFromNr1
    :related-questions="relatedQuestions"
    :country-records="countryRecords"
    :country-code="countryCode"
  />
</template>
<script setup lang="ts">
import InformationFromNr1 from './information-from-nr1.vue'
import type { CountryRecord, RelatedQuestionsList } from '~/types/common/document-report'

export interface Props {
  countryRecords?: CountryRecord[]
  countryCode: string
}

withDefaults(defineProps<Props>(), {
  countryRecords: () => []
})

// Determines what information will be shown from the NR1 if
// the country is missing document data.
const relatedQuestions: RelatedQuestionsList[] = [
  {
    questions: ['Q003'],
    key: 'focalPoint' // If No ABS-NFP
  },
  {
    questions: ['Q004', 'Q004_a', 'Q004_b'],
    key: 'authority' // If No CNA
  },
  {
    questions: ['Q005', 'Q005_a', 'Q005_b'],
    key: 'absCheckpoint' // If No CP
  },
  {
    questions: ['Q007', 'Q007_a'],
    key: 'measure' // If No MSR
  },
  {
    questions: ['Q010', 'Q010_a'],
    key: 'absCheckpointCommunique' // If No PROs
  },
  {
    questions: ['Q011'],
    key: 'authority' // If No CNA
  },
  {
    questions: ['Q012', 'Q012_a', 'Q012_b'],
    key: 'absPermit' // If No IRCC
  },
  {
    questions: ['Q013', 'Q013_a'],
    key: 'absNationalModelContractualClause' // If No NMCC
  },
  {
    questions: ['Q021a', 'Q021_b', 'Q021_c'],
    key: 'absCheckpointCommunique' // If No CPC
  }
]

</script>
