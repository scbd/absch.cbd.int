<template>
  <div class="triage-page px-4 py-4">
    <div class="text-uppercase text-muted small mb-1">
      {{ t('breadcrumb') }}
    </div>
    <h1 class="h3 mb-1">
      {{ t('title') }}
    </h1>
    <p class="text-muted small mb-3">
      {{ t('subtitle') }}
    </p>

    <div v-if="initialLoading" class="text-muted">
      <i class="fa fa-cog fa-spin fa-lg" /> {{ t('loading') }}...
    </div>

    <template v-else>
      <triage-stats :stats="stats" />

      <div class="row g-3">
        <aside class="col-lg-3">
          <triage-filter-rail
            :facets="facets"
            :selection="filterSelection"
            @on-toggle="onToggleFilter"
            @on-clear="onClearFilter"
          />
        </aside>

        <section class="col-lg-9">
          <div class="card shadow-sm">
            <div class="card-header bg-white">
              <ul class="nav nav-tabs card-header-tabs">
                <li v-for="tab in TRIAGE_STATUS_TABS" :key="tab" class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ active: statusTab === tab }"
                    type="button"
                    @click="onSelectTab(tab)"
                  >
                    {{ t(`tab${tab}`) }}
                    <span class="badge ms-1">{{ tabCounts[tab] }}</span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-body position-relative">
              <div v-if="tableLoading" class="table-loading-overlay">
                <i class="fa fa-cog fa-spin fa-lg" /> {{ t('loading') }}...
              </div>

              <div class="text-muted small mb-2 tnum">
                {{ totalCount }} {{ t('requestsFound') }}
              </div>

              <div class="table-responsive" :class="{ 'opacity-50': tableLoading }">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th class="stripe" aria-hidden="true" />
                      <th class="cursor-pointer" @click="onSort('data.title.en')">
                        {{ t('titleColumn') }}
                        <i v-if="sortField === 'data.title.en'" :class="sortOrder === 1 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" />
                      </th>
                      <th>{{ t('notifications') }}</th>
                      <th>{{ t('organizations') }}</th>
                      <th>{{ t('government') }}</th>
                      <th class="cursor-pointer" @click="onSort('createdOn')">
                        {{ t('age') }}
                        <i v-if="sortField === 'createdOn'" :class="sortOrder === 1 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" />
                      </th>
                      <th>{{ t('statusColumn') }}</th>
                      <th>{{ t('assignee') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="workflow in workflows" :key="workflow._id" :class="rowStripeClass(workflow)">
                      <td class="stripe">
                        <div class="bar" />
                      </td>
                      <td>
                        <div>
                          <a :href="requestPath(workflow)" target="_blank" rel="noopener" @click.stop>{{ workflow.data?.title?.['en'] }}</a>
                        </div>
                        <div class="text-muted small">
                          {{ t('requestedByPrefix') }}
                          <span data-bs-toggle="tooltip" data-bs-placement="top" :title="workflow.createdBy_info?.email">{{ personLabel(workflow.createdBy_info ?? {}) }}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          v-for="id in toRecordFieldArray(workflow.data?.notifications)"
                          :key="id"
                          class="badge text-bg-light border me-1"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="rowNames.notifications[id] ?? id"
                        >
                          {{ id }}
                        </span>
                      </td>
                      <td>
                        <span v-for="id in toRecordFieldArray(workflow.data?.organizations)" :key="id" class="badge text-bg-light border me-1">
                          {{ rowNames.organizations[id] ?? id }}
                        </span>
                      </td>
                      <td>
                        <span v-for="id in governmentCodes(workflow)" :key="id" class="text-nowrap me-1">
                          {{ rowNames.government[id] ?? id }}
                        </span>
                      </td>
                      <td class="text-nowrap">
                        <span :class="{ 'text-danger fw-semibold': ageWarn(workflow) }" class="tnum">{{ ageWeeks(workflow) }} {{ t('weeks') }}</span>
                        <div class="text-muted small">
                          {{ ageNote(workflow) }}
                        </div>
                      </td>
                      <td>
                        <span class="status-pill" :class="statusPillClass(workflow)">
                          <span class="dot" />
                          {{ rowStatusLabel(workflow) }}
                        </span>
                      </td>
                      <td>
                        <div v-if="assignees(workflow).length > 0" class="d-flex align-items-center flex-wrap gap-1">
                          <span
                            v-for="(assignee, index) in visibleAssignees(workflow)"
                            :key="index"
                            class="avatar rounded-circle bg-primary-subtle text-primary-emphasis"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            :title="assigneeFullName(assignee)"
                          >
                            {{ assigneeInitials(assignee) }}
                          </span>
                          <button
                            v-if="hiddenAssigneeCount(workflow) > 0"
                            type="button"
                            class="btn btn-link btn-sm p-0"
                            @click.stop="toggleAssignees(workflow._id)"
                          >
                            +{{ hiddenAssigneeCount(workflow) }}
                          </button>
                          <button
                            v-else-if="expandedAssignees.has(workflow._id) && assignees(workflow).length > MAX_VISIBLE_ASSIGNEES"
                            type="button"
                            class="btn btn-link btn-sm p-0"
                            @click.stop="toggleAssignees(workflow._id)"
                          >
                            {{ t('showLess') }}
                          </button>
                        </div>
                        <span v-else class="text-muted fst-italic">{{ t('unassigned') }}</span>
                      </td>
                    </tr>
                    <tr v-if="workflows.length === 0">
                      <td colspan="8" class="text-center text-muted py-4">
                        {{ t('noResultFound') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <pagination
                v-if="totalCount > recordsPerPage"
                :record-count="totalCount"
                :records-per-page="recordsPerPage"
                :current-page="pageNumber"
                @change-page="onChangePage"
              />
            </div>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { formatDateShort } from '~/services/datetime.js'
import { lstring } from '~/services/filters/lstring.js'
import { initTooltips } from './triage-tooltips'
import messages from '~/app-text/views/register/admin-triage-list.json'
import pagination from '~/components/common/pagination.vue'
import triageStats from './triage-stats.vue'
import triageFilterRail from './triage-filter-rail.vue'
import WorkflowsApi from '~/api/workflows'
import KmDocumentApi from '~/api/km-document'
import {
  type TriageFilterSelection,
  type TriageStatusTab,
  TRIAGE_STATUS_TABS,
  emptyTriageFilterSelection,
  buildFilterClauses,
  buildStatusClauses,
  toRecordFieldArray
} from './triage-filters'
import {
  resolveNotificationNames,
  resolveOrganizationNames,
  resolveGovernmentNames
} from './triage-display-names'
import {
  type Activity,
  type AssignedTo,
  MAX_VISIBLE_ASSIGNEES,
  assignees as workflowAssignees,
  assigneeFullName,
  assigneeInitials,
  personLabel
} from './triage-assignees'
import {
  PENDING_MAX_AGE_WEEKS,
  MILLISECONDS_PER_WEEK,
  notExpiredSince,
  rowStatus,
  capitalize,
  statusPillClass,
  rowStripeClass,
  ageWeeks,
  ageWarn,
  completionDate
} from './triage-row-status'

// The record snapshot (ADR-0003) lands directly on data.<field>; a field may
// be a single value (e.g. government: "in") or an array (e.g.
// notifications: ["2025-144"]) — see triage-filters.ts's toRecordFieldArray.
interface RecordFields { notifications?: string | string[], organizations?: string | string[], government?: string | string[] }

interface Workflow {
  _id: string
  createdOn: string
  state: string
  data?: { title?: Record<string, string>, identifier?: string } & RecordFields
  createdBy_info?: AssignedTo & { email?: string }
  activities?: Activity[]
}

interface TriageStats { pendingCount: number, oldestPendingWeeks: number | undefined, newThisWeekCount: number, assignedToMeCount: number }

interface FacetValue { value: string, count: number }

interface FacetResponse { notifications: FacetValue[], organizations: FacetValue[], government: FacetValue[] }

interface FilterOption extends FacetValue { name: string }

const { t, locale } = useI18n({ messages })
const auth = useAuth()
const realm = useRealm()
const workflowsApi = new WorkflowsApi({ tokenReader: async () => await auth.token(), realm: realm.value })
const kmDocumentApi = new KmDocumentApi({ tokenReader: async () => await auth.token(), realm: realm.value })

const initialLoading = ref(true)
const tableLoading = ref(false)
const workflows = ref<Workflow[]>([])
const totalCount = ref(0)
const pageNumber = ref(1)
const recordsPerPage = ref(15)
const sortField = ref('createdOn')
const sortOrder = ref(-1)
const filterSelection = ref<TriageFilterSelection>(emptyTriageFilterSelection())
const facets = ref<Record<keyof TriageFilterSelection, FilterOption[]>>({
  notifications: [],
  organizations: [],
  government: []
})
const statusTab = ref<TriageStatusTab>('Pending')
const stats = ref<TriageStats>({ pendingCount: 0, oldestPendingWeeks: undefined, newThisWeekCount: 0, assignedToMeCount: 0 })
const tabCounts = ref<Record<TriageStatusTab, number>>({ Pending: 0, Approved: 0, Rejected: 0, Expired: 0, Canceled: 0, All: 0 })
const rowNames = ref<Record<keyof RecordFields, Record<string, string>>>({
  notifications: {},
  organizations: {},
  government: {}
})
const myUserID = auth.user()?.userID

onMounted(async () => {
  await Promise.all([loadWorkflows(1), loadFacets(), loadStats(), loadTabCounts()])
  initialLoading.value = false
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

const requestPath = (workflow: Workflow): string | undefined => {
  const identifier = workflow.data?.identifier
  return identifier === undefined ? undefined : `/register/SUB/${identifier}/view`
}

const onToggleFilter = async (field: keyof TriageFilterSelection, value: string): Promise<void> => {
  const { value: selection } = filterSelection
  const { [field]: values } = selection
  const index = values.indexOf(value)
  if (index === -1) values.push(value)
  else values.splice(index, 1)

  await Promise.all([loadWorkflows(1), loadFacets()])
}

const onClearFilter = async (field: keyof TriageFilterSelection): Promise<void> => {
  filterSelection.value[field] = []
  await Promise.all([loadWorkflows(1), loadFacets()])
}

const onSelectTab = async (tab: TriageStatusTab): Promise<void> => {
  statusTab.value = tab
  await Promise.all([loadWorkflows(1), loadFacets()])
}

const assignees = (workflow: Workflow): AssignedTo[] => workflowAssignees(workflow.activities)

const expandedAssignees = ref<Set<string>>(new Set())

const visibleAssignees = (workflow: Workflow): AssignedTo[] => {
  const all = assignees(workflow)
  if (expandedAssignees.value.has(workflow._id) || all.length <= MAX_VISIBLE_ASSIGNEES) return all
  return all.slice(0, MAX_VISIBLE_ASSIGNEES)
}

const hiddenAssigneeCount = (workflow: Workflow): number => {
  if (expandedAssignees.value.has(workflow._id)) return 0
  return Math.max(0, assignees(workflow).length - MAX_VISIBLE_ASSIGNEES)
}

const toggleAssignees = async (workflowId: string): Promise<void> => {
  const next = new Set(expandedAssignees.value)
  if (next.has(workflowId)) next.delete(workflowId)
  else next.add(workflowId)
  expandedAssignees.value = next

  await nextTick()
  initTooltips()
}

const rowStatusLabel = (workflow: Workflow): string => {
  const status = rowStatus(workflow)
  return status === undefined ? capitalize(workflow.state) : t(`tab${status}`)
}

// Government snapshot values are occasionally an lstring object rather than
// a plain code; lstring() passes plain strings through unchanged.
const governmentCodes = (workflow: Workflow): string[] => toRecordFieldArray(workflow.data?.government).map((value) => lstring(value))

const ageNote = (workflow: Workflow): string => {
  switch (rowStatus(workflow)) {
    case 'Pending':
      return t('expiresIn', { weeks: PENDING_MAX_AGE_WEEKS - ageWeeks(workflow) })
    case 'Expired':
      return t('expiredOn', { date: formatDateShort(new Date(new Date(workflow.createdOn).getTime() + PENDING_MAX_AGE_WEEKS * MILLISECONDS_PER_WEEK)) })
    case 'Approved':
      return t('approvedOn', { date: formatDateShort(completionDate(workflow)) })
    case 'Rejected':
      return t('rejectedOn', { date: formatDateShort(completionDate(workflow)) })
    case 'Canceled':
      return t('canceledOn', { date: formatDateShort(completionDate(workflow)) })
    default:
      return ''
  }
}

const baseQueryClauses = (): Array<Record<string, unknown>> => [
  { 'data.realm': realm.value },
  { 'data.metadata.schema': 'submission' },
  ...buildStatusClauses(statusTab.value, notExpiredSince())
]

const buildQuery = (): Record<string, unknown> => ({
  $and: [...baseQueryClauses(), ...buildFilterClauses(filterSelection.value)]
})

const buildFacetQuery = (excludeField: keyof TriageFilterSelection): Record<string, unknown> => ({
  $and: [...baseQueryClauses(), ...buildFilterClauses(filterSelection.value, excludeField)]
})

const loadWorkflows = async (page: number): Promise<void> => {
  tableLoading.value = true
  pageNumber.value = page

  const query = buildQuery()
  const skip = (page - 1) * recordsPerPage.value
  const sort = { [sortField.value]: sortOrder.value }

  const [countResult, items] = await Promise.all([
    workflowsApi.queryWorkflows<{ count: number }>({ query, count: true }),
    workflowsApi.queryWorkflows<Workflow[]>({ query, length: recordsPerPage.value, skip, sort })
  ])

  const { count } = countResult
  totalCount.value = count
  workflows.value = items
  tableLoading.value = false

  await loadRowNames(items)
  await nextTick()
  initTooltips()
}

const uniqueValues = (items: Workflow[], field: keyof RecordFields): string[] => {
  const values = field === 'government'
    ? items.flatMap((workflow) => governmentCodes(workflow))
    : items.flatMap((workflow) => toRecordFieldArray(workflow.data?.[field]))
  return [...new Set(values)]
}

const loadRowNames = async (items: Workflow[]): Promise<void> => {
  const [notificationNames, organizationNames, governmentNames] = await Promise.all([
    resolveNotificationNames(uniqueValues(items, 'notifications')),
    resolveOrganizationNames(uniqueValues(items, 'organizations'), kmDocumentApi, locale.value),
    resolveGovernmentNames(uniqueValues(items, 'government'), locale.value)
  ])

  rowNames.value = {
    notifications: { ...rowNames.value.notifications, ...notificationNames },
    organizations: { ...rowNames.value.organizations, ...organizationNames },
    government: { ...rowNames.value.government, ...governmentNames }
  }
}

const toFilterOptions = (values: FacetValue[], names: Record<string, string>): FilterOption[] => values.map((facetValue) => ({ ...facetValue, name: names[facetValue.value] ?? facetValue.value }))

const loadFacets = async (): Promise<void> => {
  const [notificationsResponse, organizationsResponse, governmentResponse] = await Promise.all([
    workflowsApi.getWorkflowFacets<Partial<FacetResponse>>({ query: buildFacetQuery('notifications'), fields: ['notifications'] }),
    workflowsApi.getWorkflowFacets<Partial<FacetResponse>>({ query: buildFacetQuery('organizations'), fields: ['organizations'] }),
    workflowsApi.getWorkflowFacets<Partial<FacetResponse>>({ query: buildFacetQuery('government'), fields: ['government'] })
  ])
  const notificationsFacet = notificationsResponse.notifications ?? []
  const organizationsFacet = organizationsResponse.organizations ?? []
  const governmentFacet = (governmentResponse.government ?? []).map((facetValue) => ({ ...facetValue, value: lstring(facetValue.value) }))

  const [notificationNames, organizationNames, governmentNames] = await Promise.all([
    resolveNotificationNames(notificationsFacet.map((facetValue) => facetValue.value)),
    resolveOrganizationNames(organizationsFacet.map((facetValue) => facetValue.value), kmDocumentApi, locale.value),
    resolveGovernmentNames(governmentFacet.map((facetValue) => facetValue.value), locale.value)
  ])

  facets.value = {
    notifications: toFilterOptions(notificationsFacet, notificationNames),
    organizations: toFilterOptions(organizationsFacet, organizationNames),
    government: toFilterOptions(governmentFacet, governmentNames)
  }
}

const loadStats = async (): Promise<void> => {
  const pendingClauses = [
    { 'data.realm': realm.value },
    { 'data.metadata.schema': 'submission' },
    ...buildStatusClauses('Pending', notExpiredSince())
  ]
  const weekAgo = new Date(Date.now() - MILLISECONDS_PER_WEEK).toISOString()

  const [pendingCountResult, oldestResult, newThisWeekResult, assignedToMeResult] = await Promise.all([
    workflowsApi.queryWorkflows<{ count: number }>({ query: { $and: pendingClauses }, count: true }),
    workflowsApi.queryWorkflows<Workflow[]>({ query: { $and: pendingClauses }, length: 1, sort: { createdOn: 1 } }),
    workflowsApi.queryWorkflows<{ count: number }>({ query: { $and: [...pendingClauses, { createdOn: { $gte: weekAgo } }] }, count: true }),
    myUserID === undefined
      ? Promise.resolve({ count: 0 })
      : workflowsApi.queryWorkflows<{ count: number }>({ query: { $and: [...pendingClauses, { 'activities.assignedTo': myUserID }] }, count: true })
  ])

  const [oldest] = oldestResult
  const oldestPendingWeeks = oldest === undefined
    ? undefined
    : Math.floor((Date.now() - new Date(oldest.createdOn).getTime()) / MILLISECONDS_PER_WEEK)

  stats.value = {
    pendingCount: pendingCountResult.count,
    oldestPendingWeeks,
    newThisWeekCount: newThisWeekResult.count,
    assignedToMeCount: assignedToMeResult.count
  }
}

const loadTabCounts = async (): Promise<void> => {
  const baseClauses = [
    { 'data.realm': realm.value },
    { 'data.metadata.schema': 'submission' }
  ]

  const results = await Promise.all(TRIAGE_STATUS_TABS.map(async (tab) => {
    const query = { $and: [...baseClauses, ...buildStatusClauses(tab, notExpiredSince())] }
    const result = await workflowsApi.queryWorkflows<{ count: number }>({ query, count: true })
    return { tab, count: result.count }
  }))

  const counts = { ...tabCounts.value }
  for (const { tab, count } of results) counts[tab] = count
  tabCounts.value = counts
}
</script>

<style scoped src="./admin-triage-list.css"></style>
