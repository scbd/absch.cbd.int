<template>
    <a :href="newArticleUrl" :target="target">
       <slot>
           <span v-if="!id"><i class="fa fa-plus"></i> Add Content</span>
           <span v-if="id" ><i class="fa fa-edit"></i> Edit Content</span>
           
       </slot>
   </a>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  tags: { type: Array, required: false, default: () => [] },
  customTags: { type: Array, required: false, default: () => [] },
  adminTags: { type: Array, required: false, default: () => [] },
  target: { type: String, required: false, default: '_blank' },
  id: { type: String, required: false, default: undefined }
});

const newArticleUrl = computed(() => {
  const domain = window.location.hostname.replace(/[^\.]+\./, '');
  console.log("domain name", domain);
  let baseUrl = 'https://oasis.cbd.int';
  if (domain == 'localhost' || domain == 'cbddev.xyz') {
    baseUrl = 'https://oasis.cbddev.xyz';
  }
  const queryString = [];
  if(!props.id) {
    if(props.tags?.length)
      queryString.push('tags=' + props.tags.map(encodeURIComponent).join(','));
    if(props.customTags?.length)
      queryString.push('customTags=' + props.customTags.map(encodeURIComponent).join(','));
    if(props.adminTags?.length)
      queryString.push('adminTags=' + props.adminTags.map(encodeURIComponent).join(','));
  }
  queryString.push('returnUrl=' + encodeURI(window.location.href));
  if(!props.id)
    return `${baseUrl}/articles/new?${queryString.join('&')}`;  
  return  `${baseUrl}/articles/${encodeURIComponent(props.id)}/edit?${queryString.join('&')}`;
});
</script>
