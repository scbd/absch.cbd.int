<template>
  <!-- IRCC availability
Applicable records: cpc
Compares the number of CPC that reference an IRCC and those that do not.
-->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        IRCC availability
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
        Unable to load IRCC availability counts.
      </div>

      <div
        v-else-if="total === 0"
        class="py-4 text-center text-muted"
      >
        No IRCC availability data found.
      </div>

      <div
        v-else
        class="availability-content"
      >
        <div
          class="availability-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="availability-chart-centre">
            <strong>
              {{ total.toLocaleString() }}
            </strong>

            <small>
              Total
            </small>
          </div>
        </div>

        <div class="availability-legend">
          <button
            v-for="item in availabilityCounts"
            :key="item.type"
            type="button"
            class="availability-button"
            :class="{
              selected:
                selectedType === item.type
            }"
            :aria-pressed="
              selectedType === item.type
            "
            @click="selectType(item)"
          >
            <span
              class="availability-dot"
              :style="{
                backgroundColor: item.colour
              }"
            />

            <span>
              <span class="d-block fw-bold">
                {{ item.label }}
              </span>

              <span class="d-block">
                {{ item.count.toLocaleString() }}

                <small class="text-muted">
                  ({{ getPercentage(item.count) }}%)
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

type AvailabilityType =
  | 'available'
  | 'not-available'

interface AvailabilityCount {
  type: AvailabilityType
  label: string
  query: string
  colour: string
  count: number
}

const AVAILABILITY_FILTER_ID =
  'ircc-availability-cpc'

const IRCC_REFERENCE_FIELD =
  'absIRCCs_ss'

const AVAILABLE_QUERY =
  `${IRCC_REFERENCE_FIELD}:[* TO *]`

const NOT_AVAILABLE_QUERY =
  `-${IRCC_REFERENCE_FIELD}:[* TO *]`

const AVAILABLE_COLOUR = '#198754'
const NOT_AVAILABLE_COLOUR = '#dc3545'
const EMPTY_COLOUR = '#e9ecef'

const RESULT_ROWS = 1
const PERCENT_SCALE = 100

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
  filters
} = toRefs(props)

const realm = useRealm()
const solrApi = new SolrApi()

const availabilityCounts =
  ref<AvailabilityCount[]>([])

const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  availabilityCounts.value.reduce(
    (sum, { count }) => sum + count,
    0
  )
)

const selectedType =
  computed<AvailabilityType | null>(() => {
    const selectedFilter =
      filters.value.find(
        ({ id }) =>
          id === AVAILABILITY_FILTER_ID
      )

    if (selectedFilter === undefined) {
      return null
    }

    const { value } = selectedFilter

    if (
      value === 'available' ||
      value === 'not-available'
    ) {
      return value
    }

    return null
  })

const availablePercent = computed(() => {
  if (total.value === 0) {
    return 0
  }

  const availableItem =
    availabilityCounts.value.find(
      ({ type }) =>
        type === 'available'
    )

  if (availableItem === undefined) {
    return 0
  }

  return (
    availableItem.count /
    total.value
  ) * PERCENT_SCALE
})

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  return `conic-gradient(
    ${AVAILABLE_COLOUR}
      0%
      ${availablePercent.value}%,
    ${NOT_AVAILABLE_COLOUR}
      ${availablePercent.value}%
      ${PERCENT_SCALE}%
  )`
})

const chartLabel = computed(() =>
  availabilityCounts.value
    .map(
      ({ label, count }) =>
        `${label} ${count}`
    )
    .join(', ')
)

function getPercentage (
  count: number
): number {
  if (total.value === 0) {
    return 0
  }

  return Math.round(
    (count / total.value) *
    PERCENT_SCALE
  )
}

function selectType (
  item: AvailabilityCount
): void {
  const {
    type,
    label,
    query
  } = item

  if (selectedType.value === type) {
    emit('filter-change', {
      id: AVAILABILITY_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: AVAILABILITY_FILTER_ID,
    filter: {
      id: AVAILABILITY_FILTER_ID,
      label: `IRCC: ${label}`,
      fieldQuery: query,
      value: type
    }
  })
}

function buildBaseFieldQueries (): string[] {
  return [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filters.value,
      [AVAILABILITY_FILTER_ID]
    )
  ]
}

async function getCount (
  fieldQueries: string[],
  availabilityQuery: string
): Promise<number> {
  const result = await solrApi.query({
    fieldQueries: [
      ...fieldQueries,
      availabilityQuery
    ],
    query: '*:*',
    fields: 'id',
    rowsPerPage: RESULT_ROWS
  })

  const { response } = result
  const { numFound } = response

  return numFound
}

async function loadCounts (): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const fieldQueries =
      buildBaseFieldQueries()

    const [
      availableCount,
      notAvailableCount
    ] = await Promise.all([
      getCount(
        fieldQueries,
        AVAILABLE_QUERY
      ),
      getCount(
        fieldQueries,
        NOT_AVAILABLE_QUERY
      )
    ])

    availabilityCounts.value = [
      {
        type: 'available',
        label: 'IRCC available',
        query: AVAILABLE_QUERY,
        colour: AVAILABLE_COLOUR,
        count: availableCount
      },
      {
        type: 'not-available',
        label: 'IRCC not available',
        query: NOT_AVAILABLE_QUERY,
        colour: NOT_AVAILABLE_COLOUR,
        count: notAvailableCount
      }
    ]
  } catch {
    availabilityCounts.value = []
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  [
    schema,
    filters
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
  src="./ircc-availability-cpc.css"
></style>
