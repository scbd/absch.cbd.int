<template>
  <div class="w-100">
    <button
      class="btn btn-primary float-start"
      type="button"
      :disabled="props.isLoading"
      @click="$emit('handleConfirm')"
    >
      {{ $t("confirm") }}
    </button>
    <button
      class="btn btn-secondary float-end"
      type="button"
      :disabled="props.isLoading"
      @click="$emit('handleClear')"
    >
      {{ $t("clear") }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const $emit = defineEmits(['handleConfirm', 'handleClear'])
</script>
