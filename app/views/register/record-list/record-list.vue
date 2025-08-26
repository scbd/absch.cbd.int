  <template>
    <div class="register-content-content">
      <div class="row">
        <div class="col-md-7 col-12">
          <div class="btn-group-sm cf-xs-btn">
            <slot name="filter">
              <!-- hold a ref so we can call changePage(page) on the child -->
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
              <offline-formats schema="focalPoint" />
            </slot>
          </div>
        </div>
      </div>

      <div>
        <slot name="list-table">
          <list-table
            :records="recordsList"
            :total-count="totalRecords"
            :page-size="pageSize"
            :current-page="currentPage"
            @changePage="handlePageChange"
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

  const recordsList = ref([])
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const pageSize = 25

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
    publishedRef.value?.changePage(page)
  }
  </script>
