<template>
  <div v-if="response?.value">
    <label>{{ caption }}</label>
    <div class="km-value">
      {{ label }}
    </div>
    <div
      v-if="response.additionalInformation"
      class="km-value"
    >
      <label class="small text-muted">{{ t('explanation') }}</label>
      <ng
        v-vue-ng:km-value-ml
        :value="response.additionalInformation"
        :locales="locale"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/view/abs/legal-framework-overview.json'
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
}

// Props
const props = defineProps<Props>()

// Composables
const { t } = useI18n({ messages })

// Computed
const label = computed(() => props.options.find(option => option.value === props.response?.value)?.title ?? props.response?.value)
</script>
