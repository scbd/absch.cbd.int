<!-- LinkList.vue -->
<template>
  <div class="mt-1">
    <ul
      v-if="Array.isArray(question.values)"
      class="list"
    >
      <!-- Array items -->
      <li
        v-for="item in question.values"
        :key="item.url"
        class="pb-1"
      >
        <LinkTemplate
          :item="item"
          :locales="locales"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import LinkTemplate from './link-template.vue'
import type { Question } from '~/types/common/document-report'

defineProps<{
  question: Question
  locales: string[]
}>()
</script>
