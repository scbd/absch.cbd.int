<template>
      <button 
        id="publishedRecords" 
        type="button" 
        class="btn btn-sm btn-success fw-bold"
        @click="emitRecords"
        :disabled="isLoading"
      >
        <i class="bi bi-check-square"></i> {{ t('published') }}
        <span class="badge bg-light text-dark">{{ recordsCount }}</span>
      </button>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
  import KmDocumentApi from '~/api/km-document'
  import { useI18n } from 'vue-i18n'
  import messages from '../../../app-text/views/register/record-list.json'

  const { t } = useI18n({ messages })
  const emit = defineEmits(['updateRecords'])

  // --- Composables ---
  const auth = useAuth()
  const route = useRoute().value
  const schemaShortCode = ref(route.params.document_type)
  const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })

  // --- State ---
  const recordsCount = ref(0)
  const filteredRecords = ref([])
  const isLoading = ref(false)

  // --- Methods ---
  const emitRecords = () => {
    emit('updateRecords', filteredRecords.value)
  }

  const loadRecords = async () => {
    filteredRecords.value = [];
    // const schemaName = computed(() =>schemaShortCode.value &&  mapSchema(schemaShortCode.value)); //  Todo: apply filter to get schema name from shortcode
    if (!schemaShortCode.value) return
    isLoading.value = true

    try {
      const query = {
        $filter: `(type eq 'authority')`, // pass schemaName.value
        collection: 'my'
      }

      const res = await kmDocumentApi.queryDocuments(query)
      filteredRecords.value = res?.Items || []
      recordsCount.value = res?.Count || 0
    } catch (err) {
      console.error('Failed to load records:', err)
      filteredRecords.value = []
      recordsCount.value = 0
      
    } finally {
      isLoading.value = false
    }
  }

  // --- Lifecycle ---
  onMounted(() => {
    loadRecords()
  })
</script>
