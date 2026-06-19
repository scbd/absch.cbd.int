<template>
  <div>
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      @click="open"
    >
      <i class="fa fa-file-excel-o me-1" />
      Import IRCC
    </button>

    <component
      :is="modal"
      v-if="isOpen"
      :document-type="documentType"
      @close="isOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, defineComponent, type Ref, type Component } from 'vue'
import type { DocumentTypes } from './framework/types'

defineProps<{ documentType: DocumentTypes }>()

const modal: Ref<Component> = shallowRef(defineComponent(() => () => null))
const isOpen = ref(false)

async function open () {
  await import('./uploader-modal.vue')
    .then(({ default: mod }) => { modal.value = mod })
    .catch((err: unknown) => { console.error('[bulk-import] load error:', err) }) // eslint-disable-line no-console -- load errors should be visible in dev tools
  isOpen.value = true
}
</script>
