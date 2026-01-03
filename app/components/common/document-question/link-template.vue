<!-- LinkTemplate.vue -->
<template>
  <div>
    <i :class="['fa', iconClass]" />
    <a
      rel="noopener"
      :target="item.target"
      :href="item.url"
      class="translation-url"
    >
      <span>{{ displayName }}</span>
    </a>
    <i v-if="hasTag">
      ( <span>{{ item.tag }}</span> )
    </i>
    <i v-if="hasLanguage(item.language)">
      [
      <span v-if="localeName">{{ localeName }}</span>
      <span v-else>{{ nonUNLanguage }}</span>
      ]
    </i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Option } from '~/types/common/document-report'

const props = defineProps<{
  item: Option
  locales: string[]
}>()

const iconClass = computed(() => props.item.icon ?? 'fa-link')

const displayName = computed(() => props.item.name ?? getNameFromUrl(props.item.url ?? ''))

const hasTag = computed(() => typeof props.item.tag === 'string')

const localeName = computed(() => {
  if (!hasLanguage(props.item.language)) { return '' }
  return props.locales.find(locale => locale === props.item.language || locale === `lang-${props.item.language}`)
})

const nonUNLanguage = computed(() => {
  if (!hasLanguage(props.item.language)) { return '' }
  return getNonUNLanguage(props.item.language)
})

function hasLanguage (lang: string | undefined): lang is string {
  return typeof lang === 'string'
}

function getNameFromUrl (url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return url
  }
}

function getNonUNLanguage (languageCode: string): { identifier: string } {
  // legacy bch fix replace * bf 04-04-2023
  // some lang already have 'lang-' bf 04-04-2023
  return {
    identifier: (languageCode.startsWith('lang-') ? '' : 'lang-') + (languageCode.replace('*', ''))
  }
}
</script>
