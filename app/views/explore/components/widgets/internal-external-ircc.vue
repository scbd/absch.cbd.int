<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Internal vs External
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
        Unable to load PIC country type counts.
      </div>

      <div
        v-else
        class="country-type-content"
      >
        <div
          class="country-type-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="country-type-chart-centre">
            <strong>{{ total.toLocaleString() }}</strong>
            <small class="text-muted">Total</small>
          </div>
        </div>

        <div class="country-type-legend">
          <button
            type="button"
            class="country-type-item country-type-button"
            :class="{ selected: selectedType === 'internal' }"
            :aria-pressed="selectedType === 'internal'"
            @click="selectType('internal')"
          >
            <span
              class="country-type-dot country-type-dot-internal"
            />

            <span>
              <span class="d-block fw-bold">
                Internal
              </span>

              <span class="d-block">
                {{ internal.toLocaleString() }}

                <small class="text-muted">
                  ({{ internalPercent }}%)
                </small>
              </span>
            </span>
          </button>

          <button
            type="button"
            class="country-type-item country-type-button"
            :class="{ selected: selectedType === 'external' }"
            :aria-pressed="selectedType === 'external'"
            @click="selectType('external')"
          >
            <span
              class="country-type-dot country-type-dot-external"
            />

            <span>
              <span class="d-block fw-bold">
                External
              </span>

              <span class="d-block">
                {{ external.toLocaleString() }}

                <small class="text-muted">
                  ({{ externalPercent }}%)
                </small>
              </span>
            </span>
          </button>

          <button
            type="button"
            class="country-type-item country-type-button"
            :class="{ selected: selectedType === 'confidential' }"
            :aria-pressed="selectedType === 'confidential'"
            @click="selectType('confidential')"
          >
            <span
              class="country-type-dot country-type-dot-confidential"
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

type PicGrantedCountryType =
  | 'internal'
  | 'external'
  | 'confidential'

const PERCENT_SCALE = 100
const RESULT_ROWS = 1

const PIC_TYPE_FILTER_ID =
  'pic-granted-country-type'

const PIC_TYPE_FIELD =
  'picGrantedCountryType_s'

const INTERNAL_COLOUR = '#198754'
const EXTERNAL_COLOUR = '#0d6efd'
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

const internal = ref(0)
const external = ref(0)
const confidential = ref(0)
const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  internal.value +
  external.value +
  confidential.value
)

function getPercentage (count: number): number {
  if (total.value === 0) {
    return 0
  }

  return Math.round(
    (count / total.value) * PERCENT_SCALE
  )
}

const internalPercent = computed(() =>
  getPercentage(internal.value)
)

const externalPercent = computed(() =>
  getPercentage(external.value)
)

const confidentialPercent = computed(() => {
  if (total.value === 0) {
    return 0
  }

  return PERCENT_SCALE -
    internalPercent.value -
    externalPercent.value
})

const externalEndPercent = computed(() =>
  internalPercent.value + externalPercent.value
)

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  return `conic-gradient(
    ${INTERNAL_COLOUR} 0% ${internalPercent.value}%,
    ${EXTERNAL_COLOUR}
      ${internalPercent.value}%
      ${externalEndPercent.value}%,
    ${CONFIDENTIAL_COLOUR}
      ${externalEndPercent.value}%
      ${PERCENT_SCALE}%
  )`
})

const chartLabel = computed(() =>
  `Internal ${internal.value}, ` +
  `external ${external.value}, ` +
  `confidential ${confidential.value}`
)

const selectedType =
  computed<PicGrantedCountryType | null>(() => {
    const { value: filterValues } = filters

    const selectedFilter = filterValues.find(
      ({ id }) => id === PIC_TYPE_FILTER_ID
    )

    if (!selectedFilter) {
      return null
    }

    const { value } = selectedFilter

    if (
      value === 'internal' ||
      value === 'external' ||
      value === 'confidential'
    ) {
      return value
    }

    return null
  })

function getTypeLabel (
  value: PicGrantedCountryType
): string {
  if (value === 'internal') {
    return 'Internal'
  }

  if (value === 'external') {
    return 'External'
  }

  return 'Confidential'
}

function buildTypeFieldQuery (
  value: PicGrantedCountryType
): string {
  return `${PIC_TYPE_FIELD}:${value}`
}

function selectType (
  value: PicGrantedCountryType
): void {
  if (selectedType.value === value) {
    emit('filter-change', {
      id: PIC_TYPE_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: PIC_TYPE_FILTER_ID,
    filter: {
      id: PIC_TYPE_FILTER_ID,
      label: `PIC country type: ${getTypeLabel(value)}`,
      fieldQuery: buildTypeFieldQuery(value),
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
      [PIC_TYPE_FILTER_ID]
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
      internalResult,
      externalResult,
      confidentialResult
    ] = await Promise.all([
      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          buildTypeFieldQuery('internal')
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      }),

      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          buildTypeFieldQuery('external')
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      }),

      solrApi.query({
        fieldQueries: [
          ...baseFieldQueries,
          buildTypeFieldQuery('confidential')
        ],
        query: '*:*',
        fields: 'id',
        rowsPerPage: RESULT_ROWS
      })
    ])

    const {
      response: internalResponse
    } = internalResult

    const {
      response: externalResponse
    } = externalResult

    const {
      response: confidentialResponse
    } = confidentialResult

    const {
      numFound: internalCount
    } = internalResponse

    const {
      numFound: externalCount
    } = externalResponse

    const {
      numFound: confidentialCount
    } = confidentialResponse

    internal.value = internalCount
    external.value = externalCount
    confidential.value = confidentialCount
  } catch {
    internal.value = 0
    external.value = 0
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

<style scoped>
.country-type-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
}

.country-type-chart {
  position: relative;
  width: 150px;
  height: 150px;
  flex: 0 0 150px;
  border-radius: 50%;
}

.country-type-chart-centre {
  position: absolute;
  inset: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
}

.country-type-chart-centre strong {
  font-size: 1.5rem;
}

.country-type-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.country-type-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.country-type-button {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  color: inherit;
  text-align: left;
}

.country-type-button:hover,
.country-type-button:focus-visible {
  background-color: #f8f9fa;
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.country-type-button.selected {
  border-color: #6c757d;
  background-color: #f8f9fa;
}

.country-type-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  border-radius: 50%;
}

.country-type-dot-internal {
  background-color: #198754;
}

.country-type-dot-external {
  background-color: #0d6efd;
}

.country-type-dot-confidential {
  background-color: #6f42c1;
}

@media (max-width: 575.98px) {
  .country-type-content {
    flex-direction: column;
  }
}
</style>
