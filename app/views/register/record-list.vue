<template>
  <div class="register-content-content">
    <!-- Success message -->
    <div v-if="msg" class="alert alert-success alert-dismissable">
      <button
        type="button"
        class="close"
        data-bs-dismiss="alert"
        aria-hidden="true"
        @click="msg = ''"
      >
        &times;
      </button>
      <strong>{{ msg }}</strong>
    </div>

    <!-- Filters + Actions -->
    <div class="row">
      <div class="col-md-7 col-12">
        <div class="btn-group-sm cf-xs-btn gap-2">
          <button
            id="publishedRecords"
            type="button"
            @click="changeFilter('published')"
            class="btn btn-success btn-sm fw-bold"
          >
            <i
              class="bi bi-check-square"
              :class="{ 'bi-square': activeTab !== 'published' }"
            ></i>
            <span class="badge badge-default">{{ t('published') }}</span>
          </button>

          <button
            type="button"
            @click="changeFilter('draft')"
            class="btn btn-secondary btn-sm fw-bold mx-1"
          >
            <i
              class="bi bi-check-square"
              :class="{ 'bi-square': activeTab !== 'draft' }"
            ></i>
            <span class="badge badge-default">{{ t('drafts') }}</span>
          </button>

          <input
            id="searchKeyword"
            type="text"
            v-model="keywords"
            @input="searchRecord"
            :placeholder="t('keyword')"
            class="form-control keyword input-group"
          />
        </div>
      </div>

      <div class="col-md-5 col-12">
        <div class="btn-group-sm float-md-end">
          <div class="btn border fs-small-8">
            {{ t('offlineFormat') }}
            <span
              v-for="(lang, code, index) in languages"
              :key="code"
              :data-title="lang"
              data-bs-toggle="tooltip"
              class="padding-left-right-2"
            >
              <a class="text-decoration-none me-1" rel="noopener" target="_blank">{{ code }}</a>
              <span v-if="index !== Object.keys(languages).length - 1">|</span>
            </span>
          </div>

          <a
            type="button"
            class="btn btn-outline-secondary btn-sm px-1 mx-1"
            @click="loadRecords(1)"
          >
            <i class="bi bi-arrow-repeat float-start"></i>
            <span class="fs-small-8 d-none d-md-block ps-1 float-end">
              {{ t('refresh') }}
            </span>
          </a>

          <a
            v-if="!isAdditionDisabled(schema) || tourOn"
            type="button"
            class="btn btn-primary btn-sm px-1 me-1"
            id="add-new-btn"
            rel="noopener"
            :href="`/register/${schemaShortCode}/new`"
          >
            <i class="bi bi-plus float-start"></i>
            <span class="d-none d-md-block ps-1 float-end">{{ t('addNew') }}</span>
          </a>

          <a
            type="button"
            class="btn btn-secondary btn-sm px-1"
            rel="noopener"
            href="/register"
            id="close_button"
          >
            <i class="bi bi-x-circle-fill float-start d-block d-md-none"></i>
            <span class="d-none d-md-block float-end px-2">{{ t('close') }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Records table -->
    <table class="table table-hover overflow-hidden w-100 mt-3">
      <thead>
        <tr class="text-secondary">
          <th id="titleHeader">
            {{ t('title') }}
          </th>

          <th v-if="schemaName === 'contact'" id="body.typeHeader">
            {{ t('type') }}
          </th>

          <th id="createdOnHeader" @click="toggleOrderBy('createdOn')">
            {{ t('lastPublished') }}
            <span v-if="orderBy.key === 'createdOn'">
              <i
                :class="orderBy.direction === 'desc' ? 'bi bi-chevron-down text-primary' : 'bi bi-chevron-up text-primary'"
              ></i>
            </span>
          </th>

          <th
            class="d-none d-md-block"
            id="updatedOnHeader"
            @click="toggleOrderBy('updatedOn')"
          >
            {{ t('lastUpdated') }}
            <span v-if="orderBy.key === 'updatedOn'">
              <i
                :class="orderBy.direction === 'desc' ? 'bi bi-chevron-down text-primary' : 'bi bi-chevron-up text-primary'"
              ></i>
            </span>
          </th>

          <th class="text-end th_width">
            {{ filteredRecords.length + ' Record(s)' }}
          </th>
        </tr>
      </thead>

      <!-- Loading & empty state -->
      <tr v-if="isLoading">
        <td class="ps-1 text-center p-4" colspan="6">
          <i class="fa fa-spin fa-cog"></i> {{ t('loading') }}
        </td>
      </tr>
      <tr v-if="!isLoading && filteredRecords.length === 0">
        <td class="ps-1 text-center p-4" colspan="6">
          <strong>{{ t('noRecordsFound') }}</strong>
        </td>
      </tr>

      <!-- Records -->
      <tbody v-for="record in filteredRecords" :key="record.identifier">
        <tr :id="`record${record.identifier}`">
          <!-- Title -->
          <td class="ps-1 fs-small-8 w-25">
            <a
              class="text-decoration-none"
              rel="noopener"
              :href="`/register/${schemaShortCode}/${record.identifier}/view`"
            >
              {{ lstring(record.title) }}
            </a>
            <div><span>{{ record.uniqueId }}</span></div>
          </td>

          <!-- Type (for contacts) -->
          <td
            v-if="schemaName === 'contact'"
            class="ps-1 fs-small-8 align-middle text-capitalize"
          >
            {{ record.type }}
          </td>

          <!-- Last Published -->
          <td class="ps-1 fs-small-8 align-middle">
            <UserInfo
              :user="record.updatedBy || record.createdBy"
              :date="record.updatedBy ? record.updatedOn : record.createdOn"
            />
          </td>

          <!-- Last Updated (desktop only) -->
          <td class="d-none d-md-table-cell fs-small-8 align-middle">
            <UserInfo
              :user="record.updatedBy || record.createdBy"
              :date="record.updatedBy ? record.updatedOn : record.createdOn"
            />
          </td>

          <!-- Actions -->
          <td class="px-1 fs-small-8 text-end th_width align-middle">
            <div class="btn-group btn-group-sm" role="group">
              <button
                class="btn btn-outline-secondary"
                title="Duplicate"
                type="button"
                @click="duplicateRecord(record)"
              >
                <i class="bi bi-clipboard"></i>
              </button>

              <button
                v-if="isRequest(record)"
                class="btn btn-outline-secondary"
                :title="t('locked')"
                type="button"
              >
                <i class="bi bi-file-lock2"></i>
              </button>

              <button
                v-if="isRequest(record) && isMyRecord(record)"
                class="btn btn-outline-secondary"
                :title="t('cancelRequest')"
                type="button"
                @click="askRecallWorkflowRequest(record)"
              >
                <i class="bi bi-arrow-counterclockwise"></i>
              </button>

              <a
                v-if="!isRequest(record)"
                class="btn btn-outline-secondary text-decoration-none"
                :title="t('edit')"
                rel="noopener"
                :href="`/register/${schemaShortCode}/${record.identifier}/edit`"
              >
                <i class="bi bi-pencil-square"></i>
              </a>

              <button
                class="btn btn-outline-secondary"
                :title="t('delete')"
                :class="{ red: record.type === 'absPermit' }"
                type="button"
                @click="deleteRecord(record)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div v-if="recordsCount > 25">
      <paginate
        :records-per-page="recordsPerPage"
        :record-count="recordsCount"
        :current-page="pageNumber"
        @changePage="onChangePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '../../app-text/views/register/record-list.json'
import { useRealm } from '../../services/composables/realm.js'
import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
import KmDocumentApi from '~/api/km-document'
import { lstring, formatDate } from '../../components/kb/filters'
import Paginate from '../../components/common/pagination.vue'

/* Reusable UserInfo subcomponent */
const UserInfo = {
  props: { user: Object, date: String },
  template: `
    <div v-if="user">
      <a class="text-decoration-none" rel="noopener" :href="'mailto:' + encodeURIComponent(user.email)">
        <strong>{{ user.firstName + ' ' + user.lastName }}</strong>
      </a>
      <br />
      <span class="fs-small-6">{{ formatDate(date) }}</span>
    </div>
  `,
  methods: { formatDate }
}

/* Setup */
const auth = useAuth()
const { t } = useI18n({ messages })
const realm = useRealm()
const route = useRoute().value
const schemaShortCode = ref(route.params.document_type)
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })

