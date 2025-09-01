<template>

    <table class="table table-hover overflow-hidden w-100 mt-3">
      <thead>
        <tr class="text-secondary">
          <th id="titleHeader">{{ t('title') }}</th>
          <th v-if="schemaShortCode=='CON'">{{ t('type') }}</th>
          <th>{{ t('lastPublished') }}</th>
          <th class="text-end th_width">
            {{ totalCount + ' Record(s)' }}
          </th>
        </tr>
      </thead>

      <tr v-if="!records.length">
        <td class="ps-1 text-center p-4" colspan="6">
          <strong>{{ t('noRecordsFound') }}</strong>
        </td>
      </tr>

      <tbody v-for="record in records" :key="record.identifier">
        <tr :id="`record${record.identifier}`">
          <td class="ps-1 fs-small-8 w-50">
            <a
              class="text-decoration-none"
              rel="noopener"
              :href="`/register/${schemaShortCode}/${record.identifier}/view`"
            >
              {{ lstring(record.title) }}
            </a>
            <div><span>{{ record.identifier }}</span></div>
          </td>
          <td v-if="schemaShortCode=='CON'" class="ps-1 fs-small-8 w-25 align-middle text-capitalize" >
              {{record.type}}
          </td>

          <td class="ps-1 fs-small-8 w-25">
            <user-info v-if="record.updatedBy" :user="record.updatedBy" />
            <br>
            <!-- ToDo: confirm date field -->
            <span>{{formatDate(record.updatedOn , 'DD MMM YYYY HH:mm')}}</span>
          </td>

          <td class="px-1 fs-small-8 text-end th_width align-middle w-25">
            <div class="btn-group btn-group-sm" role="group">
              <duplicate-record :record="record" @refresh="handleChangePage(currentPage)"></duplicate-record>
              <!-- v-if="record.canEdit" -->
              <edit-record
                :identifier="record.identifier"
                :schema-code="schemaShortCode"
              >
              </edit-record>
              <delete-record :record="record" @refresh="handleChangePage(currentPage)"></delete-record>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
      <!-- it should be 25 not pageSize -->
    <pagination v-if="totalCount > 25"
        :records-per-page="pageSize" 
        :record-count="totalCount"
        :current-page="currentPage"
        @changePage="handleChangePage"
        @pageSizeChanged="handlePageSizeChanged">
      </pagination>
</template>

<script setup>
  import { defineEmits } from "vue";
  import { useI18n } from 'vue-i18n'
  import { formatDate, lstring } from '~/components/kb/filters'
  import { useRoute } from '@scbd/angular-vue/src/index.js'
  import messages from '~/app-text/views/register/record-list.json'

  import editRecord from '~/components/register/edit-record.vue';
  import deleteRecord from '~/components/register/delete-record.vue';
  import duplicateRecord from '~/components/register/duplcate-record.vue';
  import userInfo from '~/components/register/user-info.vue'
  import pagination from '~/components/common/pagination.vue'


  const emit = defineEmits(["changePage", "pageSizeChanged"])
  const { t } = useI18n({ messages });

  const route = useRoute().value;
  const schemaShortCode = route?.params?.document_type || ''

  defineProps({
    records: { type: Array, default: () => [] },
    totalCount: { type: Number, default: 0 },
    pageSize: { type: Number, default: 25 },
    currentPage: { type: Number, default: 1 }
  });

  const handleChangePage = (page) => {
    console.log("page", page);
    emit("changePage", page);
  };

  const handlePageSizeChanged = (size) => {
    emit("pageSizeChanged", size);
  }
</script>

<style scoped>
    .table>:not(:first-child) {
        border-top: none;
    }
</style>
