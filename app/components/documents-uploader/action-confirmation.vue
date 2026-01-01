<template>
  <Overlay
    :opacity="1"
    @click="() => $emit('cancel')"
  >
    <div class="overlay-box d-flex p-5 w-50 bg-white">
      <div class="d-flex flex-column">
        <h1 class="mb-3">
          {{ title }}
        </h1>

        <div
          class="mx-3 mt-2 mb-3 lead"
        >
          {{ $t('closeConfirmationInfo') }}
        </div>
        <div class="mt-4 w-100 d-flex gap-2 justify-content-center">
          <button
            class="btn btn-secondary"
            type="button"
            @click="() => $emit('cancel')"
          >
            {{ $t('cancel') }}
          </button>
          <button
            class="btn btn-primary"
            type="button"
            @click="() => $emit('confirm')"
          >
            {{ $t('confirmAction') }}
          </button>
        </div>
      </div>
    </div>
  </Overlay>
</template>
<script setup lang="ts">
import Overlay from '../common/overlay.vue'
defineProps({
  title: {
    type: String,
    default: ''
  }
})

const $emit = defineEmits(['confirm', 'cancel'])
</script>
