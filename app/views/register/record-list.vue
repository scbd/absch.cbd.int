<template>
    <div class="register-content-content">
      <div v-show="msg" class="alert alert-success alert-dismissable">
        <button type="button" class="close" data-bs-dismiss="alert" aria-hidden="true" @click="msg=''" >&times;</button>
        <strong>{{ msg }}</strong>
      </div>
      <div class="row">
        <div class="col-md-7 col-12">
          <div class="btn-group-sm cf-xs-btn gap-2">
            <button id="publishedRecords" type="button" @click="changeFilter('published')" class="btn btn-success btn-sm fw-bold">
                <i class="bi bi-check-square" :class="{'bi-square': activeTab !== 'published'}"></i> 
              <span class="badge badge-default"> {{ t('published') }} </span>
            </button>
            <button type="button" @click="changeFilter('draft')" class="btn btn-secondary btn-sm fw-bold mx-1">
                <i class="bi bi-check-square" :class="{'bi-square': activeTab !== 'draft'}"></i> 
              <span class="badge badge-default"> {{ t('drafts') }} </span>
            </button>
            <input
                id="searchKeyword"
                type="text"
                v-model="keywords"
                @input="searchRecord"
                :placeholder="t('keyword')"
                class="form-control keyword input-group">
          </div>
        </div>
        <div class="col-md-5 col-12">
          <div class="btn-group-sm float-md-end">
            <div class="btn border fs-small-8">{{ t('offlineFormat') }}
              <span v-for="(lang, code, index) in languages" :key="code" :data-title="lang" data-bs-toggle="tooltip" data-container="body" class="padding-left-right-2">
                <a class="text-decoration-none me-1" rel="noopener" target="_blank">{{ code }}</a>
                  <span v-if="index !== Object.keys(languages).length - 1">|</span>
              </span>
            </div>
            <a type="button" class="btn btn-outline-secondary btn-sm px-1 mx-1" @click="loadRecords(1)">
              <i class="bi bi-arrow-repeat float-start"></i> <span class="fs-small-8 d-none d-md-block ps-1 float-end">{{ t('refresh') }}</span>
            </a>
            <a type="button" class="btn btn-primary btn-sm px-1 me-1" v-if="!isAdditionDisabled(schema) || tourOn" id="add-new-btn" rel="noopener" :href="`/register/${schemaShortCode}/new`">
              <i class="bi bi-plus float-start"></i>
              <span class="d-none d-md-block ps-1 float-end">{{ t('addNew') }}</span>
            </a>
            <a type="button" class="btn btn-secondary btn-sm px-1" rel="noopener" href="/register" id="close_button">
              <i class="bi bi-x-circle-fill float-start d-block d-md-none"></i>
              <span class="d-none d-md-block float-end px-2">{{ t('close') }}</span>
            </a>
          </div>
        </div>
      </div>
      <table class="table table-hover overflow-hidden w-100 mt-3">
        <thead>
          <tr class="text-secondary">
            <th id="titleHeader" @click="toggleOrderBy('title')">
              {{ t('title') }}
              <span v-if="orderBy.key === 'title'">
                <i :class="orderBy.direction === 'desc' ? 'bi bi-chevron-down text-primary' : 'bi bi-chevron-up text-primary'"></i>
              </span>
            </th>

            <th v-if="schemaName=='contact'" id="body.typeHeader">
              {{ t('type') }}
            </th>

            <th id="createdOnHeader" @click="toggleOrderBy('createdOn')">
              {{ t('lastPublished') }}
              <span v-if="orderBy.key === 'createdOn'">
                <i :class="orderBy.direction === 'desc' ? 'bi bi-chevron-down text-primary' : 'bi bi-chevron-up text-primary'"></i>
              </span>
            </th>

            <th class="d-none d-md-block" id="updatedOnHeader" @click="toggleOrderBy('updatedOn')">
              {{ t('lastUpdated') }}
              <span v-if="orderBy.key === 'updatedOn'">
                <i :class="orderBy.direction === 'desc' ? 'bi bi-chevron-down text-primary' : 'bi bi-chevron-up text-primary'"></i>
              </span>
            </th>

            <th class="text-end th_width">{{ filteredRecords.length + ' Record(s)' }}</th>
          </tr>

        </thead>
 
        <tr v-if="isLoading">
          <td class="ps-1 text-center p-4" colspan="6"><i class="fa fa-spin fa-cog" ></i> {{ t('loading') }}</td>
        </tr> 
        <tr v-if="!isLoading && filteredRecords.length === 0">
          <td class="ps-1 text-center p-4" colspan="6"> <strong>{{ t('noRecordsFound') }}</strong></td>
        </tr>
        <tbody class="border-0" v-for="record in filteredRecords" :key="record.identifier">
          <tr :id="`record${record.identifier}`">
            <td class="ps-1 fs-small-8 w-25">
              <span>
                <a class="text-decoration-none" rel="noopener" :href="`/register/${schemaShortCode}/${record.identifier}/view`">
                  <span>{{ lstring(record.workingDocumentTitle || record.title) }}</span>
                </a>
              </span>

              <!-- ToDo: in case of draft, don't show uniqueID -->
              <div >
                  <span>{{ record.uniqueId }}</span>
                 <!-- <span v-show="isDraft(record) || (isPublished(record) && isDraft(record))" class="badge bg-secondary text-uppercase">draft</span> -->
              </div>
            </td>
            <td class="ps-1 fs-small-8 align-middle text-capitalize" v-if="schemaName=='contact'">
              <span>{{ record.type }}</span>
            </td>
            <td class="ps-1 fs-small-8 align-middle">
              <div v-if="record.updatedBy">
                   <a class="text-decoration-none" rel="noopener" :href="`mailto:${encodeURIComponent(record.createdBy.email)}`">
                  <strong>{{ record.updatedBy.firstName + ' ' + record.updatedBy.lastName }}</strong>
                  </a>
                <br>
                <span class="fs-small-6">{{ formatDate(record.updatedOn) }}</span>
              </div>
              <div v-if="!record.updatedBy">
                 <a class="text-decoration-none" rel="noopener" :href="`mailto:${encodeURIComponent(record.createdBy.email)}`">  
                  <strong>{{ record.createdBy.firstName + ' ' + record.createdBy.lastName }}</strong>
               </a>  
                <br>
                <span>{{ formatDate(record.createdOn) }}</span>
              </div>
            </td>
            <td class="d-none d-md-table-cell fs-small-8 align-middle">
          
              <div v-show="record.updatedBy">
                   <a class="text-decoration-none" rel="noopener" :href="`mailto:${encodeURIComponent(record.createdBy.email)}`" >
                  <strong>{{ record.updatedBy.firstName + ' ' + record.updatedBy.lastName }}</strong>
                 </a>   
                <br>
                <span class="fs-small-6">{{ formatDate(record.updatedOn) }}</span>
              </div>
              <div class="pt-3" v-show="record.createdBy && !record.updatedBy">
                <a class="text-decoration-none" rel="noopener" :href="`mailto:${encodeURIComponent(record.createdBy.email)}`">
                  <strong>{{ record.createdBy.firstName + ' ' + record.createdBy.lastName }}</strong>
                </a>
                <br>
                <span>{{ formatDate(record.createdOn) }}</span>
              </div>
            </td>
            <!-- <td class="ps-1 fs-small-8 align-middle align-middle">
               <div class="color-published-green bold" v-if="activeTab === 'published'"> {{ t('published') }} </div>
               <div class="color-published-green bold" v-if="activeTab !== 'published'"> {{ t('draft') }} </div>
            </td> -->
            <td class="px-1 fs-small-8 text-end th_width align-middle">
              <div class="btn-group btn-group-sm" role="group" aria-label="...">
                <button class="btn btn-outline-secondary" id="duplicateRecord" title="Duplicate" type="button" @click="duplicateRecord(record)">
                  <i class="bi bi-clipboard"></i>
                </button>
                <button class="btn btn-outline-secondary" :title="t('locked')" v-show="isRequest(record)" type="button">
                  <i class="bi bi-file-lock2"></i>
                </button>
                <button class="btn btn-outline-secondary" :title="t('cancelRequest')" v-show="isRequest(record) && isMyRecord(record)" type="button" @click="askRecallWorkflowRequest(record)">
                  <i class="bi bi-arrow-counterclockwise"></i>
                </button>
                <a class="btn btn-outline-secondary text-decoration-none" id="editRecord" rel="noopener" :title="t('edit')" v-show="!isRequest(record)" type="button" :href="`/register/${schemaShortCode}/${record.identifier}/edit`">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <button class="btn btn-outline-secondary" id="deleteRecord" :title="t('delete')" :class="{'red':(record.type == 'absPermit')}" type="button" @click="deleteRecord(record)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <div class="btn-group document_buttons btn-group-sm"></div>
            </td>
          </tr>
          </tbody>
      </table>
    </div>
      <div v-if="recordsCount>25">
        <paginate :records-per-page="recordsPerPage" :record-count="recordsCount" @changePage="onChangePage"
          :current-page="pageNumber"></paginate>
      </div>
