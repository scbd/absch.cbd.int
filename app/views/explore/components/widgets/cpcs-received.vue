<template>
  <!--
CPC received by a country
appliable records: cpc
scope - only shown when a country is selected.

A CPC is a message that a user country sends to a provide country.
When a (provider) country is selectd - CPC received shows the number of CPCs published by users countries with the source country being the country selected.
-->
  <div class="card h-100">
    <div class="card-body d-flex flex-column text-center">
      <h5 class="card-title mb-0">
        Checkpoint communiqués received
      </h5>

      <div
        v-if="selectedCountryCode === null"
        class="d-flex flex-column justify-content-center flex-grow-1 py-3 text-muted"
      >
        <i
          class="fa fa-globe fa-2x mb-2"
          aria-hidden="true"
        />

        Select a country to view CPCs received.
      </div>

      <div
        v-else-if="loading"
        class="d-flex flex-column justify-content-center flex-grow-1 py-3 text-muted"
        aria-busy="true"
      >
        <i class="fa fa-cog fa-spin fa-lg mb-2" />
        Loading...
      </div>

      <div
        v-else-if="error"
        class="alert alert-danger small mb-0 mt-3"
        role="alert"
      >
        Unable to load CPCs received.
      </div>

      <div
        v-else
        class="d-flex flex-column justify-content-center flex-grow-1 py-3"
      >
        <div class="display-4 fw-semibold lh-1 mb-2">
          {{ total.toLocaleString() }}
        </div>

        <div class="text-muted">
          CPCs identifying
          <strong class="text-body">
            {{ selectedCountryName }}
          </strong>
          as a source country
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  toRefs,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRealm } from '~/services/composables/realm.js'
import { useCommonjs } from '~/services/composables/commonjs.js'
import SolrApi from '~/api/solr.js'
import {
  getCountryOptions,
  getGeographyOptionLabel,
  type GeographyOption
} from '../../explore-regions'
import {
  buildExploreFieldQueries,
  type ExploreFilter
} from '../../explore-filters'

const DASHBOARD_COUNTRY_FILTER_ID =
  'dashboard-country'

const SOURCE_COUNTRY_FIELD =
  'sourceCountries_ss'

const RESULT_ROWS = 1

const props = defineProps<{
  schema: string
  scope: string
  filters: ExploreFilter[]
  country?: string
  region?: string
}>()

const {
  schema,
  filters,
  country
} = toRefs(props)

const { locale } = useI18n()
const realm = useRealm()
const commonjs = useCommonjs()
const solrApi = new SolrApi()

const countryOptions =
  ref<GeographyOption[]>([])

const total = ref(0)
const loading = ref(false)
const error = ref(false)

const selectedCountryCode =
  computed<string | null>(() => {
    const { value: countryCode } = country

    if (
      countryCode === undefined ||
      countryCode === ''
    ) {
      return null
    }

    return countryCode.toLowerCase()
  })

const selectedCountryOption =
  computed<GeographyOption | undefined>(() => {
    const { value: countryCode } = selectedCountryCode

    if (countryCode === null) {
      return undefined
    }

    const { value: options } = countryOptions
    return options.find(
      ({ id }) =>
        id.toLowerCase() === countryCode
    )
  })

const selectedCountryName = computed(() => {
  const { value: countryCode } = selectedCountryCode

  if (countryCode === null) {
    return ''
  }

  return getGeographyOptionLabel(
    selectedCountryOption.value,
    locale.value,
    countryCode.toUpperCase()
  )
})

function buildSourceCountryQuery (
  countryCode: string
): string {
  return (
    `${SOURCE_COUNTRY_FIELD}:` +
    countryCode.toLowerCase()
  )
}

function buildBaseFieldQueries (): string[] {
  return [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filters.value,
      [DASHBOARD_COUNTRY_FILTER_ID]
    )
  ]
}

async function loadCountryOptions (): Promise<void> {
  if (countryOptions.value.length > 0) {
    return
  }

  const countryValues: unknown =
    await Promise.resolve(
      commonjs.getCountries()
    )

  countryOptions.value =
    getCountryOptions(countryValues)
}

async function loadTotal (): Promise<void> {
  const { value: countryCode } = selectedCountryCode

  if (countryCode === null) {
    total.value = 0
    loading.value = false
    error.value = false
    return
  }

  loading.value = true
  error.value = false

  try {
    await loadCountryOptions()

    const result = await solrApi.query({
      fieldQueries: [
        ...buildBaseFieldQueries(),
        buildSourceCountryQuery(countryCode)
      ],
      query: '*:*',
      fields: 'id',
      rowsPerPage: RESULT_ROWS
    })

    const { response } = result
    const { numFound } = response

    total.value = numFound
  } catch {
    total.value = 0
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  [
    schema,
    filters,
    country
  ],
  async () => {
    await loadTotal()
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.card-body {
  min-height: 11rem;
}
</style>
