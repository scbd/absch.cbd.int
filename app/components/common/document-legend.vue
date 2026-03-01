<template>
  <legend
    v-html="sanitizeHtml(title)"
  />
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'

defineProps<{
  title: string
}>()
</script>
