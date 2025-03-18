<template>
        <div class="container" style="padding-top:20px;">
            <div class="row">
                <div class="col-3">
                    <doing-abs-links></doing-abs-links>
                </div>
                <div class="col-1"></div>
                <div class="col-8"> 
                    <doing-abs-content class="pb-3"></doing-abs-content>
                    <faqs class="pt-3" v-if="hasTag"></faqs>
                
                </div>
            </div>
        </div>
</template>

<script setup>

import doingAbsLinks from '../../../components/kb/doing-abs-links.vue';
import doingAbsContent from '../../../components/kb/doing-abs-content.vue';
import Faqs from '../../../components/kb/faqs.vue';
import { useRoute } from "@scbd/angular-vue/src/index.js"; 
import { computed } from 'vue'; 

const route = useRoute();
const hasTag = computed(() => route.value?.params?.tag ? true : false);

</script>


