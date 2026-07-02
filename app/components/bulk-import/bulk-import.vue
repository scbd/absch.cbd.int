<template>
  <div>
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      @click="open"
    >
      <i class="fa fa-file-excel-o me-1" />
      {{ title }}
    </button>

    <component
      :is="modal"
      v-if="isOpen"
      :document-type="documentType"
      @on-close="onClose"
      @on-imported="onImported"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, defineComponent, type Ref, type Component } from 'vue'
import type { DocumentTypes } from './framework/types'

defineProps<{
  documentType: DocumentTypes,
  title: string
}>()
const emit = defineEmits<{ onImported: [], onClose: [] }>()

const modal: Ref<Component> = shallowRef(defineComponent(() => () => null))
const isOpen = ref(false)

async function open () {
  await import('./bulk-import-modal.vue')
    .then(({ default: mod }) => { modal.value = mod })
    .catch((err: unknown) => { console.error('[bulk-import] load error:', err) }) // eslint-disable-line no-console -- load errors should be visible in dev tools
  isOpen.value = true
}

function onClose () {
  console.log('[bulk-import] onClose') // eslint-disable-line no-console -- load errors should be visible in dev tools
  isOpen.value = false
  emit('onClose')
}

function onImported () {
  emit('onImported')
}
</script>