</template>
  
<script setup>
import { ref, onMounted, inject, watch } from "vue";
import { useI18n } from "vue-i18n";
import messages from "../../app-text/views/register/record-list.json";
import { useRealm } from "../../services/composables/realm.js";
import { useAuth, useRoute } from "@scbd/angular-vue/src/index.js";
import KmDocumentApi from "~/api/km-document";
import { lstring, formatDate } from '../../components/kb/filters';
import Paginate from '../../components/common/pagination.vue';

const auth = useAuth();
const { t, locale } = useI18n({ messages });
const realm = useRealm();
const route = useRoute().value;
const schemaShortCode = ref(route.params.document_type);
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() });

const askDelete = inject('askDelete');
const askDuplicate = inject('askDuplicate');
const getUniqueId = inject('getUniqueId');
const isLoading = ref(false);
const filteredRecords = ref([]); 
const activeTab = ref("");
const pageNumber = ref(1);
const recordsCount = ref(0);
const recordsPerPage = ref(25);
const keywords = ref("");
const orderBy = ref({ key: "updatedOn", direction: "desc" });

const onChangePage = async (page) => {
  isLoading.value = true;
  window.scrollTo(0, 0);
  await loadRecords(page);
};
const props = defineProps({
    languages  : { type: Object,  required: true},
    schemaName : { type: String,  required: true},
    user       : { type: Object,  required: true},
    refreshKey : { type: Boolean, record: false}
  });

