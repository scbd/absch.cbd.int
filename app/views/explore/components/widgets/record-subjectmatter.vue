<template>
  <!-- campares the gr types + atk keywords for irccs and cpcs -->
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-center mb-2">
        Related subject matter
      </h5>

      <div
        v-if="loading"
        class="py-3 text-center text-muted"
      >
        <i class="fa fa-cog fa-spin" />
        Loading...
      </div>

      <div
        v-else-if="error"
        class="alert alert-danger small mb-0"
      >
        Unable to load GR type and aTK counts.
      </div>

      <div
        v-else-if="total === 0"
        class="py-3 text-center text-muted"
      >
        No GR type or aTK data found.
      </div>

      <div
        v-else
        class="subject-content"
      >
        <div
          class="subject-chart"
          :style="{ background: pieBackground }"
          role="img"
          :aria-label="chartLabel"
        >
          <div class="subject-chart-centre">
            <strong>
              {{ total.toLocaleString() }}
            </strong>

            <small>
              Matches
            </small>
          </div>
        </div>

        <div class="subject-legend">
          <button
            v-for="item in sliceCounts"
            :key="item.id"
            type="button"
            class="subject-button"
            :class="{
              selected:
                selectedSliceId === item.id
            }"
            :aria-pressed="
              selectedSliceId === item.id
            "
            :title="item.label"
            @click="selectSlice(item)"
          >
            <span
              class="subject-dot"
              :style="{
                backgroundColor: item.colour
              }"
            />

            <span class="subject-name">
              {{ item.label }}
            </span>

            <span class="subject-count">
              {{ item.count.toLocaleString() }}

              <small>
                {{ getPercentage(item.count) }}%
              </small>
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

interface SliceDefinition {
  id: string
  label: string
  query: string
  colour: string
}

interface SliceCount
  extends SliceDefinition {
  count: number
}

const FILTER_ID =
  'record-subjectmatter'

const KEYWORD_FIELD =
  'keywords_ss'

const KEYWORD_RELATION_FIELD =
  'keywords_REL_ss'

const RESULT_ROWS = 1
const PERCENT_SCALE = 100
const EMPTY_COLOUR = '#e9ecef'

const SUBJECT_DEFINITIONS:
readonly SliceDefinition[] = [
  {
    id: '357DBB22-6A6C-4C49-BA1F-037320B09247',
    label: 'Plants',
    query:
      `${KEYWORD_RELATION_FIELD}:` +
      '"357DBB22-6A6C-4C49-BA1F-037320B09247"',
    colour: '#198754'
  },
  {
    id: '9C146B09-097E-4CFF-B9CC-D4785496952F',
    label: 'Animals',
    query:
      `${KEYWORD_RELATION_FIELD}:` +
      '"9C146B09-097E-4CFF-B9CC-D4785496952F"',
    colour: '#0d6efd'
  },
  {
    id: '33A6BF46-3699-4B5E-A3C0-506FAFDA2D76',
    label: 'Microorganisms',
    query:
      `${KEYWORD_RELATION_FIELD}:` +
      '"33A6BF46-3699-4B5E-A3C0-506FAFDA2D76"',
    colour: '#fd7e14'
  },
  {
    id: 'http://data.gbif.org/species/13140807',
    label: 'Fungi',
    query:
      `${KEYWORD_RELATION_FIELD}:` +
      '"http://data.gbif.org/species/13140807"',
    colour: '#dc3545'
  },
  {
    id: 'B8A150E054154AD3AD97856ABD485E90',
    label:
      'Associated traditional knowledge',
    query:
      `${KEYWORD_FIELD}:` +
      '"B8A150E054154AD3AD97856ABD485E90"',
    colour: '#6f42c1'
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

const sliceCounts =
  ref<SliceCount[]>([])

const loading = ref(true)
const error = ref(false)

const total = computed(() =>
  sliceCounts.value.reduce(
    (sum, { count }) => sum + count,
    0
  )
)

const selectedSliceId =
  computed<string | null>(() => {
    const selectedFilter =
      filters.value.find(
        ({ id }) => id === FILTER_ID
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

  const segments = sliceCounts.value.map(
    ({ colour, count }) => {
      const percentage =
        count / total.value *
        PERCENT_SCALE

      const endPercentage =
        startPercentage + percentage

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
  sliceCounts.value
    .map(
      ({ label, count }) =>
        `${label}: ${count}`
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
    count / total.value *
    PERCENT_SCALE
  )
}

function selectSlice (
  item: SliceCount
): void {
  const {
    id,
    label,
    query
  } = item

  if (selectedSliceId.value === id) {
    emit('filter-change', {
      id: FILTER_ID,
      filter: null
    })

    return
  }

  emit('filter-change', {
    id: FILTER_ID,
    filter: {
      id: FILTER_ID,
      label: `Subject matter: ${label}`,
      fieldQuery: query,
      value: id
    }
  })
}

function buildBaseQueries (): string[] {
  return [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(
      filters.value,
      [FILTER_ID]
    )
  ]
}

async function getCount (
  baseQueries: string[],
  subjectQuery: string
): Promise<number> {
  const result = await solrApi.query({
    fieldQueries: [
      ...baseQueries,
      subjectQuery
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
  sliceCounts.value = []

  try {
    const baseQueries =
      buildBaseQueries()

    const counts = await Promise.all(
      SUBJECT_DEFINITIONS.map(
        async ({ query }) =>
          await getCount(
            baseQueries,
            query
          )
      )
    )

    sliceCounts.value =
      SUBJECT_DEFINITIONS.map(
        (definition, index) => {
          const [
            count = 0
          ] = counts.slice(
            index,
            index + 1
          )

          return {
            ...definition,
            count
          }
        }
      )
  } catch {
    sliceCounts.value = []
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
  src="./record-subjectmatter.css"
></style>
