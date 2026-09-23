<template>
  <!-- display count of total records -->
  <div class="card h-100">
    <div class="card-body text-center">
      <h5 class="card-title">
        Total Records
      </h5>

      <div v-if="loading" class="py-3 text-muted">
        <i class="fa fa-cog fa-spin fa-lg" />
        Loading...
      </div>

      <div v-else-if="error" class="text-danger">
        Unable to load
      </div>

      <div v-else class="display-1">
        {{ total.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useRealm } from '~/services/composables/realm.js'
import SolrApi from '~/api/solr.js'
import {
  buildExploreFieldQueries,
  type ExploreFilter
} from '../../explore-filters'

const RESULT_ROWS = 1

const props = defineProps<{
  schema: string
  scope: string
  filters: ExploreFilter[]
  country?: string
  region?: string
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

const total = ref(0)
const loading = ref(true)
const error = ref(false)

function buildFieldQueries (): string[] {
  const { value: filterValues } = filters

  const fieldQueries = [
    `schema_s:${schema.value}`,
    `realm_ss:${realm.value.toLowerCase()}`,
    '_state_s:public',
    '_latest_s:true',
    ...buildExploreFieldQueries(filterValues)
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

async function loadTotal (): Promise<void> {
  loading.value = true
  error.value = false

  try {
    const result = await solrApi.query({
      fieldQueries: buildFieldQueries(),
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
    scope,
    filters,
    country,
    region
  ],
  async () => {
    await loadTotal()
  },
  {
    immediate: true
  }
)
</script>
