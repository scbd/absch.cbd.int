<template>
    <div id="Record" class="record">
        <div class="record-body  bg-white" v-if="document">    
            <div v-if="document.government">
                <legend >{{ t("party") }} </legend>               
                <div class="km-value">             
                    <km-term :value="document.government" :locale="locale"></km-term>   
                </div>
            </div>
      
            <div v-if="document.description">             
                <label>{{ t("description") }} </label>                            
                <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng> 
            </div>
      
            <div v-if="document.descriptionNative">         
                <label>{{ t("descriptionNativeLanguage") }} </label>   
                <div class="km-value">
                    <span>{{document.descriptionNative}}<br/></span>
                </div>
            </div>
      
            <div v-if="document.websites">           
                <label>{{ t("websites") }} </label>  
                <div class="km-value">
                    <div v-for="item in document.websites">
                        <a  :href="item.url" target="_blank">{{item.name||item.url}}</a>      
                    </div>
                </div>
            </div>
      
            <div v-if="document.documents">             
                <label>{{ t("documents") }} </label>   
                <div class="km-value">
                    <div v-for="item in document.documents">
                        <a  :href="item.url" target="_blank">{{item.name||item.url}}</a>      
                    </div>
                </div>
            </div>
      
            <div v-if="document.images">             
                <label>{{ t("images") }} </label>   
                <div class="km-value">
                    <div v-for="item in document.images">
                        <a  :href="item.url" target="_blank">{{item.name||item.url}}</a>      
                    </div>
                </div>
            </div>
      
            <div v-if="document.videos">             
                <label>{{ t( "videos") }} </label>   
                <div class="km-value">
                    <div v-for="item in document.videos">
                        <a  :href="item.url" target="_blank">{{item.name||item.url}}</a>      
                    </div>
                </div>
            </div>                   
        </div>   
    </div>
</template>

<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/undb-party.json';
    import { useI18n } from 'vue-i18n';  

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    
    const document = computed(()=>props.documentInfo?.body);
    
</script>