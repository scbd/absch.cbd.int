<template>
  <div>
    <div
      data-backdrop="static"
      tabindex="-1"
      class="inverted dimmer modal fade show"
      aria-modal="true"
      role="dialog"
      style="display: block"
    >
      <div class="content">
        <span><i class="fa fa-cog fa-spin"></i>{{ caption || "" }}</span>
      </div>
    </div>
  </div>
</template>
    
<script setup>
  const { caption } = defineProps({
      caption: {
      type: String,
      default : null
      }
  });
</script>
<style scoped>
  .show .content {
      margin: 20% 30%;
      position: fixed;
  }
  .show .content span {
      color: #fff;
  }
</style>