<template>
  <legend
    v-if="typeof linkHref === 'string'"
  >
    <a
      :href="linkHref"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ title }}
    </a>
  </legend>
  <legend
    v-else
    v-html="sanitizeHtml(title)"
  />
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'

defineProps<{
  title: string
  linkHref?: string
}>()
</script>
