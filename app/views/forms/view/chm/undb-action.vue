<template>     
    <div id="Record" class="record">
        <div class="record-body bg-white" v-if="document"> 
            <section>
                <div v-if="document.title">
                    <label>{{ t("title") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>  
                </div>
            </section>

            <section>                
                <div v-if="document.startDate">
                    <label>{{ t("startDate") }}</label>
                    <div class="km-value">
                        {{ formatDate(document.startDate, 'YYYY-MM-DD') }}
                    </div>
                </div>
                
                <div v-if="document.endDate">
                    <label>{{ t("endDate") }}</label>	
                    <div class="km-value">
                        {{ formatDate(document.endDate, 'YYYY-MM-DD') }}
                    </div>
                </div>
                <div v-if="document.startTime">
                    <label>{{ t("fromTime") }}</label>
                    <div class="km-value"> {{document.startTime}}</div>
                </div>

                <div v-if="document.endTime">
                    <label>{{ t("toTime") }}</label>	
                    <div class="km-value">{{document.endTime}} </div>
                </div> 
            </section>

            <section>        
                <div v-if="document.country">
                    <label>{{ t("country") }} </label>       
                    <div class="km-value">       
                        <km-term :value="country" :locale="locale"></km-term>           
                    </div>            
                </div>

                <div v-if="document.address">
                    <label>{{ t("address") }}</label>   
                    <ng v-vue-ng:km-value-ml  :value="document.address" :locales="locale" html></ng>  
                </div>

                <div v-if="document.onlineEvent">
                    <label>{{ t("eventIsOnline") }}</label>
                </div>

                <div v-if="document.googleMaps">
                    <label>{{ t("googleMapsLink") }}</label>
                    <div class="km-value"> 
                        <a :href="document.googleMaps" target="_blank">{{document.googleMaps}}</a>  
                    </div> 
                </div>
            </section>

            <section>
                <div v-if="document.email">
                    <label>{{ t("email") }}</label> 
                    <div class="km-value">
                        <a :href="`mailto:${document.email}`">{{document.email}} </a>
                    </div> 
                </div>
                <div v-if="document.phone">
                    <label>{{ t("telephone") }}</label>
                    <div class="km-value">{{document.phone}} </div>
                </div>
                <div v-if="document.facebook">
                    <label>{{ t("facebook") }}</label>
                    <div class="km-value"> 
                        <a :href="document.facebook" target="_blank">{{document.facebook}}</a>  
                    </div> 
                </div>
                <div v-if="document.twitter">
                    <label>{{ t("twitter") }}</label>                   
                    <div class="km-value"> 
                        <a :href="document.twitter" target="_blank">{{document.twitter}}</a>  
                    </div>
                </div>

                <div v-if="document.youtube">
                    <label>{{ t("youtube") }}</label> 
                    <div class="km-value"> 
                        <a :href="document.youtube" target="_blank">{{document.youtube}}</a>  
                    </div>
                </div>
            </section>

            <section>
                <div v-if="document.description">
                    <label >{{ t("shortDescription") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                </div>

                <div v-if="document.descriptionNative">
                    <label >{{ t("shortDescriptionInOfficialLanguage") }}</label> 
                    <div class="km-value">
                        {{ document.descriptionNative }}
                    </div>
                </div>
               
                <div v-if="document.notes">
                    <label >{{ t("commentsOrAdditionalInfo") }}</label>                      
                    <ng v-vue-ng:km-value-ml  :value="document.notes" :locales="locale" html></ng>  
                </div>
              
                <div v-if="document.logo">
                    <label >{{ t("logo") }}</label>                  
                    <div class="km-value">                    
                        <img :src="thumbnailLogoUrl" height=100  />
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
    import messages from '~/app-text/views/reports/chm/undb-action.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })

    const { t } = useI18n({ messages });    
   
    const term = ref({});
    const country = computed(()=>{   
        term.value.identifier=document.value.country;        
        return term.value;    
    });
    
    const document = computed(()=>props.documentInfo?.body);   

    const thumbnailLogoUrl = computed(()=>{
        if (!document.value.logo) return "";
        const url = document.value.logo
        const index = url.lastIndexOf("/");
        const imgPath = url.substring(0, index);
        const imgName = url.substring(index+1);
        const fullPath =  imgPath+"/thumbnail/"+imgName;
        return  fullPath;
    });  
   
</script>
