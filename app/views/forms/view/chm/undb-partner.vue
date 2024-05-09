<template>     
    <div id="Record" class="record">
        <div class="record-body bg-white" v-if="document"> 
            <section>
                <div v-if="document.name">   
                    <label>{{ t("name") }} </label>             
                    <ng v-vue-ng:km-value-ml  :value="document.name" :locales="locale" html></ng> 
                </div>

                <div v-if="document.Website">               
                    <label>{{ t("website") }} </label>                
                    <div class="km-value"> {{document.Website}}</div>  
                </div>

                <div v-if="document.country">
                    <label>{{ t("country") }} </label>       
                    <div class="km-value">       
                        <km-term :value="country" :locale="locale"></km-term>           
                    </div>            
                </div> 
                <div v-if="document.address">
                    <label for="subTopic">{{ t("address") }}</label>   
                    <ng v-vue-ng:km-value-ml  :value="document.address" :locales="locale" html></ng>  
                </div>
    
                <div v-if="document.googleMaps">
                    <label for="subTopic">{{ t("googleMapsLink") }}</label>    
                    <ng v-vue-ng:km-value-ml  :value="document.googleMaps" :locales="locale" html></ng>  
                </div>
            </section>

            <section>
                <div v-if="document.email">
                    <label for="subTopic">{{ t("email") }}</label>    
                    <div class="km-value">{{document.email}} </div>
                </div>
                <div v-if="document.phone">
                    <label for="subTopic">{{ t("telephone") }}</label>
                    <div class="km-value">{{document.phone}} </div>
                </div>
                <div v-if="document.facebook">
                    <label for="subTopic">{{ t("facebook") }}</label>
                <div class="km-value">{{document.facebook}}</div>
                </div>
                <div v-if="document.twitter">
                    <label for="subTopic">{{ t("twitter") }}</label>
                    <div class="km-value">{{document.twitter}}</div>
                </div>
                <div v-if="document.youtube">
                    <label for="subTopic">{{ t("youtube") }}</label>  
                    <div class="km-value">{{document.youtube}}</div>
                </div>
            </section> 

            <section>
                <div v-if="document.description">
                    <label for="subTopic">{{ t("shortDescription") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                </div>

                <div v-if="document.descriptionNative">
                    <label for="subTopic">{{ t("shortDescriptionInOfficialLanguage") }}</label> 
                    <div class="km-value">
                        {{document.descriptionNative}}
                    </div>    
               </div>

               <div v-if="document.notes">
                    <label for="subTopic">{{ t("commentsOrAdditionalInfo") }}</label>  
                    <ng v-vue-ng:km-value-ml  :value="document.notes" :locales="locale" html></ng>  
                </div>

                <div v-if="document.logo">
                    <label for="subTopic">{{ t("logo") }}</label>
                    <div class="km-value">
                        <img :src="`${document.logo}/thumbnail`"/>
                    </div>
                </div>
            </section>
        </div>
    </div>

</template>

<script setup>
    import { ref,computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/undb-partner.json';
    import { useI18n } from 'vue-i18n';
  

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })

    const { t } = useI18n({ messages });    
   
    const country = computed(()=>{
        const term = ref({});
        term.value.identifier=document.value.country;
        return term.value;    
    });
    
    const document = computed(()=>props.documentInfo?.body);
   
</script>
