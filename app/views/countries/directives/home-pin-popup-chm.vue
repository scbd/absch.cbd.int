<template>
    <div>        
        <div v-if="country.code" style="padding:5px;margin-bottom:10px;" :class="{ 
        'bg-chm': country.isParty && !country.isInbetweenParty, 
        'bg-darkgrey':!country.isParty && !country.isInbetweenParty, 
        'bg-inbetween': country.isInbetweenParty}">
            <div>
               
                <span class="color-white fw-bold" v-if="((country.isParty) || (country.isParty)) && !country.isInbetweenParty">
                    {{t('partyToConvention')}}</span>                   
                
                    <span  class="color-white fw-bold" v-if="(country.isInbetweenParty)">
                        {{t('ratifiedNotYetParty')}}</span>
    
                    <span  class="color-white fw-bold" v-if="( !country.isParty && !isInbetweenParty) || (!country.isParty)">
                        {{t('notPartyToConvention')}}</span>
    
            </div>
        </div>

        <div>
            <table class="table table-map table-condensed" style="display: block;overflow-x: auto;white-space: nowrap;" >           
           
                <tr v-for="schema in country.schemas" style="border:none;">            
                    <td>
                        <span class="rounded badge ms-2 "  :class="{'bg-gray-300' : schema.count==0, 'bg-chm':schema.count>0 }" >{{schema.count}}</span>
                    </td>
                    <td >                  
                        <a rel="noopener" v-if="country.code"  @click="toggleCountyList(schema.shortCode,country.code)" class="text-black cursor-pointer" style="color:#fff" >
                            <span >{{lstring(schema.title,locale)}}</span>                        
                        </a>                
                        <a rel="noopener" v-if="!country.code" :href="`search?schema=${schema.shortCode}`" class="text-black " style="color:#fff">
                            <span >{{ lstring(schema.title,locale)}}</span>                             
                        </a>                   
                    </td> 
                </tr>
            </table>  
        </div>
    </div>
</template>

<script setup>
    import messages from '~/app-text/views/countries/directives/home-pin-popup-chm.json';
    import { useRoute, useRouter} from "@scbd/angular-vue/src/index.js";      
    import { useI18n } from 'vue-i18n';    
    import { lstring } from '../../../components/kb/filters';
 
    const {value:route} = useRoute();    
    const router = useRouter();    
    const { t,locale } = useI18n({ messages }); 

    const props = defineProps({
        country: {type: Object, require:true}     
    })

    const toggleCountyList = (schema, currentCountryCode) => {       
        if ((route?.params?.code) && $("#div" + schema).length>0) {
            $('html, body').animate({
                scrollTop: $("#div"+schema).offset().top
            }, 500);
            if ($("#div" + schema).find('i').hasClass("bi-chevron-down")){
                $("#div" + schema).trigger('click');
            }
        }
        else{            
            router.push({path:`countries/${currentCountryCode}/${schema}`});
        }
    }
 

</script>


