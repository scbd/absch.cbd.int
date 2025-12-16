<template>
  <div class="w-100 d-flex gap-2 justify-content-end">
    <button
      class="btn btn-secondary"
      type="button"
      @click="$emit('handleClear')"
    >
      {{ $t("clearImportedRecords") }}
    </button>
    <button
      class="btn btn-primary"
      type="button"
      @click="$emit('handleConfirm')"
    >
      {{ $t("confirmCreateDraftRecords") }}
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  hasErrors: boolean
}>()

const $emit = defineEmits(['handleConfirm', 'handleClear'])
</script>
