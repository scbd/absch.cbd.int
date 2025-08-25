<template>
  <div class="row">
    <div class="col-md-7 col-12">
      <div class="btn-group-sm cf-xs-btn">
        <!-- slot for filter buttons -->
        <slot name="filter">
          <published-records @updateRecords="handleUpdate"></published-records>
        </slot>
      </div>
    </div>
    <div class="col-md-5 col-12">
      <div class="btn-group-sm float-md-end">
        <!-- slot for right buttons -->
        <slot name="right-buttons">
          <offline-formats schema="focalPoint"></offline-formats>
        </slot>
      </div>
    </div>
  </div>

  <div>
    <!-- slot for list table -->
    <slot name="list-table">
       <list-table :records="recordsList"></list-table>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import listTable from './list-table.vue'
import offlineFormats from '../../../components/common/offline-formats.vue'
import publishedRecords from './published-records.vue'
// import recordsFilterButton from './records-filter-button.vue';
const recordsList = ref([]);

const handleUpdate = (records) => {
  recordsList.value = records
}

</script>
