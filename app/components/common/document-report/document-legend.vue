<template>
  <legend
    v-html="sanitizeHtml(question.data.title)"
  />
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
import type { Question } from '~/types/common/document-report'

defineProps<{
  question: Question
}>()
</script>
