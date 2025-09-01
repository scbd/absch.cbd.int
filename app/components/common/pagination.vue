<template>
  <div>
    <nav :aria-label="t('pagination')" v-if="pageCount > 0">
      <ul class="pagination d-flex justify-content-center text-center">
        <!-- Page count -->
        <li class="page-item d-none d-lg-inline-block disabled pagination-page-count">
          <span class="page-link">
            <strong>{{ t('page') }} {{ currentPage }} {{ t('of') }} {{ pageCount }}</strong>
          </span>
        </li>

        <!-- First -->
        <li :class="{ disabled: currentPage === 1 }" class="page-item d-none d-sm-inline-block pagination-btn-first">
          <a
            class="page-link"
            :tabindex="currentPage === 1 ? -1 : 0"
            :aria-disabled="currentPage === 1"
            @click="currentPage !== 1 && setPage(1)"
          >
            « {{ t('first') }}
          </a>
        </li>

        <!-- Prev -->
        <li :class="{ disabled: currentPage === 1 }" class="page-item pagination-btn-prev">
          <a
            class="page-link"
            :tabindex="currentPage === 1 ? -1 : 0"
            :aria-disabled="currentPage === 1"
            @click="currentPage !== 1 && previousPage()"
          >
            ‹ <span class="d-none d-sm-inline-block">{{ t('prev') }}</span>
          </a>
        </li>

        <!-- Page numbers -->
        <li
          v-for="page in visiblePageNumbers"
          :key="page"
          :class="{ active: page === currentPage }"
          class="page-item pagination-btn-page-number"
        >
          <a
            class="page-link"
            :aria-current="page === currentPage ? 'page' : null"
            @click="setPage(page)"
          >
            {{ page }}
          </a>
        </li>

        <!-- Next -->
        <li :class="{ disabled: currentPage === pageCount }" class="page-item pagination-btn-next">
          <a
            class="page-link"
            :tabindex="currentPage === pageCount ? -1 : 0"
            :aria-disabled="currentPage === pageCount"
            @click="currentPage !== pageCount && nextPage()"
          >
            <span class="d-none d-sm-inline-block">{{ t('next') }}</span> ›
          </a>
        </li>

        <!-- Last -->
        <li :class="{ disabled: currentPage === pageCount }" class="page-item d-none d-sm-inline-block pagination-btn-last">
          <a
            class="page-link"
            :tabindex="currentPage === pageCount ? -1 : 0"
            :aria-disabled="currentPage === pageCount"
            @click="currentPage !== pageCount && setPage(pageCount)"
          >
            {{ t('last') }} »
          </a>
        </li>

        <!-- Record count -->
        <li class="page-item d-none d-lg-inline-block disabled pagination-record-count">
          <span class="page-link">
            <strong>{{ startRecord }} - {{ endRecord }} {{ t('of') }} {{ recordCount }}</strong>
          </span>
        </li>

        <!-- Items per page -->
        <li class="page-item d-none d-md-inline-block pagination-items-per-page">
          <label class="page-link mb-0">
            <span class="d-none d-lg-inline-block text-black-50 me-1">{{ t('itemsPerPage') }}</span>
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
          </label>
        </li>
      </ul>
    </nav>

    <!-- For Search crawlers create hidden href -->
    <div style="display:none">
      <a
        v-for="page in pageCount"
        :key="page"
        :href="`/search?currentPage=${encodeURIComponent(page)}`"
      >
        {{ page }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PAGINATION_OPTIONS_DEFAULT } from '~/services/filters/constant'
import messages from '~/app-text/components/common/pagination.json'

const { t } = useI18n({ messages })

const props = defineProps({
  recordCount: { type: Number, required: true },
  recordsPerPage: { type: Number, default: 25 },
  currentPage: { type: Number, required: true },
  pageSizeOptions: {
    type: Array,
    default: () => PAGINATION_OPTIONS_DEFAULT
  }
})
const emit = defineEmits(['changePage', 'pageSizeChanged'])

const recordsPerPageSize = ref(props.recordsPerPage)


// responsive: track window width
const windowWidth = ref(window.innerWidth)
const resizeHandler = () => (windowWidth.value = window.innerWidth)
onMounted(() => window.addEventListener('resize', resizeHandler))
onUnmounted(() => window.removeEventListener('resize', resizeHandler))

// total pages
const pageCount = computed(() =>
  Math.ceil(props.recordCount / recordsPerPageSize.value)
)

// visible page numbers
const visiblePageNumbers = computed(() => {
  const total = pageCount.value;
  const showPages = windowWidth.value <= 768 ? 3 : 6
  
  const current = props.currentPage
  const middle = Math.floor(showPages / 2)
  let start = 1
  let end = total

  if (total > showPages) {
    if (current > middle) start = current - middle
    end = Math.min(total, start + showPages - 1)
    start = Math.max(1, end - showPages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// actions
const setPage = (page) => {
  if (page >= 1 && page <= pageCount.value) {
    emit('changePage', page)
  }
}
const previousPage = () => setPage(props.currentPage - 1)
const nextPage = () => setPage(props.currentPage + 1)

const updatePageSize = () => {
  emit('pageSizeChanged', recordsPerPageSize.value)
  emit('changePage', 1) // reset to first page when size changes
}

// record range
const startRecord = computed(
  () => (props.currentPage - 1) * recordsPerPageSize.value + 1
)
const endRecord = computed(() =>
  Math.min(props.currentPage * recordsPerPageSize.value, props.recordCount)
)
</script>

<style scoped>
.pagination {
  font-size: 14px;
  cursor: pointer;
}
.disabled {
  cursor:default !important;
}
</style>
