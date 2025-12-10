<!--
Loading Overlay

Fade out screen and show loader in the foreground .
-->
<template>
  <Overlay>
    <div class="text-white lead fw-bold">
      <i class="fa fa-cog fa-spin me-2" />{{ caption }}
    </div>
  </Overlay>
</template>
<script setup lang="ts">
import Overlay from './overlay.vue';

defineProps<{
  caption: string 
}>()
</script>
<style scoped>
.loader-max-height {
  max-height: 100vh;
}
</style>