/* Injected helpers */
const askDelete = inject('askDelete')
const askDuplicate = inject('askDuplicate')
const getUniqueId = inject('getUniqueId')
// const askRecallWorkflowRequest = inject('askRecallWorkflowRequest');

/* State */
const isLoading = ref(false)
const filteredRecords = ref([])
const activeTab = ref('published')
const pageNumber = ref(1)
const recordsCount = ref(0)
const recordsPerPage = ref(25)
const keywords = ref('')
const orderBy = ref({ key: 'updatedOn', direction: 'desc' })
const msg = ref('')

/* Props */
const props = defineProps({
  languages: { type: Object, required: true }, // will import from constants
  schemaName: { type: String, required: true },
  user: { type: Object, required: true },
  refreshKey: { type: Boolean, default: false }
})

/* Watchers */
watch(
  () => props.refreshKey,
  async () => {
    await loadRecords(1)
  }
)

/* Lifecycle */
onMounted(async () => {
  await loadRecords(1)
})

/* Methods */
const onChangePage = async (page) => {
  isLoading.value = true
  window.scrollTo(0, 0)
  await loadRecords(page)
}

const searchRecord = async () => {
  // ToDo: add search logic
  await loadRecords(1)
}

const toggleOrderBy = (key) => {
  orderBy.value =
    orderBy.value.key === key
      ? { key, direction: orderBy.value.direction === 'asc' ? 'desc' : 'asc' }
      : { key, direction: 'asc' }
  loadRecords(1)
}

const loadRecords = async (page = 1) => {
  filteredRecords.value = []
  if (!props.schemaName || !props.user.isAuthenticated) return

  pageNumber.value = page
  isLoading.value = true

  try {
    const collectionType = activeTab.value === 'published' ? 'my' : 'mydraft'

    const query = {
      $filter: `(type eq '${props.schemaName}')`,
      $top: recordsPerPage.value,
      $skip: (page - 1) * recordsPerPage.value,
      $orderby: `${orderBy.value.key} ${orderBy.value.direction}`,
      collection: collectionType
    }
    if (keywords.value.trim()) query.text_EN_txt = keywords.value.trim()

    const res = await kmDocumentApi.queryDocuments(query)
    filteredRecords.value = await Promise.all(
      (res?.Items || []).map(async (r) => ({
        ...r,
        uniqueId: await getUniqueId(r)
      }))
    )
    recordsCount.value = res?.Count || 0
  } catch (err) {
    console.error('Failed to load records:', err)
    filteredRecords.value = []
    recordsCount.value = 0
  } finally {
    isLoading.value = false
  }
}

const isAdditionDisabled = (schema) => realm.schemas[schema]

const changeFilter = async (type) => {
  if (activeTab.value !== type) {
    activeTab.value = type
    await loadRecords(1)
  }
}

const isRequest = (record) => record?.workingDocumentLock
const isMyRecord = (record) =>
  record?.workingDocumentLock?.lockedBy.userID === props.user.userID

const duplicateRecord = (record) => askDuplicate(record)
const deleteRecord = (record) => askDelete(record)
</script>
