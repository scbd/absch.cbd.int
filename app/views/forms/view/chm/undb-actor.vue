<template>
    <div id="Record" class="record panel panel-default" style="margin-top:20px;">
        <div id="Record" class="record panel panel-default">
            <div class="record-body panel-body bg-white" v-if="document">              
                <div class="panel panel-info">
                    <div class="panel-heading">                 
                        <legend>{{ t("organization") }}  </legend> 
                    </div>
                    <div class="panel-body">
                        <div v-if="document.organization">                      
                            <div class="km-value">                               
                                <ng v-vue-ng:view-record-reference  v-model:ng-model="document.organization" :locales="locale" html></ng>   
                            </div>
                        </div>                    

                        <div v-if="document.governments">
                            <label>{{ t("government") }} </label>                         
                            <div class="km-value">                    
                                <div  v-for="government in document.governments" >                    
                                    <km-term :value="government" :locale="locale"></km-term>                
                                </div>
                            </div>                       
                        </div>  

                        <div v-if="document.description">                        
                             <label>{{ t("description") }}</label>                           
                            <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>    
                        </div>                     

                        <div v-if="document.descriptionNative">
                            <label>{{ t("descriptionNativeLanguage") }}</label>
                            <div class="km-value">   
                            {{ document.descriptionNative }}                            
                            </div>   
                        </div>  

                        <div v-if="document.websites">
                            <label>{{ t("websites") }}</label>
                            <div class="km-value">   
                                <ng v-vue-ng:km-link-list v-model:ng-model="document.websites" ></ng>                          
                            </div>   
                                                 
                        </div>  

                        <div v-if="document.videos">
                            <label>{{ t("videos") }}</label>
                            <div class="km-value">   
                                <ng v-vue-ng:km-link-list v-model:ng-model="document.videos" ></ng>                           
                            </div>         
                        </div>  

                        <div v-if="document.documents">
                            <label> {{ t("documents") }}</label>
                            <div class="km-value">   
                                <ng v-vue-ng:km-link-list v-model:ng-model="document.documents" ></ng>                              
                            </div>  
                        </div>                         
                        
                    </div>
                </div>
            </div>   
        </div>

    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/undb-actor.json';
    import { useI18n } from 'vue-i18n';  

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);   
    
</script>