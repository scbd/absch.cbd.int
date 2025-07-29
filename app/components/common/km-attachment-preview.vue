<template>
  <img v-if="isValid" :src="computedUrl" :alt="altText" :width="width" :height="height" />
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    url: { type: String, required: true },
    width: { type: [Number, String], default: 68 },
    height: { type: [Number, String], default: 96 },
    altText: { type: String, default: '' }
  });

  const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'tiff'];

  const isValid = computed(() => {
    if (!props.url || typeof props.url !== 'string') return false;
    try {
      const parsedUrl = new URL(props.url, window.location.origin);
      const pathname = parsedUrl.pathname.toLowerCase(); 
      return validImageExtensions.some(ext => pathname.endsWith(ext));
    } catch (e) {
      return false;
    }
  });

  const computedUrl = computed(() => {
    if (!isValid.value) return '';

    try {
      const parsedUrl = new URL(props.url, window.location.origin);
      const params = new URLSearchParams(parsedUrl.search);
      params.set('width', props.width);
      params.set('height', props.height);
      parsedUrl.search = params.toString();
      return encodeURI(parsedUrl.toString());
    } catch (error) {
      console.error('Invalid thumbnail URL:', props.url, error); 
      return props.url;
    }
  });
</script>
