<template>
    <div>
        {{ documentInfo }}

        <!-- TODO: put schema view definition element and add v-if for schema name -->
    </div>
</template>

<script setup>
    const props = defineProps({
        linkTarget          : { type : String, default:'_blank'},
        locale              : { type : String, required:true },
        documentInfo        : { type : Object, required:true },
    })

    //TODO : use defineAsyncComponent to load components based on the schema 
</script>

<style lang="scss" scoped>

</style>