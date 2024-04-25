<template>
    <div>
        <Suspense>
            <aichi-target v-if="documentInfo?.type == 'aichiTarget'"  
                 :document-info="documentInfo" :locale="locale"></aichi-target>
            <!-- loading state via #fallback slot -->
            <template #fallback>
                Loading...
            </template>
        </Suspense>
        <!-- TODO: put schema view definition element and add v-if for schema name -->
    </div>
</template>

<script setup>

    import { defineAsyncComponent, Suspense } from 'vue';
    import aichiTarget from '~/views/forms/view/chm/aichi-target.vue'

    const props = defineProps({
        linkTarget          : { type : String, default:'_blank'},
        locale              : { type : String, required:true },
        documentInfo        : { type : Object, required:true },
    })

    //TODO : use defineAsyncComponent to load components based on the schema 
    // const aichiTarget = defineAsyncComponent(()=>import('~/views/forms/view/chm/aichi-target.vue'));
</script>

<style lang="scss" scoped>

</style>