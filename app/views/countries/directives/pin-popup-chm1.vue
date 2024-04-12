<template>
    <div>   
        <div v-if="currentCountry.code" style="padding:5px;" :class="{'bg-party': currentCountry.isParty, 'bg-darkgrey':!currentCountry.isParty, 'bg-inbetween': currentCountry.isInbetweenParty}">
            <div>
                <span v-if="(isCHM && currentCountry.isParty) || (isCHM && currentCountry.isParty)">
                    {{t('pinPopupChmT.partyToNagoya')}}</span>
                <span v-if="(isCHM && currentCountry.isInbetweenParty)">
                    {{t('pinPopupChmT.ratified')}}</span>
                <span v-if="(isCHM && !currentCountry.isParty && !currentCountry.isInbetweenParty) || (isCHM && !currentCountry.isParty)">
                    {{t('pinPopupChmT.notPartyToNagoya')}}</span>
            </div>     
        </div>
        <div>    
            <table class="table table-map table-condensed" style="display: block;overflow-x: auto;white-space: nowrap;" >
                <tr v-for="schema in countryMapScope.currentCountry.schemas" style="border:none;">
                    <td >
                        <span class="badge bg-black"><span v-bind="schema.count"></span></span>
                    </td>
                    <td>
                        <a rel="noopener" v-if="currentCountry.code" translation-url href="{{translationUrl}}/countries/{{currentCountry.code}}/{{schema.shortCode}}"  style="color:#fff">
                            <span v-bind="lstring(schema.title| locale) "></span>                     
                     
                        </a>
                        <a rel="noopener" v-if="!currentCountry.code" translation-url href="{{translationUrl}}/search?schema={{schema.shortCode|mapSchema}}"  style="color:#fff">
                            <span v-bind="lstring(schema.title| locale) "></span>                     
                           
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
    import pinPopupChmT from '~/app-text/views/countries/directives/pin-popup-chm.json';

    //app.directive('pinPopupChm', ['translationService', function(translationService){
   
    translationService.set('pinPopupChmT', pinPopupChmT);
      
</script>