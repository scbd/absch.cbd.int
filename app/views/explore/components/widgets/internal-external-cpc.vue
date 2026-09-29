<template>
  <!-- Internal vs external
Applicable records: cpc
External (international) CPCs are CPCs where the source country is not the same as the country publishing the record
Internal (national) CPCs are CPCs where the source country is the same as the country publishing the record
-->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Internal vs external
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
        Unable to load CPC type counts.
      </div>

      <div
        v-else-if="total === 0"
        class="py-4 text-center text-muted"
      >
        No CPC type data found.
      </div>

      <div
        v-else
        class="type-content"
      >
        <div
          class="type-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="type-chart-centre">
            <strong>
              {{ total.toLocaleString() }}
            </strong>

            <small>
              Total
            </small>
          </div>
        </div>

        <div class="type-legend">
          <button
            v-for="typeItem in typeCounts"
            :key="typeItem.type"
            type="button"
            class="type-button"
            :class="{
              selected:
                selectedType === typeItem.type
            }"
            :aria-pressed="
              selectedType === typeItem.type
            "
            @click="selectType(typeItem)"
          >
            <span
              class="type-dot"
              :style="{
                backgroundColor: typeItem.colour
              }"
            />

            <span>
              <span class="d-block fw-bold">
                {{ typeItem.label }}
              </span>

              <span class="d-block">
                {{ typeItem.count.toLocaleString() }}

                <small class="text-muted">
                  ({{ getPercentage(typeItem.count) }}%)
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

type CpcType =
  | 'internal'
  | 'external'

interface CpcTypeConfig {
  type: CpcType
  label: string
  query: string
  colour: string
}

interface CpcTypeCount extends CpcTypeConfig {
  count: number
}

const CPC_TYPE_FILTER_ID =
  'internal-external-cpc'

const CPC_TYPE_FIELD =
  'picGrantedCountryTypes_ss'

const EMPTY_COLOUR = '#e9ecef'
const RESULT_ROWS = 1
const PERCENT_SCALE = 100

const CPC_TYPES: readonly [CpcTypeConfig, CpcTypeConfig] = [
  {
    type: 'internal',
    label: 'Internal',
    query: `${CPC_TYPE_FIELD}:[* TO *]`,
    colour: '#198754'
  },
  {
    type: 'external',
    label: 'External',
    query: `-${CPC_TYPE_FIELD}:[* TO *]`,
    colour: '#0d6efd'
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

const typeCounts =
  ref<CpcTypeCount[]>([])

const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  typeCounts.value.reduce(
    (sum, { count }) => sum + count,
    0
  )
)

const selectedType =
  computed<CpcType | null>(() => {
    const selectedFilter =
      filters.value.find(
        ({ id }) =>
          id === CPC_TYPE_FILTER_ID
      )

    const { value } = selectedFilter ?? {}

    return value === 'internal' ||
      value === 'external'
      ? value
      : null
  })

function getCountByType (
  type: CpcType
): number {
  return typeCounts.value.find(
    item => item.type === type
  )?.count ?? 0
}

function getPercent (
  count: number
): number {
  return total.value === 0
    ? 0
    : (count / total.value) * PERCENT_SCALE
}

function getPercentage (
  count: number
): number {
  return Math.round(getPercent(count))
}

const internalPercent = computed(() =>
  getPercent(getCountByType('internal'))
)

const pieBackground = computed(() => {
  if (total.value === 0) {
    return EMPTY_COLOUR
  }

  const [internal, external] = CPC_TYPES

  return `conic-gradient(
    ${internal.colour}
      0%
      ${internalPercent.value}%,
    ${external.colour}
      ${internalPercent.value}%
      ${PERCENT_SCALE}%
  )`
})

const chartLabel = computed(() =>
  typeCounts.value
    .map(
      ({ label, count }) =>
        `${label} ${count}`
    )
    .join(', ')
)

function selectType (
  typeItem: CpcTypeCount
): void {
  const {
    type,
    label,
    query
  } = typeItem

  if (selectedType.value === type) {
    emit('filter-change', {
      id: CPC_TYPE_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: CPC_TYPE_FILTER_ID,
    filter: {
      id: CPC_TYPE_FILTER_ID,
      label: `CPC type: ${label}`,
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
      [CPC_TYPE_FILTER_ID]
    )
  ]
}

async function getCount (
  fieldQueries: string[],
  typeQuery: string
): Promise<number> {
  const result = await solrApi.query({
    fieldQueries: [
      ...fieldQueries,
      typeQuery
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

    const counts = await Promise.all(
      CPC_TYPES.map(
        async ({ query }) =>
          await getCount(fieldQueries, query)
      )
    )

    typeCounts.value = CPC_TYPES.map(
      (config, index) => ({
        ...config,
        count: counts[index] ?? 0
      })
    )
  } catch {
    typeCounts.value = []
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
  src="./internal-external-cpc.css"
></style>
