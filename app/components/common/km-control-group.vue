<template>
  <div
    class="km-control-group"
    :class="{
      'has-warning': hasWarning,
      'has-error': hasError,
      'km-control-margins': hasMargins
    }"
  >
    <label
      v-if="caption"
      :name="name"
      :for="name"
      class="control-label"
      :class="{
        bold: bold === true || bold === 'true',
        [captionClass]: captionClass,
      }"
    >
      <span v-html="sanitizeHtml(caption)" />
    </label>

    <ng
      v-if="infoTip?.content"
      v-vue-ng:km-info-tip
      class="ps-2"
      :data-content="infoTip.content"
      :data-title="infoTip.title || 'Help'"
    />

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'

interface InfoTip {
  content: string
  title?: string
}

interface Props {
  name: string
  caption?: string
  captionClass?: string
  bold?: boolean | string
  hasWarning?: boolean
  hasError?: boolean
  infoTip?: InfoTip
  required?: boolean
  hasMargins?: boolean
}

withDefaults(defineProps<Props>(), {
  caption: '',
  captionClass: '',
  bold: false,
  hasWarning: false,
  hasError: false,
  hasMargins: true,
  infoTip: () => ({ content: '', title: 'Help' }),
  required: false
})
</script>
<style scoped>
  .km-control-group {
    padding: 0;
  }

  .km-control-margins {
    margin: 0 0 20px 0;
  }
</style>
