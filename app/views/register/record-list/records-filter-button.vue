<template>
  <div>
    <button 
      id="publishedRecords" 
      type="button" 
      class="btn btn-sm fw-bold"
      @click="emitRecords"
      :disabled="isLoading"
      v-bind="$attrs"
    >
      <i class="bi bi-check-square"></i> {{ title }}
      <span class="badge bg-light text-dark">{{ recordsCount }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
import KmDocumentApi from '~/api/km-document'

// --- Component options ---
defineOptions({ inheritAttrs: false })
const emit = defineEmits(['updateRecords'])
const props = defineProps({
  collection: { type: String, required: true },
  title     : { type: String, required: true }
})

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
  console.log('Loading records for collection:', props.collection)
  filteredRecords.value = []
  if (!auth.token() || !schemaShortCode.value) return
  isLoading.value = true

  try {
    const query = {
      $filter: `(type eq 'authority')`, // test filter
      collection: props.collection
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
