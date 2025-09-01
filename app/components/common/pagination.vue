<template>
  <div>
    <nav aria-label="Page navigation" v-if="pageCount > 0">
      <ul class="pagination d-flex justify-content-center text-center">
        <li class="page-item d-none d-lg-inline-block disabled pagination-page-count">
          <a class="page-link" disabled>
            <strong>{{ t('page') }} {{ currentPage }} {{ t('of') }} {{ pageCount }}</strong>
          </a>
        </li>
        <li :class="{ disabled: currentPage === 1 }" class="page-item d-none d-sm-inline-block pagination-btn-first">
          <a class="page-link" @click="setPage(1)" :disabled="currentPage === 1">« {{ t('first') }}</a>
        </li>
        <li :class="{ disabled: currentPage === 1 }" class="page-item pagination-btn-prev">
          <a class="page-link" @click="previousPage" :disabled="currentPage === 1">‹ <span class="d-none d-sm-inline-block">{{ t('prev') }}</span></a>
        </li>

        <li v-for="page in visiblePageNumbers" :key="page"
            :class="{ active: page === currentPage }"
            class="page-item pagination-btn-page-number">
          <a class="page-link" @click="setPage(page)">{{ page }}</a>
        </li>

        <li :class="{ disabled: currentPage === pageCount }" class="page-item pagination-btn-next">
          <a class="page-link" @click="nextPage" :disabled="currentPage === pageCount"><span class="d-none d-sm-inline-block">{{ t('next') }}</span> ›</a>
        </li>

        <li :class="{ disabled: currentPage === pageCount }" class="page-item d-none d-sm-inline-block pagination-btn-last">
          <a class="page-link" @click="setPage(pageCount)" :disabled="currentPage === pageCount">{{ t('last') }} »</a>
        </li>

        <li class="page-item d-none d-lg-inline-block disabled pagination-record-count">
          <a class="page-link" disabled>
            <strong>
              {{ startRecord }} - {{ endRecord }} {{ t('of') }} {{ recordCount }}
            </strong>
          </a>
        </li>

        <!-- Items per page -->
        <li class="page-item d-none d-md-inline-block pagination-items-per-page">
          <a class="page-link" disabled>
            <span class="d-none d-lg-inline-block">{{ t('itemsPerPage') }}</span>
            <select
              style="color:#0d6efd;"
              v-model.number="recordsPerPageSize"
              @change="updatePageSize"
            >
              <option
                v-for="opt in pageSizeOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </a>
        </li>

      </ul>
    </nav>

    <!-- we need to keep it for search, copied nd chnage from angular pagnation -->
    <!-- For Search crawlers create hidden href -->
    <div style="display:none">
      <a v-for="page in pageCount" :key="page" :href="`/search?currentPage=${encodeURIComponent(page)}`">{{ page }}</a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { PAGINATION_OPTIONS_DEFAULT, CACHE_GENERIC_PAGE_SIZE } from '../../services/filters/constant';
import messages from '../../app-text/components/common/pagination.json';
const { t } = useI18n({ messages });

const props = defineProps({
  recordCount: { type: Number, required: true },
  recordsPerPage: { type: Number, default: 25 },
  currentPage: { type: Number, required: true },
  pageSizeOptions: {
    type: Array,
    default: () => PAGINATION_OPTIONS_DEFAULT
  }
});
const emit = defineEmits(['changePage', 'pageSizeChanged']);

const recordsPerPageSize = ref(props.recordsPerPage);


onMounted(() => {
  const cached = localStorage.getItem(CACHE_GENERIC_PAGE_SIZE);
  if (cached) {
    recordsPerPageSize.value = parseInt(cached, 10);
    } else {
    localStorage.setItem(CACHE_GENERIC_PAGE_SIZE, props.recordsPerPage);
  }
});

const pageCount = computed(() => Math.ceil(props.recordCount / recordsPerPageSize.value));

const visiblePageNumbers = computed(() => {
  const showPages = window.innerWidth <= 768 ? 3 : 6;
  const total = pageCount.value;
  const current = props.currentPage;
  const middle = Math.floor(showPages / 2);
  let start = 1;
  let end = total;

  if (total > showPages) {
    if (current > middle) start = current - middle;
    end = Math.min(total, start + showPages - 1);
    start = Math.max(1, end - showPages + 1);
  }

  const range = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
});

const setPage = (page) => {
  if (page >= 1 && page <= pageCount.value) {
    emit('changePage', page);
  }
};
const previousPage = () => setPage(props.currentPage - 1);
const nextPage = () => setPage(props.currentPage + 1);

// 🔹 when user changes size, persist + emit
const updatePageSize = () => {
  localStorage.setItem(CACHE_GENERIC_PAGE_SIZE, recordsPerPageSize.value);
  emit('pageSizeChanged', recordsPerPageSize.value);
};

const startRecord = computed(() => ((props.currentPage - 1) * recordsPerPageSize.value) + 1);
const endRecord = computed(() => Math.min(props.currentPage * recordsPerPageSize.value, props.recordCount));
</script>

<style scoped>
.pagination {
  font-size: 14px;
  cursor: pointer;
}
.disabled {
  cursor: default !important;
}
</style>
