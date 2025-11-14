<template>
  <button
    class="btn btn-primary position-relative p-10"
    type="button"
    :disabled="props.isLoading"
  >
    {{ $t("browse") }}
    <input
      type="file"
      name="file"
      accept=".xlsx, .xls"
      class="position-absolute fs-1 opacity-0 top-0 start-0 w-100 h-100"
      @change="onChange"
      @click="onFileInputClick"
    >
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})
const $emit = defineEmits(['onFileChange'])

const onChange = (changeEvent: Event) => {
  $emit('onFileChange', changeEvent as Event)
}


const onFileInputClick = (event: Event) => {
  const { target } = event
  if (target === null) { return }

  (target as HTMLInputElement).value = ''
}
</script>
