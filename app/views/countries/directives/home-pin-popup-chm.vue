<template>
    <div> 
        route: {{route}}        
        country: {{ country }}
        countryMap: {{ countryMap }}
   
               
        <!-- <div v-if="country.code" style="padding:5px;margin-bottom:10px;" :class="{ 
        'bg-chm': isCHM && country.isParty && !country.isInbetweenParty, 
        'bg-darkgrey':!country.isParty && !country.isInbetweenParty, 
        'bg-inbetween': country.isInbetweenParty}">
            <div>
               
                <span class="color-white fw-bold" v-if="((isCHM && country.isParty) || (isCHM && country.isParty)) && !country.isInbetweenParty">
                    {{t('homepinPopupChmTranslation.partyToConvention')}}</span>
                
                    <span  class="color-white fw-bold" v-if="(isCHM && country.isInbetweenParty)">
                        {{t('homepinPopupChmTranslation.ratifiedNotYetParty')}}</span>
    
                    <span  class="color-white fw-bold" v-if="(isCHM && !country.isParty && !country.isInbetweenParty) || (isCHM && !country.isParty)">
                        {{t('homepinPopupChmTranslation.notPartyToConvention')}}</span>
    
            </div>
        </div> -->

        <div>     
            <table class="table table-map table-condensed" style="display: block;overflow-x: auto;white-space: nowrap;" >
                <tr v-for="schema in countryMap.country.schemas" style="border:none;">
                    <td>
                        <span class="rounded badge ms-2"  :class="{'bg-gray-300' : schema.count==0, 'bg-chm':schema.count>0 }" v-bind="schema.count"></span>
                    </td>
                    <td>                  
                        <a rel="noopener" v-if="country.code" translation-url @click="ToggleCountyList(schema.shortCode,country.code)" class="  text-black cursor-pointer" >
                            <span v-bind="lstring(schema.title| locale) "></span>
                        </a>                
                        <a rel="noopener" v-if="!country.code" translation-url href="{{translationUrl}}/search?schema={{schema.shortCode|mapSchema}}" class="  text-black ">
                            <span v-bind="lstring(schema.title| locale) "></span>   
                            
                            
                        </a>                   
                    </td>
                </tr>
            </table> 
        </div>
    </div>
</template>

<script setup>
    import messages from '~/app-text/views/countries/directives/home-pin-popup-chm.json';
    import { useRoute } from "@scbd/angular-vue/src/index.js";  
    import { useI18n } from 'vue-i18n';   
 
  
    //const route = useRoute().value; 
    const {value:route} = useRoute();    
    const { t } = useI18n({ messages }); 

    const props = defineProps({
        country: {type: Object, require:true, default:{}},
        countryMap: {type: Object, require:true, default:{}},
    })

    console.log(props.country)
    console.log(props.countryMap)

    

    const ToggleCountyList = (code, currentCountryCode) => {
        if ((route?.params?.code) && $("#div" + code).length>0) {
            $('html, body').animate({
                scrollTop: $("#div"+code).offset().top
            }, 500);
            if ($("#div" + code).find('i').hasClass("bi-chevron-down")){
                $("#div" + code).trigger('click');
            }
        }
        else{
            route?.params?.path(`countries/${currentCountryCode}/${code}`);
        }
    }
 

</script>


