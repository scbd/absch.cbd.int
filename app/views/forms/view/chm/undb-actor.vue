<template>
    <div id="Record" class="record " >     
        <div class="record-body bg-white" v-if="document"> 
            <!--TODO: add compare-val for fields  -->

            <document-date :document-info="documentInfo"></document-date>
        
            <legend>{{ t("organization") }}  </legend> 
            <section v-if="document.organization">
                <!--TODO:same content as chm project (add image, etc) -->                                
                <div class="km-value">                               
                    <ng v-vue-ng:view-record-reference  v-model:ng-model="document.organization" :locales="locale" html km-pre></ng>   
                </div>               
            </section>                   

            <section v-if="document.description || document.descriptionNative">
                <div v-if="document.description">                        
                    <label>{{ t("description") }}</label>                           
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html km-pre></ng>    
                </div>                     

                <div v-if="document.descriptionNative">
                    <label>{{ t("descriptionNative") }}</label>
                    <div class="km-value km-pre">   
                        {{ document.descriptionNative }}                            
                    </div>   
                </div>  
            </section>

            <section v-if="document.websites || document.videos || document.documents || document.images">
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
                
                <div v-if="document.images">
                    <label> {{ t("images") }}</label>
                    <div class="km-value">   
                        <ng v-vue-ng:km-link-list v-model:ng-model="document.images" ></ng>                              
                    </div>  
                </div>  
            </section> 

            <div>                 
                <ng v-vue-ng:view-record-reference  v-model:ng-model="document.header.identifier" ></ng>  
            </div>         
        </div>  

        <!-- TODO: add footer  -->
        <!-- <ng v-vue-ng:document-metadata  :document="document"></ng>  -->
    </div>
</template>

<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'   
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/undb-actor.json';
    import documentDate from '~/views/forms/view/directives/document-date.vue'; 
    import { useI18n } from 'vue-i18n';  

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type:Object, required:true },
        locale      : { type:String, required:true }
    })
    const document = computed(()=>props.documentInfo?.body);   
    
</script>