<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Active vs Expired
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
        Unable to load status counts.
      </div>

      <div
        v-else
        class="status-content"
      >
        <div
          class="status-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="status-chart-centre">
            <strong>{{ total.toLocaleString() }}</strong>
            <small>Total</small>
          </div>
        </div>

        <div class="status-legend">
          <button
            type="button"
            class="status-item status-button"
            :class="{ selected: selectedStatus === 'active' }"
            :aria-pressed="selectedStatus === 'active'"
            @click="selectStatus('active')"
          >
            <span class="status-dot status-dot-active" />

            <span>
              <span class="d-block fw-bold">
                Active
              </span>

              <span class="d-block">
                {{ active.toLocaleString() }}

                <small class="text-muted">
                  ({{ activePercent }}%)
                </small>
              </span>
            </span>
          </button>

          <button
            type="button"
            class="status-item status-button"
            :class="{ selected: selectedStatus === 'expired' }"
            :aria-pressed="selectedStatus === 'expired'"
            @click="selectStatus('expired')"
          >
            <span class="status-dot status-dot-expired" />

            <span>
              <span class="d-block fw-bold">
                Expired
              </span>

              <span class="d-block">
                {{ expired.toLocaleString() }}

                <small class="text-muted">
                  ({{ expiredPercent }}%)
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

type IrccStatus = 'active' | 'expired'

const PERCENT_SCALE = 100
const RESULT_ROWS = 1

const STATUS_FILTER_ID = 'ircc-status'

const ACTIVE_QUERY =
  '((*:* NOT dateOfExpiry_dt:*) OR dateOfExpiry_dt:[NOW TO *])'

const EXPIRED_QUERY =
  'dateOfExpiry_dt:[* TO NOW]'

const ACTIVE_COLOUR = '#198754'
const EXPIRED_COLOUR = '#dc3545'
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

const active = ref(0)
const expired = ref(0)
const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  active.value + expired.value
)

const selectedStatus = computed<IrccStatus | null>(() => {
  const { value: filterValues } = filters

  const selectedFilter = filterValues.find(
    ({ id }) => id === STATUS_FILTER_ID
  )

  if (!selectedFilter) {
    return null
  }

  const { value } = selectedFilter

  if (
    value === 'active' ||
    value === 'expired'
  ) {
    return value
  }

  return null
})

const activePercent = computed(() => {
  if (total.value === 0) {
    return 0
  }

  return Math.round(
    (active.value / total.value) * PERCENT_SCALE
  )
})

const expiredPercent = computed(() => {
  if (total.value === 0) {
    return 0
  }

  return PERCENT_SCALE - activePercent.value
})

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  return `conic-gradient(
    ${ACTIVE_COLOUR} 0% ${activePercent.value}%,
    ${EXPIRED_COLOUR} ${activePercent.value}% 100%
  )`
})

const chartLabel = computed(() =>
  `Active ${active.value}, expired ${expired.value}`
)

function selectStatus (
  value: IrccStatus
): void {
  if (selectedStatus.value === value) {
    emit('filter-change', {
      id: STATUS_FILTER_ID,
      filter: null
    })

    return
  }

  const isActive = value === 'active'

  emit('filter-change', {
    id: STATUS_FILTER_ID,
    filter: {
      id: STATUS_FILTER_ID,
      label: isActive
        ? 'Status: Active'
        : 'Status: Expired',
      fieldQuery: isActive
        ? ACTIVE_QUERY
        : EXPIRED_QUERY,
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
      [STATUS_FILTER_ID]
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

    const [activeResult, expiredResult] =
      await Promise.all([
        solrApi.query({
          fieldQueries: [
            ...baseFieldQueries,
            ACTIVE_QUERY
          ],
          query: '*:*',
          fields: 'id',
          rowsPerPage: RESULT_ROWS
        }),

        solrApi.query({
          fieldQueries: [
            ...baseFieldQueries,
            EXPIRED_QUERY
          ],
          query: '*:*',
          fields: 'id',
          rowsPerPage: RESULT_ROWS
        })
      ])

    const {
      response: activeResponse
    } = activeResult

    const {
      response: expiredResponse
    } = expiredResult

    const {
      numFound: activeCount
    } = activeResponse

    const {
      numFound: expiredCount
    } = expiredResponse

    active.value = activeCount
    expired.value = expiredCount
  } catch {
    active.value = 0
    expired.value = 0
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
.status-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
}

.status-chart {
  position: relative;
  width: 150px;
  height: 150px;
  flex: 0 0 150px;
  border-radius: 50%;
}

.status-chart-centre {
  position: absolute;
  inset: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
}

.status-chart-centre strong {
  font-size: 1.5rem;
}

.status-chart-centre small {
  color: #6c757d;
}

.status-legend {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-button {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  color: inherit;
  text-align: left;
}

.status-button:hover,
.status-button:focus-visible {
  background-color: #f8f9fa;
}

.status-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.status-button.selected {
  border-color: #6c757d;
  background-color: #f8f9fa;
}

.status-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  border-radius: 50%;
}

.status-dot-active {
  background-color: #198754;
}

.status-dot-expired {
  background-color: #dc3545;
}

@media (max-width: 575.98px) {
  .status-content {
    flex-direction: column;
  }
}
</style>
