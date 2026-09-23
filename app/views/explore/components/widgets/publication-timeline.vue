<template>
  <!-- Number of records published per year since 2014 -->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center">
        Number of records published per year since 2014
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
        Unable to load the publication timeline.
      </div>

      <div
        v-else-if="total === 0"
        class="py-4 text-center text-muted"
      >
        No publication data found.
      </div>

      <div
        v-else
        class="timeline-chart"
      >
        <button
          v-for="item in timeline"
          :key="item.year"
          type="button"
          class="timeline-column"
          :class="{
            selected:
              selectedYear === item.year
          }"
          :aria-pressed="
            selectedYear === item.year
          "
          :aria-label="
            `${item.year}: ${item.count} records`
          "
          @click="selectYear(item.year)"
        >
          <span class="timeline-value">
            {{ item.count.toLocaleString() }}
          </span>

          <span class="timeline-bar-area">
            <span
              class="timeline-bar"
              :style="{
                height:
                  `${getBarHeight(item.count)}%`
              }"
            />
          </span>

          <span class="timeline-year">
            {{ item.year }}
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

interface TimelineItem {
  year: number
  count: number
}

const FIRST_PUBLICATION_YEAR = 2014
const YEAR_INCREMENT = 1
const RESULT_ROWS = 1

const MAXIMUM_BAR_HEIGHT = 100
const MINIMUM_DIVISOR = 1

const JANUARY = 0
const DECEMBER = 11
const FIRST_DAY = 1
const LAST_DAY = 31
const LAST_HOUR = 23
const LAST_MINUTE = 59
const LAST_SECOND = 59
const LAST_MILLISECOND = 999

const YEAR_FILTER_ID =
  'publication-year'

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

const timeline = ref<TimelineItem[]>([])
const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  timeline.value.reduce(
    (sum, { count }) =>
      sum + count,
    0
  )
)

const maximumCount = computed(() => {
  const counts = timeline.value.map(
    ({ count }) => count
  )

  return Math.max(
    MINIMUM_DIVISOR,
    ...counts
  )
})

const selectedYear =
  computed<number | null>(() => {
    const selectedFilter =
      filters.value.find(
        ({ id }) =>
          id === YEAR_FILTER_ID
      )

    if (selectedFilter === undefined) {
      return null
    }

    const { value } = selectedFilter

    if (typeof value === 'number') {
      return value
    }

    if (typeof value !== 'string') {
      return null
    }

    const parsedYear = Number(value)

    return Number.isNaN(parsedYear)
      ? null
      : parsedYear
  })

function getYears (): number[] {
  const currentYear =
    new Date().getUTCFullYear()

  const yearCount =
    currentYear -
    FIRST_PUBLICATION_YEAR +
    YEAR_INCREMENT

  return Array.from(
    { length: yearCount },
    (_, index) =>
      FIRST_PUBLICATION_YEAR + index
  )
}

function getYearStart (
  year: number
): string {
  return new Date(
    Date.UTC(
      year,
      JANUARY,
      FIRST_DAY
    )
  ).toISOString()
}

function getYearEnd (
  year: number
): string {
  return new Date(
    Date.UTC(
      year,
      DECEMBER,
      LAST_DAY,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND
    )
  ).toISOString()
}

function buildYearQuery (
  year: number
): string {
  const start = getYearStart(year)
  const end = getYearEnd(year)

  return (
    'updatedDate_dt:' +
    `[${start} TO ${end}]`
  )
}

function selectYear (
  year: number
): void {
  if (selectedYear.value === year) {
    emit('filter-change', {
      id: YEAR_FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: YEAR_FILTER_ID,
    filter: {
      id: YEAR_FILTER_ID,
      label:
        `Publication year: ${year}`,
      fieldQuery:
        buildYearQuery(year),
      value: year
    }
  })
}

function buildBaseFieldQueries (): string[] {
  const fieldQueries = [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filters.value,
      [YEAR_FILTER_ID]
    )
  ]

  if (
    scope.value === 'country' &&
    country.value !== undefined &&
    country.value !== ''
  ) {
    fieldQueries.push(
      `government_s:${country.value}`
    )
  }

  if (
    scope.value === 'region' &&
    region.value !== undefined &&
    region.value !== ''
  ) {
    fieldQueries.push(
      `countryRegions_REL_ss:${region.value}`
    )
  }

  return fieldQueries
}

function getBarHeight (
  count: number
): number {
  return Math.round(
    count /
    maximumCount.value *
    MAXIMUM_BAR_HEIGHT
  )
}

async function getYearCount (
  baseFieldQueries: string[],
  year: number
): Promise<TimelineItem> {
  const result = await solrApi.query({
    fieldQueries: [
      ...baseFieldQueries,
      buildYearQuery(year)
    ],
    query: '*:*',
    fields: 'id',
    rowsPerPage: RESULT_ROWS
  })

  const { response } = result
  const { numFound } = response

  return {
    year,
    count: numFound
  }
}

async function loadTimeline (): Promise<void> {
  loading.value = true
  error.value = false
  timeline.value = []

  try {
    const years = getYears()

    const baseFieldQueries =
      buildBaseFieldQueries()

    timeline.value = await Promise.all(
      years.map(
        async year =>
          await getYearCount(
            baseFieldQueries,
            year
          )
      )
    )
  } catch {
    timeline.value = []
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
    await loadTimeline()
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.timeline-chart {
  display: flex;
  min-height: 230px;
  align-items: stretch;
  padding-top: 1rem;
  overflow-x: auto;
}

.timeline-column {
  display: flex;
  min-width: 58px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  color: inherit;
  flex: 1 0 58px;
  flex-direction: column;
  text-align: center;
}

.timeline-column:hover,
.timeline-column:focus-visible {
  background-color: #f8f9fa;
}

.timeline-column:focus-visible {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

.timeline-column.selected {
  border-color: #0d6efd;
  background-color: #e7f1ff;
}

.timeline-value {
  min-height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.timeline-bar-area {
  display: flex;
  height: 160px;
  align-items: flex-end;
  justify-content: center;
  margin: 0 0.25rem;
  border-bottom: 1px solid #adb5bd;
}

.timeline-bar {
  width: 70%;
  min-height: 2px;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: #0d6efd;
  transition: height 0.2s ease;
}

.timeline-column.selected .timeline-bar {
  background-color: #084298;
}

.timeline-year {
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #6c757d;
  font-size: 0.75rem;
}

.timeline-column.selected .timeline-year {
  color: #084298;
  font-weight: 700;
}
</style>
