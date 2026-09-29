<template>
  <!-- compares commercial vs non-commercial vs confidential -->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Usage type
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
        Unable to load usage-type counts.
      </div>

      <div
        v-else
        class="usage-type-content"
      >
        <div
          class="usage-type-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="usage-type-chart-centre">
            <strong>{{ total.toLocaleString() }}</strong>
            <small>Total</small>
          </div>
        </div>

        <div class="usage-type-legend">
          <button
            type="button"
            class="usage-type-item usage-type-button"
            :class="{
              selected: selectedType === 'commercial'
            }"
            :aria-pressed="
              selectedType === 'commercial'
            "
            @click="selectType('commercial')"
          >
            <span
              class="usage-type-dot usage-type-dot-commercial"
            />

            <span>
              <span class="d-block fw-bold">
                Commercial
              </span>

              <span class="d-block">
                {{ commercial.toLocaleString() }}

                <small class="text-muted">
                  ({{ commercialPercent }}%)
                </small>
              </span>
            </span>
          </button>

          <button
            type="button"
            class="usage-type-item usage-type-button"
            :class="{
              selected: selectedType === 'non-commercial'
            }"
            :aria-pressed="
              selectedType === 'non-commercial'
            "
            @click="selectType('non-commercial')"
          >
            <span
              class="usage-type-dot usage-type-dot-non-commercial"
            />

            <span>
              <span class="d-block fw-bold">
                Non-commercial
              </span>

              <span class="d-block">
                {{ nonCommercial.toLocaleString() }}

                <small class="text-muted">
                  ({{ nonCommercialPercent }}%)
                </small>
              </span>
            </span>
          </button>

          <button
            type="button"
            class="usage-type-item usage-type-button"
            :class="{
              selected: selectedType === 'confidential'
            }"
            :aria-pressed="
              selectedType === 'confidential'
            "
            @click="selectType('confidential')"
          >
            <span
              class="usage-type-dot usage-type-dot-confidential"
            />

            <span>
              <span class="d-block fw-bold">
                Confidential
              </span>

              <span class="d-block">
                {{ confidential.toLocaleString() }}

                <small class="text-muted">
                  ({{ confidentialPercent }}%)
                </small>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { useRealm } from '~/services/composables/realm.js'
import SolrApi from '~/api/solr.js'
import {
  buildExploreFieldQueries,
  type ExploreFilter,
  type ExploreFilterChange
} from '../../explore-filters'

type UsageType =
  | 'commercial'
  | 'non-commercial'
  | 'confidential'

const PERCENT_SCALE = 100
const RESULT_ROWS = 1

const USAGE_TYPE_FILTER_ID = 'usage-type'

const COMMERCIAL_QUERY =
  '(*:* NOT usagesConfidential_b:true) AND usages_EN_ss:"Commercial"'

const NON_COMMERCIAL_QUERY =
  '(*:* NOT usagesConfidential_b:true) AND usages_EN_ss:"Non-Commercial"'

const CONFIDENTIAL_QUERY =
  'usagesConfidential_b:true'

const COMMERCIAL_COLOUR = '#0d6efd'
const NON_COMMERCIAL_COLOUR = '#198754'
const CONFIDENTIAL_COLOUR = '#6f42c1'
const EMPTY_COLOUR = '#e9ecef'

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

const commercial = ref(0)
const nonCommercial = ref(0)
const confidential = ref(0)
const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  commercial.value +
  nonCommercial.value +
  confidential.value
)

function getPercentage (
  count: number
): number {
  if (total.value === 0) {
    return 0
  }

  return Math.round(
    (count / total.value) * PERCENT_SCALE
  )
}

const commercialPercent = computed(() =>
  getPercentage(commercial.value)
)

const nonCommercialPercent = computed(() =>
  getPercentage(nonCommercial.value)
)

const confidentialPercent = computed(() => {
  if (total.value === 0) {
    return 0
  }

  return PERCENT_SCALE -
    commercialPercent.value -
    nonCommercialPercent.value
})

const nonCommercialEndPercent = computed(() =>
  commercialPercent.value +
  nonCommercialPercent.value
)

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  return `conic-gradient(
    ${COMMERCIAL_COLOUR}
      0%
      ${commercialPercent.value}%,
    ${NON_COMMERCIAL_COLOUR}
      ${commercialPercent.value}%
      ${nonCommercialEndPercent.value}%,
    ${CONFIDENTIAL_COLOUR}
      ${nonCommercialEndPercent.value}%
      ${PERCENT_SCALE}%
  )`
})

const chartLabel = computed(() =>
  `Commercial ${commercial.value}, ` +
  `non-commercial ${nonCommercial.value}, ` +
  `confidential ${confidential.value}`
)

const selectedType =
  computed<UsageType | null>(() => {
    const { value: filterValues } = filters

    const selectedFilter = filterValues.find(
      ({ id }) => id === USAGE_TYPE_FILTER_ID
    )

    if (!selectedFilter) {
      return null
    }

    const { value } = selectedFilter

    if (
      value === 'commercial' ||
      value === 'non-commercial' ||
      value === 'confidential'
    ) {
      return value
    }

    return null
  })

function getUsageTypeLabel (
  value: UsageType
): string {
  if (value === 'commercial') {
    return 'Commercial'
  }

  if (value === 'non-commercial') {
    return 'Non-commercial'
  }

  return 'Confidential'
}

function getUsageTypeQuery (
  value: UsageType
): string {
  if (value === 'commercial') {
    return COMMERCIAL_QUERY
  }

  if (value === 'non-commercial') {
    return NON_COMMERCIAL_QUERY
  }

  return CONFIDENTIAL_QUERY
}

function selectType (
  value: UsageType
): void {
  if (selectedType.value === value) {
    emit('filter-change', {
      id: USAGE_TYPE_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: USAGE_TYPE_FILTER_ID,
    filter: {
      id: USAGE_TYPE_FILTER_ID,
      label:
        `Usage type: ${getUsageTypeLabel(value)}`,
      fieldQuery: getUsageTypeQuery(value),
      value
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
      [USAGE_TYPE_FILTER_ID]
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

async function loadCounts (): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const baseFieldQueries = buildBaseFieldQueries()

    const [
      commercialResult,
      nonCommercialResult,
      confidentialResult
    ] = await Promise.all([
      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          COMMERCIAL_QUERY
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      }),

      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          NON_COMMERCIAL_QUERY
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      }),

      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          CONFIDENTIAL_QUERY
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      })
    ])

    const {
      response: commercialResponse
    } = commercialResult

    const {
      response: nonCommercialResponse
    } = nonCommercialResult

    const {
      response: confidentialResponse
    } = confidentialResult

    const {
      numFound: commercialCount
    } = commercialResponse

    const {
      numFound: nonCommercialCount
    } = nonCommercialResponse

    const {
      numFound: confidentialCount
    } = confidentialResponse

    commercial.value = commercialCount
    nonCommercial.value = nonCommercialCount
    confidential.value = confidentialCount
  } catch {
    commercial.value = 0
    nonCommercial.value = 0
    confidential.value = 0
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
    await loadCounts()
  },
  {
    immediate: true
  }
)
</script>

<style
  scoped
  src="./usage-type-ircc.css"
></style>
