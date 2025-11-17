<template>
  <div
    class="loader-overlay"
    :style="{ backgroundColor: backgroundColor }"
  >
    <circle-loader
      :color="color"
      :size="size"
    />
  </div>
</template>

<script setup>
import CircleLoader from './circle-loader.vue'
defineProps({
  backgroundColor: {
    default: 'rgba(255, 255, 255, 0.72)',
    type: String
  },

  color: {
    default: '#C0C0C0',
    type: String
  },

  size: {
    default: 76,
    type: Number
  }
})
</script>

<style scoped>
  .loader-overlay {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
</style>
