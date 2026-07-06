<template>
  <div class="d-flex align-items-center justify-content-end border-bottom flex-shrink-0 px-3 py-2">
    <input
      :value="search" type="search"
      class="form-control form-control-sm" style="width: 210px;"
      :placeholder="t('bulkImport.search', 'Search documents...')"
      @input="emit('update:search', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  search: string
}>()

const emit = defineEmits<(e: 'update:search', value: string)=> void>()

const { t } = useI18n()
</script>
