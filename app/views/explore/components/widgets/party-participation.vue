<template>
  <!-- Party participation
Shows the number of NP parties that have published at least one record of a selected record type
-->
  <div class="card h-100">
    <div
      class="card-body d-flex flex-column text-center"
    >
      <h5 class="card-title">
        Party participation
      </h5>

      <div
        v-if="loading"
        class="py-3 text-muted"
      >
        <i class="fa fa-cog fa-spin fa-lg" />
        Loading...
      </div>

      <div
        v-else-if="error"
        class="text-danger"
      >
        Unable to load Party participation.
      </div>

      <div
        v-else-if="totalParties === 0"
        class="py-3 text-muted"
      >
        No Nagoya Protocol Party data found.
      </div>

      <div
        v-else
        class="d-flex flex-column justify-content-center flex-grow-1"
      >
        <div class="display-4">
          {{ participationPercent }}%
        </div>

        <div class="text-muted mb-3">
          <strong class="text-body">
            {{ participatingParties.toLocaleString() }}
          </strong>
          of
          {{ totalParties.toLocaleString() }}
          Parties published at least one record
        </div>

        <div
          class="progress participation-progress"
          role="progressbar"
          :aria-label="participationLabel"
          :aria-valuenow="participationPercent"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-bar bg-success"
            :style="{
              width: `${participationPercent}%`
            }"
          />
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
import { useRealm } from '~/services/composables/realm.js'
import { useCommonjs } from '~/services/composables/commonjs.js'
import SolrApi from '~/api/solr.js'
import {
  buildExploreFieldQueries,
  type ExploreFilter
} from '../../explore-filters'

interface PartyCountry {
  code: string
  isParty: boolean
}

interface CountryCount {
  code: string
  count: number
}

const COUNTRY_FACET_FIELD =
  'government_s'

const RESULT_ROWS = 1
const FACET_LIMIT = 250
const FACET_MINIMUM_COUNT = 1
const PERCENT_SCALE = 100
const MINIMUM_PERCENT = 0
const MAXIMUM_PERCENT = 100

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
  country,
  region
} = toRefs(props)

const realm = useRealm()
const commonjs = useCommonjs()
const solrApi = new SolrApi()

const totalParties = ref(0)
const participatingParties = ref(0)
const loading = ref(true)
const error = ref(false)

const regionCountryCache =
  new Map<string, Set<string>>()

const participationPercent = computed(() => {
  if (totalParties.value === 0) {
    return MINIMUM_PERCENT
  }

  const percentage = Math.round(
    (
      participatingParties.value /
      totalParties.value
    ) * PERCENT_SCALE
  )

  return Math.min(
    MAXIMUM_PERCENT,
    Math.max(
      MINIMUM_PERCENT,
      percentage
    )
  )
})

const participationLabel = computed(() =>
  `${participatingParties.value} of ` +
  `${totalParties.value} Nagoya Protocol ` +
  'Parties published at least one record, ' +
  `${participationPercent.value} percent`
)

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
}

function isPartyCountry (
  value: unknown
): value is PartyCountry {
  if (!isRecord(value)) {
    return false
  }

  const {
    code,
    isParty
  } = value

  return typeof code === 'string' &&
    typeof isParty === 'boolean'
}

function getPartyCountries (
  value: unknown
): PartyCountry[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter(isPartyCountry)
    .filter(
      ({ isParty }) =>
        isParty
    )
}

function getRelatedCountryCodes (
  value: unknown
): Set<string> {
  if (!isRecord(value)) {
    return new Set()
  }

  const {
    expandedRelatedTerms
  } = value

  if (!Array.isArray(expandedRelatedTerms)) {
    return new Set()
  }

  const countryCodes = expandedRelatedTerms
    .filter(
      (term): term is string =>
        typeof term === 'string'
    )
    .map(term => term.toLowerCase())

  return new Set(countryCodes)
}

