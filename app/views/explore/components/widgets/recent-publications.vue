<template>
  <!-- displays the number of records published in the last 12 months, 6 months, 3 months or 1 month. -->
  <div class="card h-100">
    <div class="card-body d-flex flex-column text-center">
      <h5 class="card-title mb-0">
        Records published in the last
        {{ selectedPeriodLabel }}
      </h5>

      <div
        class="flex-grow-1 d-flex flex-column justify-content-center py-4"
        aria-live="polite"
      >
        <div
          v-if="loading"
          class="placeholder-glow"
          aria-busy="true"
        >
          <div class="display-4 fw-semibold lh-1 mb-2">
            <span class="placeholder col-3 rounded" />
          </div>

          <div>
            <span class="placeholder col-6 rounded" />
          </div>
        </div>

        <div
          v-else-if="error"
          class="alert alert-danger small mb-0"
          role="alert"
        >
          <i
            class="fa fa-exclamation-triangle me-1"
            aria-hidden="true"
          />
          Unable to load recently published records.
        </div>

        <template v-else>
          <div class="display-4 fw-semibold lh-1 mb-2">
            {{ total.toLocaleString() }}
          </div>
        </template>
      </div>

      <div
        class="btn-group w-100"
        role="group"
        aria-label="Publication period"
      >
        <button
          v-for="period in PERIOD_OPTIONS"
          :key="period.months"
          type="button"
          class="btn btn-sm"
          :class="
            selectedMonths === period.months
              ? 'btn-primary'
              : 'btn-outline-primary'
          "
          :aria-pressed="
            selectedMonths === period.months
          "
          @click="selectPeriod(period)"
        >
          {{ period.label }}
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

interface PeriodOption {
  months: number
  label: string
}

const PERIOD_FILTER_ID =
  'publication-period'

const PUBLICATION_DATE_FIELD =
  'updatedDate_dt'

const RESULT_ROWS = 1
const DEFAULT_MONTHS = 12

const PERIOD_OPTIONS:
readonly PeriodOption[] = [
  {
    months: 12,
    label: '12 months'
  },
  {
    months: 6,
    label: '6 months'
  },
  {
    months: 3,
    label: '3 months'
  },
  {
    months: 1,
    label: '1 month'
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

const localMonths = ref(DEFAULT_MONTHS)
const total = ref(0)
const loading = ref(true)
const error = ref(false)

const filterMonths = computed<number | null>(() => {
  const selectedFilter = filters.value.find(
    ({ id }) => id === PERIOD_FILTER_ID
  )

  if (selectedFilter === undefined) {
    return null
  }

  const { value } = selectedFilter

  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value)

    return Number.isNaN(parsedValue)
      ? null
      : parsedValue
  }

  return null
})

const selectedMonths = computed(() =>
  filterMonths.value ?? localMonths.value
)

const selectedPeriodLabel = computed(() => {
  const selectedPeriod = PERIOD_OPTIONS.find(
    ({ months }) =>
      months === selectedMonths.value
  )

  return selectedPeriod?.label ??
    `${selectedMonths.value} months`
})

function buildPeriodQuery (
  months: number
): string {
  return `${PUBLICATION_DATE_FIELD}:` +
    `[NOW-${months}MONTHS TO NOW]`
}

function selectPeriod (
  period: PeriodOption
): void {
  const { months, label } = period

  localMonths.value = months

  if (filterMonths.value === months) {
    emit('filter-change', {
      id: PERIOD_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: PERIOD_FILTER_ID,
    filter: {
      id: PERIOD_FILTER_ID,
      label: `Published in the last ${label}`,
      fieldQuery: buildPeriodQuery(months),
      value: months
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
      [PERIOD_FILTER_ID]
    )
  ]
}

async function loadTotal (): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const result = await solrApi.query({
      fieldQueries: [
        ...buildBaseFieldQueries(),
        buildPeriodQuery(selectedMonths.value)
      ],
      query: '*:*',
      fields: 'id',
      rowsPerPage: RESULT_ROWS
    })

    const { response } = result
    const { numFound } = response

    total.value = numFound
  } catch {
    total.value = 0
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(
  [
    schema,
    filters,
    selectedMonths
  ],
  async () => {
    await loadTotal()
  },
  {
    immediate: true
  }
)
</script>
