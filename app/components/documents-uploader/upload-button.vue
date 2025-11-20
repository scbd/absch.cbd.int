<template>
  <div class="d-flex">
    <button
      class="btn btn-primary position-relative p-10"
      type="button"
      :disabled="isLoading"
    >
      {{ $t("browseFiles") }}
      <input
        type="file"
        name="file"
        accept=".xlsx, .xls"
        class="position-absolute fs-1 opacity-0 top-0 start-0 w-100 h-100"
        @change="onChange"
        @click="onFileInputClick"
      >
    </button>
    <div
      v-if="isLoading"
      class="ms-3 align-content-center"
    >
      <Loader
        caption="Processing your files..."
      />
    </div>
  </div>
</template>
<script setup>
import Loader from '../common/loading.vue'
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
const $emit = defineEmits(['onFileChange'])

const onChange = (changeEvent) => {
  $emit('onFileChange', changeEvent)
}

const onFileInputClick = (event) => {
  const { target } = event
  if (target === null) { return }

  target.value = ''
}
</script>
