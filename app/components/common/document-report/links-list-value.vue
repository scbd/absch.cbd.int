<!-- LinkList.vue -->
<template>
  <div>
    <label> {{ $t('websiteName') }} </label>
    <ul
      class="list"
    >
      <li
        v-for="item in links"
        :key="item.name"
        class="pb-1"
      >
        <LinkTemplate
          v-if="item.url !== ''"
          :item="item"
          :locales="locales"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LinkTemplate from './link-template.vue'
import type { Question } from '~/types/common/document-report'

const props = defineProps<{
  question: Question
  locales: string[]
}>()

const links = computed(() => props.question.values[0]?.links ?? [])
</script>
