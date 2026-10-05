<template>
  <div
    v-if="response?.value"
    class="d-flex gap-4 py-2"
    :class="{ 'border-bottom': !noBorder }"
  >
    <i
      class="bi fs-3 lh-1 flex-shrink-0"
      :class="[variantIcon, { invisible: nested }]"
    />
    <div class="flex-grow-1">
      <div>
        {{ caption }}
        <span
          class="badge lfo-badge ms-1"
          :class="variantBadge"
        >{{ label }}</span>
      </div>
      <div
        v-if="response.additionalInformation"
        class="mt-2"
      >
        <ng
          v-vue-ng:km-value-ml
          :value="response.additionalInformation"
          :locales="locale"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { NrResponse } from '~/types/components/legal-framework-overview'

// Types
interface Option {
  value: string
  title: string
}

interface Props {
  caption: string
  response?: NrResponse
  options: Option[]
  locale: string
  nested?: boolean
  noBorder?: boolean
}

// Props
const props = defineProps<Props>()

// Computed
const label = computed(() => props.options.find(option => option.value === props.response?.value)?.title ?? props.response?.value)

const variantIcon = computed(() => {
  if (props.response?.value === 'false') {
    return 'bi-x-circle-fill text-dark'
  } else if (props.response?.value === 'na') {
    return 'bi-dash-circle-fill text-warning'
  } else {
    return 'bi-check-circle-fill text-success'
  }
})

const variantBadge = computed(() => {
  if (props.response?.value === 'false') {
    return 'bg-dark'
  } else if (props.response?.value === 'na') {
    return 'bg-warning text-dark'
  } else {
    return 'bg-success'
  }
})
</script>
<style scoped>
.lfo-badge {
  font-size: 0.85rem;
  padding: 0.35em 0.6em;
}
</style>
