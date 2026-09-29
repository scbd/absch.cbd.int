<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        CBD regions publishing records
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
        Unable to load publishing-region counts.
      </div>

      <div
        v-else-if="total === 0"
        class="py-4 text-center text-muted"
      >
        No publishing-region data found.
      </div>

      <div
        v-else
        class="region-content"
      >
        <div
          class="region-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="region-chart-centre">
            <strong>
              {{ total.toLocaleString() }}
            </strong>

            <small>
              Total
            </small>
          </div>
        </div>

        <div class="region-legend">
          <button
            v-for="regionItem in regionCounts"
            :key="regionItem.id"
            type="button"
            class="region-button"
            :class="{
              selected:
                selectedRegionId === regionItem.id
            }"
            :aria-pressed="
              selectedRegionId === regionItem.id
            "
            :aria-label="
              `${regionItem.fullLabel}: ` +
                `${regionItem.count} records`
            "
            :title="regionItem.fullLabel"
            @click="selectRegion(regionItem)"
          >
            <span
              class="region-dot"
              :style="{
                backgroundColor: regionItem.colour
              }"
            />

            <span class="region-details">
              <span class="d-block fw-bold">
                {{ regionItem.label }}
              </span>

              <span class="d-block">
                {{ regionItem.count.toLocaleString() }}

                <small class="text-muted">
                  ({{ getPercentage(regionItem.count) }}%)
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

interface PublishingRegionDefinition {
  id: string
  label: string
  fullLabel: string
  colour: string
}

interface PublishingRegionCount
  extends PublishingRegionDefinition {
  count: number
}

const PUBLISHING_REGION_FILTER_ID =
  'publishing-region'

const PUBLISHING_REGION_FIELD =
  'countryRegions_REL_ss'

const RESULT_ROWS = 1
const PERCENT_SCALE = 100
const EMPTY_COLOUR = '#e9ecef'

const PUBLISHING_REGIONS:
readonly PublishingRegionDefinition[] = [
  {
    id: '5E5B7AA4-2420-4147-825B-0820F7EC5A4B',
    label: 'A&P',
    fullLabel: 'Asia and the Pacific',
    colour: '#0d6efd'
  },
  {
    id: '942E40CA-4C23-4D3A-A0B4-736CD0EFCD54',
    label: 'CEE',
    fullLabel: 'Central and Eastern Europe',
    colour: '#6f42c1'
  },
  {
    id: '3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E',
    label: 'GRULAC',
    fullLabel:
      'Latin America and the Caribbean',
    colour: '#fd7e14'
  },
  {
    id: '0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B',
    label: 'WEOG',
    fullLabel:
      'Western Europe and Others',
    colour: '#198754'
  },
  {
    id: 'D50FE62D-8A5E-4407-83F8-AFCAAF708EA4',
    label: 'Africa',
    fullLabel: 'Africa',
    colour: '#dc3545'
  }
]

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

const regionCounts =
  ref<PublishingRegionCount[]>([])

const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  regionCounts.value.reduce(
    (sum, { count }) => sum + count,
    0
  )
)

const selectedRegionId =
  computed<string | null>(() => {
    const selectedFilter =
      filters.value.find(
        ({ id }) =>
          id === PUBLISHING_REGION_FILTER_ID
      )

    if (selectedFilter === undefined) {
      return null
    }

    const { value } = selectedFilter

    return typeof value === 'string'
      ? value
      : null
  })

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  let startPercentage = 0

  const segments = regionCounts.value.map(
    ({ colour, count }) => {
      const segmentPercentage =
        (count / total.value) *
        PERCENT_SCALE

      const endPercentage =
        startPercentage + segmentPercentage

      const segment =
        `${colour} ${startPercentage}% ` +
        `${endPercentage}%`

      startPercentage = endPercentage

      return segment
    }
  )

  return `conic-gradient(${segments.join(', ')})`
})

const chartLabel = computed(() =>
  regionCounts.value
    .map(
      ({ fullLabel, count }) =>
        `${fullLabel} ${count}`
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

function buildRegionQuery (
  regionId: string
): string {
  return `${PUBLISHING_REGION_FIELD}:${regionId}`
}

function selectRegion (
  regionItem: PublishingRegionCount
): void {
  const {
    id,
    label
  } = regionItem

  if (selectedRegionId.value === id) {
    emit('filter-change', {
      id: PUBLISHING_REGION_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: PUBLISHING_REGION_FILTER_ID,
    filter: {
      id: PUBLISHING_REGION_FILTER_ID,
      label: `Publishing region: ${label}`,
      fieldQuery: buildRegionQuery(id),
      value: id
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
      [PUBLISHING_REGION_FILTER_ID]
    )
  ]
}

async function getRegionCount (
  fieldQueries: string[],
  regionId: string
): Promise<number> {
  const result = await solrApi.query({
    fieldQueries: [
      ...fieldQueries,
      buildRegionQuery(regionId)
    ],
    query: '*:*',
    fields: 'id',
    rowsPerPage: RESULT_ROWS
  })

  const { response } = result
  const { numFound } = response

  return numFound
}

async function loadRegionCounts (): Promise<void> {
  loading.value = true
  error.value = false
  regionCounts.value = []

  try {
    const fieldQueries =
      buildBaseFieldQueries()

    const counts = await Promise.all(
      PUBLISHING_REGIONS.map(
        async ({ id }) =>
          await getRegionCount(
            fieldQueries,
            id
          )
      )
    )

    regionCounts.value =
      PUBLISHING_REGIONS.map(
        (regionDefinition, index) => {
          const count = counts[index] ?? 0

          return {
            ...regionDefinition,
            count
          }
        }
      )
  } catch {
    regionCounts.value = []
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
    await loadRegionCounts()
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.region-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
}

.region-chart {
  position: relative;
  width: 150px;
  height: 150px;
  flex: 0 0 150px;
  border-radius: 50%;
}

.region-chart-centre {
  position: absolute;
  inset: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
}

.region-chart-centre strong {
  font-size: 1.5rem;
}

.region-chart-centre small {
  color: #6c757d;
}

.region-legend {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.region-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.4rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background-color: transparent;
  color: inherit;
  text-align: left;
}

.region-button:hover,
.region-button:focus-visible {
  background-color: #f8f9fa;
}

.region-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.region-button.selected {
  border-color: #6c757d;
  background-color: #f8f9fa;
}

.region-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  border-radius: 50%;
}

.region-details {
  min-width: 0;
}

@media (max-width: 575.98px) {
  .region-content {
    flex-direction: column;
  }
}
</style>
