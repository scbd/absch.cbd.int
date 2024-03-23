<template>
  <nav v-if="recordCount" aria-label="Pagination" class="pagination d-flex justify-content-center text-center">
    <ul class="pagination">
    <li v-if="firstLastButton" @click="setPage(1)" :class="{ 'disabled': internalCurrentPage === 1 }" class="page-item">
    <a class="page-link">{{ firstButtonText }}</a>
      </li>
      <li @click="previousPage" :class="{ 'disabled': internalCurrentPage === 1 }" class="page-item">
        <a class="page-link">{{ prevText }}</a>
      </li>
      <template v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
        <li @click="setPage(pageNumber)" :class="{ 'active': internalCurrentPage === pageNumber }" class="page-item">
          <a class="page-link">{{ pageNumber }}</a>
        </li>
      </template>
      <li @click="nextPage" :class="{ 'disabled': internalCurrentPage === pageCount }" class="page-item">
        <a class="page-link">{{ nextText }}</a>
      </li>
      <li v-if="lastButtonText" @click="setPage(pageCount)" :class="{ 'disabled': internalCurrentPage === pageCount }" class="page-item">
        <a class="page-link">{{ lastButtonText }}</a>
      </li>
    </ul>
  </nav>

</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const { recordCount, recordsPerPage, currentPage, firstLastButton, firstButtonText, lastButtonText, prevText, nextText } = defineProps({
  recordCount: { type: Number, required: true },
  recordsPerPage: { type: Number, required: true },
  currentPage: { type: Number, required: true },
  firstLastButton: { type: Boolean, default: true },
  firstButtonText: { type: String, default: 'First' },
  lastButtonText: { type: String, default: 'Last' },
  prevText: { type: String, default: 'Prev' },
  nextText: { type: String, default: 'Next' }
});

const emit = defineEmits(['changePage']);

const internalCurrentPage = ref(currentPage);

const setPage = (page) => {
  internalCurrentPage.value = page;
  emit('changePage', page);
};

const pageCount = computed(() => Math.ceil(recordCount / recordsPerPage));

const visiblePageNumbers = computed(() => {
  const totalPages = pageCount.value;
  const currentPage = internalCurrentPage.value;
  const pageRange = 2;
  const visiblePages = [];

  let startPage = Math.max(1, currentPage - pageRange);
  let endPage = Math.min(totalPages, currentPage + pageRange);

  if (currentPage - pageRange <= 0) {
    endPage = Math.min(pageRange * 2 + 1, totalPages);
  }

  if (currentPage + pageRange >= totalPages) {
    startPage = Math.max(totalPages - pageRange * 2, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
});

const previousPage = () => {
  if (internalCurrentPage.value > 1) {
    internalCurrentPage.value--;
    setPage(internalCurrentPage.value);
  }
};

const nextPage = () => {
  if (internalCurrentPage.value < pageCount.value) {
    internalCurrentPage.value++;
    setPage(internalCurrentPage.value);
  }
};
</script>

<style scoped>
.pagination{
  /* ToDo: change the style  */
  font-size: 20px;
  cursor: pointer;
}
.disabled {
  cursor:default !important;
}
</style>
