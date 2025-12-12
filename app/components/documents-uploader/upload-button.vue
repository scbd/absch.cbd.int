<template>
  <div class="d-flex">
    <button
      class="btn btn-primary position-relative p-10"
      type="button"
      :disabled="isLoading"
    >
      {{ $t('browseFiles') }}
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
        :caption="$t('uploadingLoader')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Loader from '../common/loading.vue'
defineProps<{
  isLoading: boolean
}>()
const $emit = defineEmits(['onFileChange'])

function onChange (changeEvent: Event) {
  $emit('onFileChange', changeEvent)
}

function onFileInputClick (event: Event) {
  const target = event.target as HTMLInputElement
  if (target === null) { return }

  target.value = ''
}
</script>