async function loadRegionCountryCodes (
  regionId: string | undefined
): Promise<Set<string> | null> {
  if (
    regionId === undefined ||
    regionId === ''
  ) {
    return null
  }

  const cachedCodes =
    regionCountryCache.get(regionId)

  if (cachedCodes !== undefined) {
    return cachedCodes
  }

  const encodedRegionId =
    encodeURIComponent(regionId)

  const response = await fetch(
    '/api/v2013/thesaurus/terms/' +
    `${encodedRegionId}?relations`
  )

  if (!response.ok) {
    throw new Error(
      'Unable to load region relations'
    )
  }

  const relationValues: unknown =
    await response.json()

  const countryCodes =
    getRelatedCountryCodes(relationValues)

  regionCountryCache.set(
    regionId,
    countryCodes
  )

  return countryCodes
}

function scopeParties (
  parties: readonly PartyCountry[],
  selectedCountry: string | undefined,
  regionCountryCodes: Set<string> | null
): PartyCountry[] {
  if (
    selectedCountry !== undefined &&
    selectedCountry !== ''
  ) {
    const selectedCountryCode =
      selectedCountry.toLowerCase()

    return parties.filter(
      ({ code }) =>
        code.toLowerCase() ===
        selectedCountryCode
    )
  }

  if (regionCountryCodes !== null) {
    return parties.filter(
      ({ code }) =>
        regionCountryCodes.has(
          code.toLowerCase()
        )
    )
  }

  return [...parties]
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

  const facetEntry = Object.entries(
    facetFields
  ).find(
    ([fieldName]) =>
      fieldName === COUNTRY_FACET_FIELD
  )

  if (facetEntry === undefined) {
    return []
  }

  const [
    ,
    facetValues
  ] = facetEntry

  return Array.isArray(facetValues)
    ? facetValues
    : []
}

function parseCountryCounts (
  values: readonly unknown[]
): CountryCount[] {
  const countryCounts: CountryCount[] = []

  for (
    let index = 0;
    index < values.length;
    index += 2
  ) {
    const [
      code,
      count
    ] = values.slice(
      index,
      index + 2
    )

    if (
      typeof code !== 'string' ||
      typeof count !== 'number'
    ) {
      continue
    }

    countryCounts.push({
      code: code.toLowerCase(),
      count
    })
  }

  return countryCounts
}

function buildFieldQueries (): string[] {
  return [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filters.value
    )
  ]
}

function countParticipatingParties (
  parties: readonly PartyCountry[],
  countryCounts: readonly CountryCount[]
): number {
  const publishingCountries = new Set(
    countryCounts
      .filter(
        ({ count }) => count > 0
      )
      .map(
        ({ code }) => code
      )
  )

  return parties.filter(
    ({ code }) =>
      publishingCountries.has(
        code.toLowerCase()
      )
  ).length
}

async function loadParticipation (): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const result = await solrApi.query({
      fieldQueries: buildFieldQueries(),
      query: '*:*',
      fields: 'id',
      rowsPerPage: RESULT_ROWS,
      facetFields: COUNTRY_FACET_FIELD,
      facetLimit: FACET_LIMIT,
      facetMinCount:
        FACET_MINIMUM_COUNT,
      facetSort: 'count'
    })

    const [
      countryValues,
      regionCountryCodes
    ] = await Promise.all([
      Promise.resolve(
        commonjs.getCountries()
      ).catch(() => []),
      loadRegionCountryCodes(
        region.value
      ).catch(() => null)
    ])

    const allParties =
      getPartyCountries(countryValues)

    const scopedParties =
      scopeParties(
        allParties,
        country.value,
        regionCountryCodes
      )

    const countryCounts =
      parseCountryCounts(
        getFacetValues(result)
      )

    const { length: partyCount } = scopedParties
    totalParties.value =
      partyCount

    participatingParties.value =
      countParticipatingParties(
        scopedParties,
        countryCounts
      )
  } catch {
    totalParties.value = 0
    participatingParties.value = 0
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  [
    schema,
    filters,
    country,
    region
  ],
  async () => {
    await loadParticipation()
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.participation-progress {
  height: 0.75rem;
}
</style>
