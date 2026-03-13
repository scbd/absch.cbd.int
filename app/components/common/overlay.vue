<!--
Overlay

Fade-out the screen behind a message in the foreground such as a loader.

Used in ./loading-overlay.vue and ./components/documents-uploader/warning-overlay.vue
-->
<template>
  <div
    data-backdrop="static"
    tabindex="-1"
    class="inverted dimmer modal fade show"
    :style="{ opacity }"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div
      class="full-height position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center justify-content-center"
    >
      <slot name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from 'vue'
withDefaults(
  defineProps<{ opacity?: number }>(),
  { opacity: 0.3 }
)
</script>
<style scoped>
.full-height {
  max-height: 100vh;
}
</style>
