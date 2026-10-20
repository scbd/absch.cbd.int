<template>
  <!--
  Shows how many matching CPCs name the selected country as their source country, with top publishing countries; selecting a publisher switches the country filter.
  Displayed only for CPCs in country scope; hidden for other record types or scopes. A country must be selected to load results.
  -->
  <div class="card h-100 cpcs-received">
    <div class="card-body d-flex flex-column text-center">
      <h5 class="card-title mb-0">
        <strong class="text-body"><u>{{ total.toLocaleString() }}</u></strong>
        CPCs identify
        <strong class="text-body">
          <u>{{ selectedCountryName }}</u>
        </strong>
        as a source country (CPC received)
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
        class="d-flex flex-column flex-grow-1 py-3"
      >
        <div
          v-if="publishingCountries.length > 0"
          class="mt-2 text-start"
        >
          <div class="cpcs-received-country-list">
            <button
              v-for="(countryItem, index) in publishingCountries"
              :key="countryItem.code"
              type="button"
              class="cpcs-received-country-row"
              :class="{
                selected:
                  selectedCountryCode ===
                  countryItem.code
              }"
              :aria-pressed="
                selectedCountryCode ===
                  countryItem.code
              "
              :aria-label="
                `Filter by ${getCountryName(countryItem.code)}: ` +
                  `${countryItem.count} CPCs`
              "
              @click="selectPublishingCountry(countryItem)"
            >
              <span class="cpcs-received-country-rank">
                {{ index + RANK_OFFSET }}
              </span>

              <span class="cpcs-received-country-name">
                {{ getCountryName(countryItem.code) }}
              </span>

              <span class="cpcs-received-country-bar-area">
                <span
                  class="cpcs-received-country-bar"
                  :style="{
                    width:
                      `${getBarWidth(countryItem.count)}%`
                  }"
                />
              </span>

              <span class="cpcs-received-country-count">
                {{ countryItem.count.toLocaleString() }}
              </span>
            </button>
          </div>
        </div>

        <div class="mt-auto pt-3">
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click="viewRecords"
          >
            <i
              class="fa fa-list me-2"
              aria-hidden="true"
            />
            {{ t('viewRecords') }}
          </button>
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
import messages from '~/app-text/views/explore/explore.json'
import SolrApi from '~/api/solr.js'
import {
  getCountryOptions,
  getGeographyOptionLabel,
  type GeographyOption
} from '../../explore-regions'
import {
  buildExploreFieldQueries,
  type ExploreFilter,
  type ExploreFilterChange
} from '../../explore-filters'

interface CountryCount {
  code: string
  count: number
}

const DASHBOARD_COUNTRY_FILTER_ID =
  'dashboard-country'

const SOURCE_COUNTRY_FIELD =
  'sourceCountries_ss'

const PUBLISHING_COUNTRY_FIELD =
  'government_s'

const RESULT_ROWS = 1
const FACET_LIMIT = 10
const FACET_MINIMUM_COUNT = 1
const MAXIMUM_BAR_WIDTH = 100
const MINIMUM_DIVISOR = 1
const RANK_OFFSET = 1

const props = defineProps<{
  schema: string
  scope: string
  filters: ExploreFilter[]
  country?: string
  region?: string
}>()

const emit = defineEmits<{
  'filter-change': [change: ExploreFilterChange]
  'view-records': [countryCode: string]
}>()

const {
  schema,
  filters,
  country
} = toRefs(props)

const {
  locale,
  t
} = useI18n({
  messages
})
const realm = useRealm()
const commonjs = useCommonjs()
const solrApi = new SolrApi()

const countryOptions =
  ref<GeographyOption[]>([])

const publishingCountries =
  ref<CountryCount[]>([])

const maximumCount = computed(() => {
  const counts = publishingCountries.value.map(
    ({ count }) => count
  )

  return Math.max(
    MINIMUM_DIVISOR,
    ...counts
  )
})

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

function getCountryName (
  code: string
): string {
  const option = countryOptions.value.find(
    ({ id }) =>
      id.toLowerCase() === code.toLowerCase()
  )

  return getGeographyOptionLabel(
    option,
    locale.value,
    code.toUpperCase()
  )
}

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

function getFacetValues (
  value: unknown
): unknown[] {
  if (!isRecord(value)) {
    return []
  }

  const { facet_counts: facetCounts } = value
  if (!isRecord(facetCounts)) {
    return []
  }

  const { facet_fields: facetFields } = facetCounts
  if (!isRecord(facetFields)) {
    return []
  }

  const {
    [PUBLISHING_COUNTRY_FIELD]: facetValues
  } = facetFields

  return Array.isArray(facetValues)
    ? facetValues
    : []
}

function parsePublishingCountries (
  values: readonly unknown[]
): CountryCount[] {
  const countryCounts: CountryCount[] = []
  let pendingCode: string | null = null

  values.forEach(value => {
    if (typeof value === 'string') {
      pendingCode = value.toLowerCase()
      return
    }

    if (
      typeof value === 'number' &&
      pendingCode !== null
    ) {
      countryCounts.push({
        code: pendingCode,
        count: value
      })
      pendingCode = null
    }
  })

  return countryCounts
}

function getBarWidth (
  count: number
): number {
  return Math.round(
    (count / maximumCount.value) *
    MAXIMUM_BAR_WIDTH
  )
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

function selectPublishingCountry (
  countryItem: CountryCount
): void {
  const { code } = countryItem

  emit('filter-change', {
    id: DASHBOARD_COUNTRY_FILTER_ID,
    filter: {
      id: DASHBOARD_COUNTRY_FILTER_ID,
      label: `Country: ${getCountryName(code)}`,
      fieldQuery: `${PUBLISHING_COUNTRY_FIELD}:${code}`,
      value: code
    }
  })
}

function viewRecords (): void {
  const { value: countryCode } = selectedCountryCode

  if (countryCode === null) {
    return
  }

  emit('view-records', countryCode)
}

async function loadTotal (): Promise<void> {
  const { value: countryCode } = selectedCountryCode

  if (countryCode === null) {
    total.value = 0
    publishingCountries.value = []
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
      rowsPerPage: RESULT_ROWS,
      facetFields: PUBLISHING_COUNTRY_FIELD,
      facetLimit: FACET_LIMIT,
      facetMinCount: FACET_MINIMUM_COUNT,
      facetSort: 'count'
    })

    const { response } = result
    const { numFound } = response

    total.value = numFound
    publishingCountries.value =
      parsePublishingCountries(
        getFacetValues(result)
      )
  } catch {
    total.value = 0
    publishingCountries.value = []
    error.value = true
  } finally {
    loading.value = false
  }
}

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
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

<style src="./cpcs-received.css" />
