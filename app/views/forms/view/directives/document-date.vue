<template>
    <div class="float-end record-Options-div">
        <span class="xlabel " v-if="createdOn">
            {{ t("published") }}   <span class="text-primary bold" >{{formatDate(createdOn, 'DD MMM YYYY')}}</span>
        </span>
        <span class="xlabel" v-if="updatedOn">
            {{ t("lastUpdated") }}  <span class="text-primary bold">{{formatDate(updatedOn, 'DD MMM YYYY')}}</span>
        </span>
    </div>
</template>

<script setup>
    import { computed } from 'vue'; 
    import moment from 'moment';
    import messages from '~/app-text/views/reports/chm/document-date.json';
    import { formatDate } from '~/components/kb/filters';
    import { useI18n } from 'vue-i18n';  

    const { t } = useI18n({ messages });
    
    const props = defineProps({
        documentInfo: { type:Object, required: true }    
    }) 


    const updatedOn = computed(()=>{
        if  (props.documentInfo?.updatedOn){
            return props.documentInfo?.updatedOn;   
        }        
    });

    const createdOn = computed(()=>{
        var createdOn = props.documentInfo?.createdOn;
        if (createdOn && createdOn!=props.documentInfo?.updatedOn && !moment.utc(createdOn).isSame(moment.utc(updatedOn), 'day')){
            return createdOn;
        }        
    });
</script>


