<template>
  <div v-if="error" class="ep-alert-danger">
    <i class="fa fa-exclamation-triangle" />
    <span v-if="!details.length">{{ t('errorSaving') }}: {{ message }}</span>
    <template v-else>
      {{ t('errorSaving') }}:
      <ul class="mb-0 ps-3">
        <li v-for="(msg, i) in details" :key="i">
          {{ msg }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/portals/edit-portal.json'

defineProps<{ error: unknown; message: string; details: string[] }>()

const { t } = useI18n({ messages })
</script>
