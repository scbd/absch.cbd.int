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
        <span class="badge bg-light text-dark">{{ recordsCount }}</span>
      </button>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
  import KmDocumentApi from '~/api/km-document';
  import { useRealm } from '~/services/composables/realm';
  import { useI18n } from 'vue-i18n'
  import { mapSchema } from '~/components/kb/filters';
  import messages from '~/app-text/views/register/record-list.json'



  // --- Composables ---
  const { t } = useI18n({ messages })
  const auth = useAuth()
  const route = useRoute().value
  const emit = defineEmits(['updateRecords'])
  const realm = useRealm();

  const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })

  // --- State ---
  const recordsCount = ref(0)
  const publishedRecords = ref([])
  const isLoading = ref(false)
  const isChecked = ref(false) // toggle state
  const schemaShortCode = ref(route.params.document_type)

  // --- Methods ---
  const toggleRecords = () => {
      isChecked.value = !isChecked.value
      
      if (isChecked.value) {
          emit('updateRecords', publishedRecords.value)
      } else {
        emit('updateRecords', [])
      }
  }

  const loadRecords = async () => {
    publishedRecords.value = []
    const schemaName = mapSchema(realm, schemaShortCode.value)
    if (!schemaShortCode.value && !schemaName) return
    isLoading.value = true

    try {
      const query = {
        $filter: `(type eq '${schemaName}')`,
        $top: 25,
        $orderby: 'updatedOn desc',
        collection: 'my'
      }

      const res = await kmDocumentApi.queryDocuments(query)
      publishedRecords.value = res?.Items || []
      recordsCount.value = res?.Count || 0
    } catch (err) {
      console.error('Failed to load records:', err)
      publishedRecords.value = []
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
