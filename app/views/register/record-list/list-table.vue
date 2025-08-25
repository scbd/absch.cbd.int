<template>
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
            {{ records.length + ' Record(s)' }}
          </th>
        </tr>
      </thead>

      <!-- Loading & empty state -->
      <tr v-if="isLoading">
        <td class="ps-1 text-center p-4" colspan="6">
          <i class="fa fa-spin fa-cog"></i> {{ t('loading') }}
        </td>
      </tr>
      <tr v-if="!isLoading && records.length === 0">
        <td class="ps-1 text-center p-4" colspan="6">
          <strong>{{ t('noRecordsFound') }}</strong>
        </td>
      </tr>

      <!-- Records -->
      <tbody v-for="record in records" :key="record.identifier">
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

              <!-- <button
                v-if="isRequest(record)"
                class="btn btn-outline-secondary"
                :title="t('locked')"
                type="button"
              >
                <i class="bi bi-file-lock2"></i>
              </button> -->

              <!-- <button
                v-if="isRequest(record) && isMyRecord(record)"
                class="btn btn-outline-secondary"
                :title="t('cancelRequest')"
                type="button"
                @click="askRecallWorkflowRequest(record)"
              >
                <i class="bi bi-arrow-counterclockwise"></i>
              </button> -->

              <!-- v-if="!isRequest(record)" -->
              <a
                
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
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '../../../app-text/views/register/record-list.json'

import { lstring, formatDate } from '../../../components/kb/filters'

const { t } = useI18n({ messages })

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


const props = defineProps({
  records: { type: Array, default: () => [] },
})
</script>
