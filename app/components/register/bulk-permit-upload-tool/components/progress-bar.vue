<template>
  <div class="progress row" v-if="progressTracking > 0">
    <div
      class="progress-bar"
      role="progressbar"
      :style="{ width: progressPercentage + '%' }"
      :aria-valuenow="progressPercentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ Math.round(progressPercentage) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const progressPercentage = computed(() => {
  const total = parsedFile.value?.length + importDataIRCC?.contacts?.length
  return total > 0 ? (progressTracking.value / total) * 100 : 0
})

const progressTracking = ref(null)

watch(progressTracking, (newValue) => {
  if (newValue < 100) {
    updatedParsedFileWithSuccess()
  }
})
</script>
