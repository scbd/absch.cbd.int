<template>
  <!-- displays top user countries for irccs based on the country of the entity granted PIC -->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Top 10 countries where users are located
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
        Unable to load user-country counts.
      </div>

      <div
        v-else-if="countries.length === 0"
        class="py-4 text-center text-muted"
      >
        No user-country data found.
      </div>

      <div
        v-else
        class="d-flex flex-column gap-1 pt-3"
      >
        <button
          v-for="(countryItem, index) in countries"
          :key="countryItem.name"
          type="button"
          class="country-row"
          :class="{
            selected:
              selectedCountry === countryItem.name
          }"
          :aria-pressed="
            selectedCountry === countryItem.name
          "
          @click="selectCountry(countryItem)"
        >
          <span class="text-muted text-end">
            {{ index + RANK_OFFSET }}
          </span>

          <span
            class="country-name"
            :title="countryItem.name"
          >
            {{ countryItem.name }}
          </span>

          <span class="progress">
            <span
              class="progress-bar bg-success"
              role="progressbar"
              :style="{
                width:
                  `${getBarWidth(countryItem.count)}%`
              }"
              :aria-valuenow="countryItem.count"
              aria-valuemin="0"
              :aria-valuemax="maximumCount"
            />
          </span>

          <span class="fw-semibold text-end">
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
import { useRealm } from '~/services/composables/realm.js'
import SolrApi from '~/api/solr.js'
import {
  buildExploreFieldQueries,
  type ExploreFilter,
  type ExploreFilterChange
} from '../../explore-filters'

interface CountryCount {
  name: string
  count: number
}

const COUNTRY_FILTER_ID = 'user-country'

const COUNTRY_FACET_FIELD =
  'entitiesToWhomPICGrantedCountries_EN_ss'

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

const realm = useRealm()
const solrApi = new SolrApi()

const countries = ref<CountryCount[]>([])
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

const selectedCountry = computed<string | null>(() => {
  const { value: filterValues } = filters

  const selectedFilter = filterValues.find(
    ({ id }) => id === COUNTRY_FILTER_ID
  )

  if (!selectedFilter) {
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
  return typeof value === 'object' && value !== null
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
  let pendingName: string | null = null

  values.forEach(value => {
    if (typeof value === 'string') {
      pendingName = value
      return
    }

    if (
      typeof value === 'number' &&
      pendingName !== null
    ) {
      countryCounts.push({
        name: pendingName,
        count: value
      })

      pendingName = null
    }
  })

  return countryCounts
}

function escapeSolrPhrase (
  value: string
): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
}

function buildCountryQuery (
  name: string
): string {
  const escapedName = escapeSolrPhrase(name)

  return `${COUNTRY_FACET_FIELD}:"${escapedName}"`
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
  const { name } = countryItem

  if (selectedCountry.value === name) {
    emit('filter-change', {
      id: COUNTRY_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: COUNTRY_FILTER_ID,
    filter: {
      id: COUNTRY_FILTER_ID,
      label: `User country: ${name}`,
      fieldQuery: buildCountryQuery(name),
      value: name
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
    country.value
  ) {
    fieldQueries.push(
      `government_s:${country.value}`
    )
  }

  if (
    scope.value === 'region' &&
    region.value
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
    const result: unknown = await solrApi.query({
      fieldQueries: buildBaseFieldQueries(),
      query: '*:*',
      fields: 'id',
      rowsPerPage: RESULT_ROWS,
      facetFields: COUNTRY_FACET_FIELD,
      facetLimit: FACET_LIMIT,
      facetMinCount: FACET_MINIMUM_COUNT,
      facetSort: 'count'
    })

    countries.value = parseCountryCounts(
      getFacetValues(result)
    )
  } catch {
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
.country-row {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) 2fr 4rem;  gap: 0.75rem;
  align-items: center;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background-color: transparent;
  color: inherit;
  text-align: left;
}
.country-name {
  min-width: 0;
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.progress {
  height: 0.75rem;
}
</style>
