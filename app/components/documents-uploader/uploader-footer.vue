<template>
  <div class="w-100 d-flex mx-3">
    <div
      class="flex-fill"
    >
      <button
        class="btn btn-secondary"
        type="button"
        @click="$emit('closeModal')"
      >
        {{ $t("close") }}
      </button>
    </div>
    <div class="d-flex gap-2">
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
  </div>
</template>
<script setup lang="ts">
defineProps<{
  hasErrors: boolean
}>()

const $emit = defineEmits(['handleConfirm', 'handleClear', 'closeModal'])
</script>
