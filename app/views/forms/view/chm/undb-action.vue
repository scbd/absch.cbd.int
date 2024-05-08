<template>     
    <div id="Record" class="record">
        <div class="record-body bg-white" v-if="document"> 
            <section>
                <div v-if="document.title">
                    <label for="subTopic">{{ t("title") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>  
                </div>
            </section>

            <section>                
                <div v-if="document.startDate">
                    <label for="subTopic">{{ t("startDate") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="formatDate(document.startDate, 'YYYY-MM-DD')" :locales="locale" html></ng>  
                </div>
                
                <div v-if="document.endDate">
                    <label for="subTopic">{{ t("endDate") }}</label>	
                    <ng v-vue-ng:km-value-ml  :value="formatDate(document.endDate, 'YYYY-MM-DD')" :locales="locale" html></ng>  
                </div>
                <div v-if="document.startTime">
                    <label for="subTopic">{{ t("fromTime") }}</label>
                    <div class="km-value"> {{document.startTime}}</div>
                </div>

                <div v-if="document.endTime">
                    <label for="subTopic">{{ t("toTime") }}</label>	
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
                    <label for="subTopic">{{ t("address") }}</label>   
                    <ng v-vue-ng:km-value-ml  :value="document.address" :locales="locale" html></ng>  
                </div>

                <div v-if="document.onlineEvent">
                    <label for="subTopic">{{ t("eventIsOnline") }}</label>
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
                    <ng v-vue-ng:km-value-ml  :value="document.descriptionNative" :locales="locale" html></ng>  
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
    import messages from '~/app-text/views/reports/chm/undb-action.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })

    const { t } = useI18n({ messages });    
   
    const country = computed(()=>{
        const term = {};
        term.identifier=document.value.country;
        return term;    
    });
    
    const document = computed(()=>props.documentInfo?.body);
   
</script>
