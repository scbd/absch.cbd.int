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
      :disabled="hasErrors"
      @click="$emit('handleConfirm')"
    >
      {{ $t("confirmCreateDraftRecords") }}
    </button>
  </div>
</template>
<script setup>
defineProps({
  hasErrors: {
    type: Boolean,
    default: false
  }
})

const $emit = defineEmits(['handleConfirm', 'handleClear'])
</script>
