<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Top publishing countries
      </h5>

      <div
        v-if="loading"
        class="py-4 text-center text-muted"
      >
        <i class="fa fa-cog fa-spin fa-lg" />
        Loading...
      </div>

      <div
        v-else-if="error"
        class="alert alert-danger mb-0"
      >
        Unable to load publishing-country counts.
      </div>

      <div
        v-else-if="countries.length === 0"
        class="py-4 text-center text-muted"
      >
        No publishing-country data found.
      </div>

      <div
        v-else
        class="country-list"
      >
        <button
          v-for="(countryItem, index) in countries"
          :key="countryItem.code"
          type="button"
          class="country-row"
          :class="{
            selected:
              selectedCountryCode ===
              countryItem.code
          }"
          :aria-pressed="
            selectedCountryCode ===
              countryItem.code
          "
          @click="selectCountry(countryItem)"
        >
          <span class="country-rank">
            {{ index + RANK_OFFSET }}
          </span>

          <span class="country-name">
            {{ getCountryName(countryItem.code) }}
          </span>

          <span class="country-bar-area">
            <span
              class="country-bar"
              :style="{
                width:
                  `${getBarWidth(countryItem.count)}%`
              }"
            />
          </span>

          <span class="country-count">
            {{ countryItem.count.toLocaleString() }}
          </span>
        </button>
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
  type ExploreFilter,
  type ExploreFilterChange
} from '../../explore-filters'

interface CountryCount {
  code: string
  count: number
}

const COUNTRY_FILTER_ID =
  'publishing-country'

const COUNTRY_FACET_FIELD =
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
}>()

const {
  schema,
  scope,
  filters,
  country,
  region
} = toRefs(props)

const { locale } = useI18n()
const realm = useRealm()
const commonjs = useCommonjs()
const solrApi = new SolrApi()

const countries = ref<CountryCount[]>([])

const countryOptions =
  ref<GeographyOption[]>([])

const loading = ref(true)
const error = ref(false)

const maximumCount = computed(() => {
  const counts = countries.value.map(
    ({ count }) => count
  )

  return Math.max(
    MINIMUM_DIVISOR,
    ...counts
  )
})

const selectedCountryCode =
  computed<string | null>(() => {
    const { value: filterValues } = filters

    const selectedFilter = filterValues.find(
      ({ id }) => id === COUNTRY_FILTER_ID
    )

    if (selectedFilter === undefined) {
      return null
    }

    const { value } = selectedFilter

    return typeof value === 'string'
      ? value
      : null
  })

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
}

function getCountryOption (
  code: string
): GeographyOption | undefined {
  const normalisedCode = code.toLowerCase()

  return countryOptions.value.find(
    ({ id }) =>
      id.toLowerCase() === normalisedCode
  )
}

function getCountryName (
  code: string
): string {
  return getGeographyOptionLabel(
    getCountryOption(code),
    locale.value,
    code.toUpperCase()
  )
}

function getFacetValues (
  value: unknown
): unknown[] {
  if (!isRecord(value)) {
    return []
  }

  const {
    facet_counts: facetCounts
  } = value

  if (!isRecord(facetCounts)) {
    return []
  }

  const {
    facet_fields: facetFields
  } = facetCounts

  if (!isRecord(facetFields)) {
    return []
  }

  const {
    [COUNTRY_FACET_FIELD]: facetValues
  } = facetFields

  return Array.isArray(facetValues)
    ? facetValues
    : []
}

function parseCountryCounts (
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

function selectCountry (
  countryItem: CountryCount
): void {
  const { code } = countryItem

  if (selectedCountryCode.value === code) {
    emit('filter-change', {
      id: COUNTRY_FILTER_ID,
      filter: null
    })

    return
  }

  const countryName = getCountryName(code)

  emit('filter-change', {
    id: COUNTRY_FILTER_ID,
    filter: {
      id: COUNTRY_FILTER_ID,
      label:
        `Publishing country: ${countryName}`,
      fieldQuery:
        `${COUNTRY_FACET_FIELD}:${code}`,
      value: code
    }
  })
}

function buildBaseFieldQueries (): string[] {
  const { value: filterValues } = filters

  const fieldQueries = [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filterValues,
      [COUNTRY_FILTER_ID]
    )
  ]

  if (
    scope.value === 'country' &&
    country.value !== undefined
  ) {
    fieldQueries.push(
      `government_s:${country.value}`
    )
  }

  if (
    scope.value === 'region' &&
    region.value !== undefined
  ) {
    fieldQueries.push(
      `countryRegions_REL_ss:${region.value}`
    )
  }

  return fieldQueries
}

async function loadCountries (): Promise<void> {
  loading.value = true
  error.value = false
  countries.value = []

  try {
    const [
      result,
      availableCountries
    ] = await Promise.all([
      solrApi.query({
        fieldQueries: buildBaseFieldQueries(),
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS,
        facetFields: COUNTRY_FACET_FIELD,
        facetLimit: FACET_LIMIT,
        facetMinCount: FACET_MINIMUM_COUNT,
        facetSort: 'count'
      }),
      Promise.resolve(
        commonjs.getCountries()
      )
    ])

    countryOptions.value =
      getCountryOptions(availableCountries)

    countries.value = parseCountryCounts(
      getFacetValues(result)
    )
  } catch {
    countryOptions.value = []
    countries.value = []
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  [
    schema,
    scope,
    filters,
    country,
    region
  ],
  async () => {
    await loadCountries()
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.country-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.75rem;
}

.country-row {
  display: grid;
  grid-template-columns:
    2rem minmax(8rem, 1.4fr) 1fr 4rem;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background-color: transparent;
  color: inherit;
  text-align: left;
}

.country-row:hover,
.country-row:focus-visible {
  background-color: #f8f9fa;
}

.country-row:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

.country-row.selected {
  border-color: #0d6efd;
  background-color: #e7f1ff;
}

.country-rank {
  color: #6c757d;
  text-align: right;
}

.country-name {
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.country-bar-area {
  height: 0.75rem;
  overflow: hidden;
  border-radius: 0.25rem;
  background-color: #e9ecef;
}

.country-bar {
  display: block;
  height: 100%;
  border-radius: 0.25rem;
  background-color: #198754;
}

.country-row.selected .country-bar {
  background-color: #0d6efd;
}

.country-count {
  font-weight: 600;
  text-align: right;
}
</style>
