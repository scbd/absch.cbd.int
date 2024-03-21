<template>
    <div class="d-flex justify-content-center text-center">
      <paginate v-if="recordCount"
        :page-count="pageCount"
        :first-last-button="true"
        :page-range="recordsPerPage"
        :margin-pages="1"
        :click-handler="setPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :first-button-text="'First'"
        :last-button-text="'Last'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        v-model="internalCurrentPage"
      >
      </paginate>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineExpose, defineEmits } from 'vue'; 
  import Paginate from 'vuejs-paginate-next';
  
  const { recordCount, recordsPerPage, currentPage } = defineProps({
    recordCount: { type: Number, required: true },
    recordsPerPage: { type: Number, required: true }, // ToDo: will add number of records per page
    currentPage: { type: Number, required: true }
  });

  const emit = defineEmits(['changePage']);

  const internalCurrentPage = ref(currentPage);
  
  const setPage = (page) => {  
    internalCurrentPage.value = page;    
    emit('changePage', page);
  };
  const pageCount = computed(() => Math.ceil(recordCount / recordsPerPage));
</script>
