<template>
      <button 
        id="publishedRecords" 
        type="button" 
        class="btn btn-sm btn-success fw-bold"
        @click="toggleRecords"
        :disabled="isLoading"
      >
        <i :class="isChecked ? 'bi bi-check-square-fill' : 'bi bi-square'"></i> 
        {{ t('published') }}
        <span class="badge bg-light text-dark">{{ totalCount }}</span>
      </button>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
  import KmDocumentApi from '~/api/km-document';
  import { useRealm } from '~/services/composables/realm';
  import { useI18n } from 'vue-i18n'
  import { useSchema } from "~/services/composables/schema.js"
  import messages from '~/app-text/views/register/record-list.json'



  // --- Composables ---
  const { t } = useI18n({ messages })
  const auth = useAuth()
  const route = useRoute().value
  const realm = useRealm()
  const { schemaKeyByShortCode } = useSchema()

  const emit = defineEmits(['updateRecords', 'updateTotal'])

  const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })

  const totalCount = ref(0)
  const publishedRecords = ref([])
  const isLoading = ref(false)
  const isChecked = ref(false) // toggle state

  const schemaShortCode = ref(route.params.document_type)
  const pageNumber = ref(1)
  const pageSize = ref(25);

  const loadRecords = async (page = 1) => {
    const schemaName = schemaKeyByShortCode(schemaShortCode.value);
    if (!schemaShortCode.value || !schemaName) return
    publishedRecords.value = []
    isLoading.value = true
    try {
      const skip = (page - 1) * pageSize.value
      const query = {
        $filter: `(type eq '${schemaName}')`,
        $top: pageSize.value,
        $skip: skip,
        $orderby: 'updatedOn desc',
        collection: 'mydraft'
      }

      const res = await kmDocumentApi.queryDocuments(query)
      publishedRecords.value = res?.Items || []
      totalCount.value = res?.Count || 0

      // Only push to parent when toggle is ON
      if (isChecked.value) {
        emit('updateRecords', publishedRecords.value)
        emit('updateTotal', totalCount.value)
      }
    } catch (e) {
      console.error('Failed to load records:', e)
      totalCount.value = 0
      if (isChecked.value) { // todo test
        emit('updateRecords', [])
        emit('updateTotal', 0)
      }
    } finally {
      isLoading.value = false
    }
  }

  const toggleRecords = async () => {
    isChecked.value = !isChecked.value
    if (isChecked.value) {
      await loadRecords(pageNumber.value) // fetch & emit current page
    } else {
      emit('updateRecords', [])
      emit('updateTotal', 0)
    }
  }

  // Allow parent to request another page (called from records-list)
  const changePage = async (newPage) => {
    pageNumber.value = newPage
    if (isChecked.value) {
      await loadRecords(newPage)
    }
  }

  const pageSizeChanged = async (size) => {
    pageSize.value = size;
    pageNumber.value = 1
    if (isChecked.value) {
      await loadRecords(1)
    }
  }

  defineExpose({ changePage, pageSizeChanged })

  // Preload first page to populate the badge count; don't emit until toggled ON
  onMounted(() => {
    loadRecords(1)
  })
</script>
