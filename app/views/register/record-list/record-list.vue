  <template>
    <div class="register-content-content">
      <div class="row">
        <div class="col-md-7 col-12">
          <div class="btn-group-sm cf-xs-btn">
            <slot name="filter">
              <!-- hold a ref so we can call changePage(page) on the child, in published-records we have defineExpose({ changePage }) -->
              <published-records
                ref="publishedRef"
                @updateRecords="handleUpdate"
                @updateTotal="handleTotal"
              />
            </slot>
          </div>
        </div>
        <div class="col-md-5 col-12">
          <div class="btn-group-sm float-md-end">
            <slot name="right-buttons">
                  <offline-formats schema="focalPoint" class="me-1" />
                  <!-- vClick="refreshList(schema);" v-if="showAddButton()" -->
                  <a type="button" class="btn btn-outline-secondary btn-sm px-1 me-1">
                      <i class="bi bi-arrow-repeat float-start"></i> <span class="fs-small-8 d-none d-md-block ps-1 float-end">{{ t('refresh') }}</span>
                  </a>
                  <a type="button" class="btn btn-primary btn-sm px-1 me-1"  id="add-new-btn" rel="noopener" translation-url 
                      ng-href="/register/{{schemaShortCode}}/new">
                      <i class="bi bi-plus float-start"></i>
                      <span class="d-none d-md-block ps-1 float-end">{{ t('addNew') }}</span>
                  </a>
                  <a type="button" class="btn btn-secondary btn-sm px-1 me-1" rel="noopener" translation-url  href="/register" id="close_button">
                      <i class="bi bi-x-circle-fill float-start d-block d-md-none"></i>
                      <span class="d-none d-md-block float-end px-2">{{ t('close') }}</span>
                  </a>
            </slot>
          </div>
        </div>
      </div>

      <div>
        <slot name="list-table">
           <!-- // @changePage="handlePageChange" ask published-records to fetch the selected page -->
          <list-table
            :records="recordsList"
            :total-count="totalRecords"
            :page-size="pageSize"
            :current-page="currentPage"
            @changePage="handlePageChange"
            @pageSizeChanged="handlePageSizeChanged"
          />
        </slot>
      </div>
    </div>
  </template>

<script setup>
  import { ref } from 'vue'
  import listTable from './list-table.vue'
  import offlineFormats from '../../../components/common/offline-formats.vue'
  import publishedRecords from './published-records.vue'
  import { useI18n } from 'vue-i18n'
  import messages from '~/app-text/views/register/record-list.json'

  import { useRoute } from '@scbd/angular-vue/src/index.js'
  const route = useRoute().value
  const { t } = useI18n({ messages })
  const schemaShortCode = route?.params?.document_type || ''

  const recordsList = ref([])
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const pageSize = 5

  const publishedRef = ref(null)

  const handleUpdate = (records) => {
    recordsList.value = records
  }

  const handleTotal = (count) => {
    totalRecords.value = count
  }

  const handlePageChange = (page) => {
    currentPage.value = page
    // ask published-records to fetch the selected page
    publishedRef.value?.changePage(page);
  }

  const handlePageSizeChanged = (size) => {
    currentPage.value = 1;
    publishedRef.value?.pageSizeChanged(size);
  }
  </script>
