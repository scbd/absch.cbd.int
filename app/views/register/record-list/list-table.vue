<template>
  <div>
    <table class="table table-hover overflow-hidden w-100 mt-3">
      <thead>
        <tr class="text-secondary">
          <th id="titleHeader">{{ t('title') }}</th>
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

          <td class="px-1 fs-small-8 text-end th_width align-middle">
            <!-- v-if="record.canEdit" -->
            <edit-record
              :identifier="record.identifier"
              :schema-code="schemaShortCode"
            >
            </edit-record>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <paginate
      v-if="totalCount > pageSize"
      :records-per-page="pageSize"
      :record-count="totalCount"
      :current-page="currentPage"
      @changePage="$emit('changePage', $event)"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/register/record-list.json'
import paginate from '~/components/common/pagination.vue'
import { lstring } from '~/components/kb/filters'
import { useRoute } from '@scbd/angular-vue/src/index.js'
import editRecord from '~/components/register/edit-record.vue'

const { t } = useI18n({ messages })

const route = useRoute().value
const schemaShortCode = route?.params?.document_type || ''

defineProps({
  records: { type: Array, default: () => [] },
  totalCount: { type: Number, default: 0 },
  pageSize: { type: Number, default: 25 },
  currentPage: { type: Number, default: 1 }
})
</script>
