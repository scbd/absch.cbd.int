<template>     
    <div id="Record" class="record">
        <div class="record-body bg-white" v-if="document">     
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->

            <section>
                <div v-if="document.name">   
                    <label>{{ t("name") }} </label>             
                    <ng v-vue-ng:km-value-ml  :value="document.name" :locales="locale" html></ng> 
                </div>

                <div v-if="document.website">               
                    <label>{{ t("website") }} </label> 
                    <div class="km-value"> 
                        <a  :href="document.website" target="_blank">{{document.website}}</a>  
                    </div> 
                </div>

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
    
                <div v-if="document.googleMaps">
                    <label>{{ t("googleMapsLink") }}</label>
                    <div class="km-value"> 
                        <a :href="document.googleMaps" target="_blank">{{document.googleMaps}}</a>  
                    </div>                    
                </div>
            </section>

            <section v-if="document.email || document.phone || document.facebook || document.twitter || document.youtube ">
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
                        <a  :href="document.facebook" target="_blank">{{document.facebook}}</a>  
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

            <section v-if="document.description || document.descriptionNative || document.notes || document.logo">
                <div v-if="document.description">
                    <label>{{ t("shortDescription") }}</label>
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html km-pre></ng>  
                </div>

                <div v-if="document.descriptionNative">
                    <label>{{ t("shortDescriptionInOfficialLanguage") }}</label> 
                    <div class="km-value km-pre">
                        {{document.descriptionNative}}
                    </div>    
                </div>

                <div v-if="document.notes">
                    <label>{{ t("commentsOrAdditionalInfo") }}</label>  
                    <ng v-vue-ng:km-value-ml  :value="document.notes" :locales="locale" html km-pre></ng>  
                 </div>

                <div v-if="document.logo">
                    <label>{{ t("logo") }}</label>                   
                    <div class="km-value"> 	
                        <img :src="thumbnailLogoUrl" height="200" />
                    </div>
                </div>
            </section>

            <div> 
                <ng v-vue-ng:view-referenced-records v-model:ng-model="document.header.identifier" ></ng> 
            </div>  
        </div>

        <ng v-vue-ng:document-metadata-vue :document-info="documentInfo"></ng>
    </div>
</template>

<script setup>
    import { ref,computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js';
    import '~/views/forms/view/directives/view-reference-records.directive.js';   
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/undb-partner.json';
    import { useI18n } from 'vue-i18n';
  

    const props = defineProps({
        documentInfo: { type:Object, required:true },
        locale      : { type:String, required:true }
    })

    const { t } = useI18n({ messages });    
   
    const country = computed(()=>{       
        return { identifier : document.value.country };
    });
    
    const document = computed(()=>props.documentInfo?.body);

    const thumbnailLogoUrl = computed(() => {
        if (!document.value.logo) return undefined;

        const pattern = /^(https:\/\/[^.]+\.cbd\.int\/|api\/v20)/; // Define the regex
        if (pattern.test(document.value.logo)) {
            const index = document.value.logo.lastIndexOf("/");
            return document.value.logo.substring(0, index) + "/thumbnail/" + document.value.logo.substring(index + 1);
        }
        else{
            return document.value.logo ;
        }
});
   
</script>
