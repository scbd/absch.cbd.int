<template>
    <div>  
        route: {{route}}
        <!-- currentCountry:{{ currentCountry }} -->
        
        <!-- <div v-if="currentCountry.code" style="padding:5px;margin-bottom:10px;" :class="{ 
        'bg-chm': isCHM && currentCountry.isParty && !currentCountry.isInbetweenParty, 
        'bg-darkgrey':!currentCountry.isParty && !currentCountry.isInbetweenParty, 
        'bg-inbetween': currentCountry.isInbetweenParty}">
            <div>
               
                <span class="color-white fw-bold" v-if="((isCHM && currentCountry.isParty) || (isCHM && currentCountry.isParty)) && !currentCountry.isInbetweenParty">
                    {{t('homepinPopupChmTranslation.partyToConvention')}}</span>
                
                    <span  class="color-white fw-bold" v-if="(isCHM && currentCountry.isInbetweenParty)">
                        {{t('homepinPopupChmTranslation.ratifiedNotYetParty')}}</span>
    
                    <span  class="color-white fw-bold" v-if="(isCHM && !currentCountry.isParty && !currentCountry.isInbetweenParty) || (isCHM && !currentCountry.isParty)">
                        {{t('homepinPopupChmTranslation.notPartyToConvention')}}</span>
    
            </div>
        </div> -->

        <div>     
            <!-- <table class="table table-map table-condensed" style="display: block;overflow-x: auto;white-space: nowrap;" >
                <tr v-for="schema in countryMapScope.currentCountry.schemas" style="border:none;">
                    <td>
                        <span class="rounded badge ms-2"  :class="{'bg-gray-300' : schema.count==0, 'bg-chm':schema.count>0 }" v-bind="schema.count"></span>
                    </td>
                    <td>                  
                        <a rel="noopener" v-if="currentCountry.code" translation-url @click="ToggleCountyList(schema.shortCode,currentCountry.code)" class="  text-black cursor-pointer" >
                            <span v-bind="lstring(schema.title| locale) "></span>
                        </a>                
                        <a rel="noopener" v-if="!currentCountry.code" translation-url href="{{translationUrl}}/search?schema={{schema.shortCode|mapSchema}}" class="  text-black ">
                            <span v-bind="lstring(schema.title| locale) "></span>   
                            
                            
                        </a>                   
                    </td>
                </tr>
            </table>  -->
        </div>
    </div>
</template>

<script setup>
    //import homepinPopupChmTranslation from '~/app-text/views/countries/directives/homepin-popup-chm.json';
    import { useRoute } from "@scbd/angular-vue/src/index.js";    
    //translationService.set('homepinPopupChmTranslation', homepinPopupChmTranslation);
    const route = useRoute().value;
    

    // const ToggleCountyList = (code, currentCountryCode) => {
    //     if ((route?.params?.code) && $("#div" + code).length>0) {
    //         $('html, body').animate({
    //             scrollTop: $("#div"+code).offset().top
    //         }, 500);
    //         if ($("#div" + code).find('i').hasClass("bi-chevron-down")){
    //             $("#div" + code).trigger('click');
    //         }
    //     }
    //     else{
    //         route?.params?.path(`countries/${currentCountryCode}/${code}`);
    //     }
    // }
 

</script>


