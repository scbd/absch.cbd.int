<!-- LinkTemplate.vue -->
<template>
  <div class="mt-1">
    <i
      :class="['fa', iconClass]"
      class="pe-1"
    />
    <a
      rel="noopener noreferrer"
      :target="item.target ?? '_blank'"
      :href="item.url"
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
import { englishLanguages, languages, isLanguageCode } from '~/app-data/un-languages'
// @ts-expect-error importing js file
import { lookup, mimeIcon } from '~/components/scbd-angularjs-services/services/mime.type.service.js'
import type { LanguageCode } from '~/types/languages'
import type { Link } from '~/types/common/document-report'

const props = defineProps<{
  locales: string[]
  item: Link
}>()

const iconClass = computed(() => {
  const fileName = props.item.url ?? props.item.name
  const mime = lookup(fileName)
  if (typeof mime === 'string') {
    return mimeIcon(mime)
  }
  return 'fa-link'
})

const displayName = computed(() => props.item.name ?? getNameFromUrl(props.item.url ?? ''))

const hasTag = computed(() => typeof props.item.tag === 'string')

const localeName = computed(() => {
  if (!hasLanguage(props.item.language)) { return '' }
  const languageCode: LanguageCode = isLanguageCode(props.item.language) ? props.item.language : 'en'
  if (props.locales[0] === 'en') {
    return englishLanguages[languageCode]
  }
  return languages[languageCode]
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
