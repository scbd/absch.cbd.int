<template>
    <div>

    </div>
</template>

<script setup>
    import {  useRoute, useRouter, useAuth } from "@scbd/angular-vue/src/index.js";
    import { useRealm } from '../../services/composables/realm.js';
    import WorkflowsApi from '../../api/workflows';

    const auth = useAuth();
    const router = useRouter();
    const route = useRoute().value;
    const realm = useRealm();

    const workflowsApi = new WorkflowsApi({tokenReader:()=>auth.token()});

    try{
        const workflow = await workflowsApi.getWorkflow(route.params.workflowId)
        
        const shortCode = realm.schemas[workflow?.data?.metadata?.schema]?.shortCode;
        router.push({ path: `/register/${shortCode}/${workflow?.data?.identifier}/view` });
    }
    catch(error){
        console.error(error)
        router.push({ path: `register/requests` });
    }

</script>

<style lang="scss" scoped>

</style>