onMounted( async() => { 
  activeTab.value = "published";
  await loadRecords(1);
});

watch(
  () => props.refreshKey,
  async () => {
    console.log("Refresh triggered from Angular!");
    await loadRecords(1);
  }
);

const searchRecord = async () => {
  // change my to dynamic
  await loadRecords(1);
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((o, k) => (o ? o[k] : null), obj);
}
const toggleOrderBy = (key) => {
  console.log("key local", locale.value)
    if (orderBy.value.key === key) {
    orderBy.value.direction =
      orderBy.value.direction === "asc" ? "desc" : "asc";
  } else {
    orderBy.value = { key, direction: "asc" };
  }
  loadRecords(1);
};

const loadRecords = async (page = 1) => {
  filteredRecords.value = [];
  if (!props.schemaName && !props.user.isAuthenticated) return;
  pageNumber.value = page;
  isLoading.value = true;

  try {
    const collectionType = activeTab.value === "published" ? "my" : "mydraft";

    const query = {
      $filter: `(type eq '${props.schemaName}')`,
      $top: recordsPerPage.value,
      $skip: (page - 1) * recordsPerPage.value,
      $orderby: `${orderBy.value.key} ${orderBy.value.direction}`,
      collection: collectionType,
    };
    if (keywords.value && keywords.value.trim()) {
      query.text_EN_txt = keywords.value.trim();
    }
    const res = await kmDocumentApi.queryDocuments(query);
    filteredRecords.value = await Promise.all(
      (res?.Items || []).map(async (r) => ({
        ...r,
        uniqueId: await getUniqueId(r)
      }))
    );

    recordsCount.value = res?.Count || 0;
  } catch (err) {
    console.error("Failed to load records:", err);
    filteredRecords.value = [];
    recordsCount.value = 0;
  } finally {
    isLoading.value = false;
  }
};
 
const isAdditionDisabled = (schema) =>{
    return  realm.schemas[schema]; //.disableAdd;
}

const changeFilter = async (type) => {
  if((activeTab.value === 'published' && type === 'published') || (activeTab.value === 'draft' && type === 'draft')) return;
  activeTab.value = type;
  await loadRecords(1);
}


// const isPublished = (record) => { return record.status === 'published' };
// const isDraft = (record) => { return record.status === 'draft' };
const isRequest = (record) => {  return record && record.workingDocumentLock; };
const isMyRecord = (record) => {
  return (
    record &&
    record.workingDocumentLock &&
    record.workingDocumentLock.lockedBy.userID === props.user.userID
  );
};
const duplicateRecord =  (record) => askDuplicate(record);
const deleteRecord =  (record) => askDelete(record);
 </script>
