<template>
    <div>
        <!-- <Suspense>            -->
            <aichi-target v-if="documentInfo?.type == 'aichiTarget'"  
                 :document-info="documentInfo" :locale="locale"></aichi-target>
            <national-assessment v-if="documentInfo?.type == 'nationalAssessment'"  
                    :document-info="documentInfo" :locale="locale"></national-assessment>        
            <national-report v-if="documentInfo?.type == 'nationalReport'"  
                    :document-info="documentInfo" :locale="locale"></national-report>   
            <national-report v-if="documentInfo?.type == 'nbsap'"  
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
            <undb-party v-if="documentInfo?.type == 'undbParty'"  
                    :document-info="documentInfo" :locale="locale"></undb-party>       
            <undb-partner v-if="documentInfo?.type == 'undbPartner'"  
                    :document-info="documentInfo" :locale="locale"></undb-partner>      
            <event v-if="documentInfo?.type == 'event'"  
                    :document-info="documentInfo" :locale="locale"></event>       
            <marine-ebsa v-if="documentInfo?.type == 'marineEbsa'"  
                 :document-info="documentInfo" :locale="locale"></marine-ebsa>
            <financial-report-2015 v-if="documentInfo?.type == 'resourceMobilisation'"  
                    :document-info="documentInfo" :locale="locale"></financial-report-2015 >           
            <resource-mobilisation-2020 v-if="documentInfo?.type == 'resourceMobilisation2020'"  
                    :document-info="documentInfo" :locale="locale"></resource-mobilisation-2020 >
            <national-report-6 v-if="documentInfo?.type == 'nationalReport6'"  
                    :document-info="documentInfo" :locale="locale"></national-report-6>  
            
                <!-- ABS -->
                <view-abs-legal-framework-overview v-if="documentInfo?.type == 'absLegalFramework'"  
                        :document-info="documentInfo" :locale="locale"></view-abs-legal-framework-overview>                
                        <!-- ABS -->
                <!-- loading state via #fallback slot -->
                <!-- <template #fallback>
                        Loading...
                </template>
        </Suspense> -->
        <!-- TODO: put schema view definition element and add v-if for schema name -->
    </div>
</template>

<script setup>

    import { defineAsyncComponent } from 'vue'

    const props = defineProps({
        linkTarget          : { type : String, default:'_blank'},
        locale              : { type : String, required:true },
        documentInfo        : { type : Object, required:true },
    })

    const aichiTarget = defineAsyncComponent(() => import('~/views/forms/view/chm/aichi-target.vue').then(m => m.default))
    const nationalAssessment = defineAsyncComponent(() => import('~/views/forms/view/chm/national-assessment.vue').then(m => m.default))
    const nationalReport = defineAsyncComponent(() => import('~/views/forms/view/chm/national-report.vue').then(m => m.default))
    const nationalTarget = defineAsyncComponent(() => import('~/views/forms/view/chm/national-target.vue').then(m => m.default))
    const implementationActivity = defineAsyncComponent(() => import('~/views/forms/view/chm/implementation-activity.vue').then(m => m.default))
    const strategicPlanIndicator = defineAsyncComponent(() => import('~/views/forms/view/chm/strategic-plan-indicator.vue').then(m => m.default))
    const undbActor = defineAsyncComponent(() => import('~/views/forms/view/chm/undb-actor.vue').then(m => m.default))
    const undbAction = defineAsyncComponent(() => import('~/views/forms/view/chm/undb-action.vue').then(m => m.default))
    const undbParty = defineAsyncComponent(() => import('~/views/forms/view/chm/undb-party.vue').then(m => m.default))
    const undbPartner = defineAsyncComponent(() => import('~/views/forms/view/chm/undb-partner.vue').then(m => m.default))
    const event = defineAsyncComponent(() => import('~/views/forms/view/chm/event.vue').then(m => m.default))
    const marineEbsa = defineAsyncComponent(() => import('~/views/forms/view/chm/marine-ebsa.vue').then(m => m.default))
    const financialReport2015 = defineAsyncComponent(() => import('~/views/forms/view/chm/financial-report-2015.vue').then(m => m.default))
    const resourceMobilisation2020 = defineAsyncComponent(() => import('~/views/forms/view/chm/resource-mobilisation-2020.vue').then(m => m.default))
    const nationalReport6 = defineAsyncComponent(() => import('~/views/forms/view/chm/national-report-6.vue').then(m => m.default))
    const viewAbsLegalFrameworkOverview = defineAsyncComponent(() => import('~/views/forms/view/abs/abs-legal-framework-overview.vue').then(m => m.default))
</script>

<style lang="scss" scoped>

</style>