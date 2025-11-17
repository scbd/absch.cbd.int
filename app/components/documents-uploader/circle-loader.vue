<template>
  <svg
    class="circle-loader"
    :width="size"
    :height="size"
    viewBox="0 0 74 74"
  >
    <circle
      class="loader-circle"
      cx="37"
      cy="37"
      r="32"
      fill="none"
      :stroke="color"
      stroke-width="8"
      transform="rotate(270 37 37)"
    />
  </svg>
</template>
<script setup>
// TODO: Check project for existing Vue loader and use that.
defineProps({
  color: {
    default: '#C0C0C0',
    type: String
  },

  size: {
    default: 70,
    type: Number
  }
})
</script>

<style scoped>
  .loader-circle {
    stroke-dasharray: 201px;
    stroke-dashoffset: 402px;
    animation: base_modal_load_mask 2.62s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;
    pointer-events: none;
  }

  @keyframes base_modal_load_mask {
    0% {
      stroke-dashoffset: 402px;
    }
    50% {
      stroke-dashoffset: 201px;
    }
    100% {
      stroke-dashoffset: 0px;
    }
  }
</style>
