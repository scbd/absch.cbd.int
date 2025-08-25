<template>
  <div class="row">
    <div class="col-md-7 col-12">
      <div class="btn-group-sm cf-xs-btn">
        <!-- <published-records @updateRecords="handleUpdate"></published-records> -->
        <records-filter-button class="btn-success mx-1"
          collection="my" 
          title="Published" 
          @updateRecords="handleUpdate"
        ></records-filter-button>

        <records-filter-button class="btn-secondary mx-1"
          collection="mydraft" 
          title="Drafts" 
          @updateRecords="handleUpdate"
        ></records-filter-button>
      </div>
    </div>
    <div class="col-md-5 col-12">
      <div class="btn-group-sm float-md-end">
        <offline-formats schema="focalPoint"></offline-formats>
      </div>
    </div>
  </div>

  <div>
    <slot>
      <list-table :records="recordsList"></list-table>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import listTable from './list-table.vue'
import offlineFormats from '../../../components/common/offline-formats.vue'
// import publishedRecords from './published-records.vue'
import recordsFilterButton from './records-filter-button.vue';
const recordsList = ref([]);

const handleUpdate = (records) => {
  recordsList.value = records
}

</script>
