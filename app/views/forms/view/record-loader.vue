<template>
    <div>
        <!-- <Suspense>            -->
            <aichi-target v-if="documentInfo?.type == 'aichiTarget'"  
                 :document-info="documentInfo" :locale="locale"></aichi-target>
            <national-assessment v-if="documentInfo?.type == 'nationalAssessment'"  
                    :document-info="documentInfo" :locale="locale"></national-assessment>        
            <national-report v-if="documentInfo?.type == 'nationalReport'"  
                    :document-info="documentInfo" :locale="locale"></national-report>
            <national-target v-if="documentInfo?.type == 'nationalTarget'"  
                    :document-info="documentInfo" :locale="locale"></national-target>
            <implementation-activity v-if="documentInfo?.type == 'implementationActivity'"  
                    :document-info="documentInfo" :locale="locale"></implementation-activity>          
            <strategic-plan-indicator v-if="documentInfo?.type == 'strategicPlanIndicator'"  
                 :document-info="documentInfo" :locale="locale"></strategic-plan-indicator>                
            <undb-actor v-if="documentInfo?.type == 'undbActor'"  
                    :document-info="documentInfo" :locale="locale"></undb-actor>       
            <undb-action v-if="documentInfo?.type == 'undbAction'"  
                    :document-info="documentInfo" :locale="locale"></undb-action>   
            <!-- loading state via #fallback slot -->
            <!-- <template #fallback>

                Loading...
            </template> -->
        <!-- </Suspense> -->
        <!-- TODO: put schema view definition element and add v-if for schema name -->
    </div>
</template>

<script setup>

    import aichiTarget from '~/views/forms/view/chm/aichi-target.vue'
    import nationalAssessment from '~/views/forms/view/chm/national-assessment.vue'
    import nationalReport from '~/views/forms/view/chm/national-report.vue'
    import nationalTarget from '~/views/forms/view/chm/national-target.vue'  
    import implementationActivity from '~/views/forms/view/chm/implementation-activity.vue'
    import strategicPlanIndicator from '~/views/forms/view/chm/strategic-plan-indicator.vue'
    import undbActor from '~/views/forms/view/chm/undb-actor.vue'
    import undbAction from '~/views/forms/view/chm/undb-action.vue'

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