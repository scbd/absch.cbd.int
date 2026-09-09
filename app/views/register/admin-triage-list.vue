<template>
  <div class="px-5 py-4">
    <div class="card">
      <div class="card-body">
        <h3 class="mb-3">
          {{ t('title') }}
        </h3>

        <div v-if="loading" class="text-muted">
          <i class="fa fa-cog fa-spin fa-lg" /> {{ t('loading') }}...
        </div>

        <template v-else>
          <div class="text-muted small mb-2 tnum">
            {{ totalCount }} {{ t('requestsFound') }}
          </div>

          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th class="cursor-pointer" @click="onSort('data.title.en')">
                  {{ t('titleColumn') }}
                  <i v-if="sortField === 'data.title.en'" :class="sortOrder === 1 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" />
                </th>
                <th class="cursor-pointer" @click="onSort('createdOn')">
                  {{ t('requested') }}
                  <i v-if="sortField === 'createdOn'" :class="sortOrder === 1 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" />
                </th>
                <th>{{ t('requestedBy') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="workflow in workflows" :key="workflow._id" class="cursor-pointer" @click="openRequest(workflow._id)">
                <td>{{ workflow.data?.title?.['en'] }}</td>
                <td>{{ formatDate(workflow.createdOn) }}</td>
                <td>{{ workflow.createdBy_info?.email }}</td>
              </tr>
              <tr v-if="workflows.length === 0">
                <td colspan="3" class="text-center text-muted py-4">
                  {{ t('noResultFound') }}
                </td>
              </tr>
            </tbody>
          </table>

          <pagination
            v-if="totalCount > recordsPerPage"
            :record-count="totalCount"
            :records-per-page="recordsPerPage"
            :current-page="pageNumber"
            @change-page="onChangePage"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { formatDate } from '~/services/datetime.js'
import messages from '~/app-text/views/register/admin-triage-list.json'
import pagination from '~/components/common/pagination.vue'
import WorkflowsApi from '~/api/workflows'

interface Workflow {
  _id: string
  createdOn: string
  data?: { title?: Record<string, string> }
  createdBy_info?: { email?: string }
}

const { t } = useI18n({ messages })
const router = useRouter()
const auth = useAuth()
const realm = useRealm()
const workflowsApi = new WorkflowsApi({ tokenReader: async () => await auth.token(), realm: realm.value })

const loading = ref(true)
const workflows = ref<Workflow[]>([])
const totalCount = ref(0)
const pageNumber = ref(1)
const recordsPerPage = ref(15)
const sortField = ref('createdOn')
const sortOrder = ref(-1)

onMounted(async () => {
  await loadWorkflows(1)
})

const onSort = async (field: string): Promise<void> => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 1 ? -1 : 1
  } else {
    sortField.value = field
    sortOrder.value = -1
  }
  await loadWorkflows(1)
}

const onChangePage = async (page: number): Promise<void> => {
  await loadWorkflows(page)
}

const openRequest = (workflowId: string): void => {
  router.push(`/register/requests/${workflowId}`)
}

const PENDING_MAX_AGE_WEEKS = 12

const loadWorkflows = async (page: number): Promise<void> => {
  loading.value = true
  pageNumber.value = page

  const maxAgeMs = PENDING_MAX_AGE_WEEKS * 7 * 24 * 60 * 60 * 1000
  const notExpiredSince = new Date(Date.now() - maxAgeMs).toISOString()
  const query = {
    $and: [
      { 'data.realm': realm.value },
      { 'data.metadata.schema': 'submission' },
      { state: 'running' },
      { createdOn: { $gte: notExpiredSince } }
    ]
  }
  const skip = (page - 1) * recordsPerPage.value
  const sort = { [sortField.value]: sortOrder.value }

  const [countResult, items] = await Promise.all([
    workflowsApi.queryWorkflows<{ count: number }>({ query, count: true }),
    workflowsApi.queryWorkflows<Workflow[]>({ query, length: recordsPerPage.value, skip, sort })
  ])

  const { count } = countResult
  totalCount.value = count
  workflows.value = items
  loading.value = false
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
