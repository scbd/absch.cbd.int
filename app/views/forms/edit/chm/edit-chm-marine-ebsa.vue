
<template>
    <div  v-if="document.header">
        <section>        
            <div class="row">
                <div class="col-xs-12">
                    <ng v-vue-ng:km-control-group name="languages" required :caption="t('languageToPublish')">
                        <ng v-vue-ng:km-form-languages multiple required v-model:ng-model="document.header.languages"  html></ng> 
                    </ng>
                </div>
            </div>


            <legend>{{t("generalInfo")}}</legend>
                        
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="title" required :caption="t('title')">
                            <ng v-vue-ng:km-textbox-ml v-model:ng-model="document.title" :placeholder="t('title')" :locales="document.header.languages"></ng>                
                        </ng>
                    </div> 
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">                   
                        <ng v-vue-ng:km-control-group name="summary" required :caption="t('summary')">           
                            <ng v-vue-ng:km-textbox-ml v-model:ng-model="document.summary" rows="3" :placeholder="t('summaryInfo')" :locales="document.header.languages"></ng>                
                        </ng>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">                     
                        <ng v-vue-ng:km-control-group name="IntroductionOfTheArea"  :caption="t('IntroductionOfTheArea')">             
                            <ng v-vue-ng:km-rich-textbox name="areaIntroducion" v-model:ng-model="document.areaIntroducion" rows="3" :locales="document.header.languages"></ng>                
                        </ng>
                    </div>
                </div>
            </div>
        </section>


        <section>
            <legend>{{t("location")}}</legend>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="ebsaRegion" required :caption="t('ebsaRegion')">                         
                            <ng v-vue-ng:km-select name="region" required v-model:ng-model="document.region" :placeholder="t('ebsaRegionInfo')" @items="()=>options.ebsaRegions"></ng>
                        </ng>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="location" required :caption="t('location')"> 
                            <ng v-vue-ng:km-rich-textbox  name="location" v-model:ng-model="document.location" rows="3" :locales="document.header.languages" ></ng>                
                        </ng>
                    </div>
                </div>
            </div>

            <!-- TODO: test file -->
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="geoLocation" required :caption="t('geoLocation')">
                            <div class="help-info">{{t("geoLocationInfo")}} 
                                <ng v-vue-ng:km-link name="geoJsonFile" required v-model:ng-model="document.gisFiles" 
                                    :allow-link="false" :allow-file="true" :identifier="document.header.identifier">
                                </ng>
                            </div>
                        </ng>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="form-group" v-if="mapConfig">                   
                        <div class="km-value"> 
                            <ng v-vue-ng:leaflet :map-config="mapConfig"  :center="document.gisMapCenter" :layers="gisLayer" :scroll-wheel-zoom="false"></ng>                             
                        </div> 
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-md-12">
                    <div class="form-group" v-if="mapConfig && isReady">                   
                        <div class="km-value"> 
                            <ng v-vue-ng:leaflet :map-config="mapConfig"  :center="document.gisMapCenter" :layers="gisLayer" :scroll-wheel-zoom="false"></ng>                             
                        </div> 
                    </div>
                </div>
            </div> -->
        </section>

        <section>
            <legend>{{t("areaDetails")}}</legend>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="featureDescription"  :caption="t('featureDescription')">
                            <ng v-vue-ng:km-rich-textbox  name="location" v-model:ng-model="document.areaDescription" rows="3"  :locales="document.header.languages" ></ng> 
                        </ng>                                
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">                        
                        <ng v-vue-ng:km-control-group name="featureConditions"  :caption="t('featureConditions')">   
                            <ng v-vue-ng:km-rich-textbox  name="location" v-model:ng-model="document.areaConditions" rows="3"  :locales="document.header.languages" ></ng>                
                        </ng>     
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">                       
                        <ng v-vue-ng:km-control-group name="featureDescription"  :caption="t('featureDescription')">    
                            <ng v-vue-ng:km-rich-textbox  name="location" v-model:ng-model="document.areaFeatures" rows="3"  :locales="document.header.languages" ></ng>                
                        </ng>    
                    </div>
                </div>
            </div>

            <div class="row">           
                <div class="col-xs-12">  
                    <div class="form-group">       
                        <ng v-vue-ng:km-control-group name="relatedCountries" required :caption="t('relatedCountries')">  
                            <ng v-vue-ng:km-select name="countries" multiple required v-model:ng-model="document.countries" :placeholder="t('selectCountryOption')" watch-items @items="()=>options.countries"></ng>
                        </ng> 
                    </div>
                </div>
            </div> 

            <div class="row">           
                <div class="col-xs-12">  
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="jurisdiction" required :caption="t('jurisdiction')">  
                            <ng v-vue-ng:km-yes-no name="beyondNationalJurisdiction" v-model:ng-model="document.beyondNationalJurisdiction" ></ng>
                        </ng>
                    </div>
                </div>
            </div> 
        </section>

        <section>
            <legend>{{t("references")}}</legend>     
            <div class="row">          
                <div class="col-xs-12">  
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="references" required :caption="t('references')">  
                            <ng v-vue-ng:km-rich-textbox  name="reference" v-model:ng-model="document.referenceText" rows="3"  :locales="document.header.languages" ></ng>                
                       </ng>
                    </div>
                </div>
            </div>

            <div class="row">          
                <div class="col-xs-12">  
                    <div class="form-group"> 
                        <ng v-vue-ng:km-control-group name="cbdResources" required :caption="t('cbdResources')">  
                            <ng v-vue-ng:document-selector @ng-disabled="!document.government.identifier" @on-build-query="onBuildQuery(searchText)"
                                v-model:ng-model="document.resources" question="resources" filter="true" type="checkbox" allow-new-schema="resource">
                            </ng>
                        </ng>                       
                    </div>
                </div>
            </div>

            <div class="form-group"> 
                <ng v-vue-ng:km-control-group name="otherRelevantDocument" required :caption="t('otherRelevantDocument')">  
                    <ng v-vue-ng:km-link name="referenceDocuments" v-model:ng-model="document.relation" 
                        :allow-link="true" :allow-file="true"   :identifier="document.header.identifier">
                    </ng>
                </ng>
            </div>
        </section>

        <section>      
            <legend>{{t("statusOfSubmission")}}</legend>   
            <div class="row">
                <div class="col-md-12">
                    <input type="radio" name="status" v-model="document.status" value="approved"  />
                    <label> {{t("areasApprovedForInclusionInTheEbsa")}}</label>            
                
                    <div class="row ms-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="copDecision" required :caption="t('copDecision')"> 
                                    <ng v-vue-ng:document-selector :ng-disabled="document.status!='approved'" @on-build-query="onBuildOnDecisionQuery(searchText)"
                                        v-model:ng-model="document.approvedByCopDecision" question="approvedByCopDecision" filter="true" type="checkbox">
                                    </ng> 
                                </ng>                      
                            </div>
                        </div>
                    </div>

                    <div class="row ms-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <ng v-vue-ng:km-control-group name="approvedByAPartyOrGovernment" required :caption="t('approvedByAPartyOrGovernment')"> 
                                        <ng v-vue-ng:km-select name="approvedByGovernment" v-model:ng-model="document.approvedByGovernment" @ng-disabled="document.status!='approved'" :placeholder="t('selectACountryOption')" watch-items @items="()=>options.countries"></ng>
                                    </ng>                                      
                                </div>
                            </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="date" required :caption="t('date')"> 
                                    <ng v-vue-ng:km-date  name="approvedByGovernmentOn"  v-model:ng-model="document.approvedByGovernmentOn" @ng-disabled="document.status!='approved'"></ng>                            
                                </ng>                 
                            </div>                  
                        </div> 
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <input type="radio" name="status" v-model="document.status" value="recommendedToCop"  />
                    <label>{{ t("areasThroughNationalProcess")}}</label>
        

                    <!-- hide temporarily because not getting options.sbsttsRecommendations -->
                    <!-- <div class="row ms-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>{{t( "recommendedBySBSTTA")}}</label><br/>
                                <ng v-vue-ng:km-select name="recommendedToCopBySbstta" v-model:ng-model="document.recommendedToCopBySbstta" @ng-disabled="document.status!='recommendedToCop'"   @items="()=>options.sbsttsRecommendations"></ng>
                            </div>
                        </div>
                    </div> -->

                    <div class="row ms-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="OngoingOfficialNationalProcess" required :caption="t('OngoingOfficialNationalProcess')"> 
                                    <ng v-vue-ng:km-select name="countries" v-model:ng-model="document.recommendedToCopByGovernment" :placeholder="t('selectACountryOption')" watch-items @items="()=>options.countries"  @ng-disabled="document.status!='recommendedToCop'"></ng>
                               </ng>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">                            
                                <ng v-vue-ng:km-control-group name="date" required :caption="t('date')"> 
                                    <ng v-vue-ng:km-date  name="recommendedToCopByGovernmentOn" v-model:ng-model="document.recommendedToCopByGovernmentOn" @ng-disabled="document.status!='recommendedToCop'"></ng>                            
                                </ng>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12"> 
                    <input type="radio" name="status" v-model="document.status" value="recommendedToSbstta"  />
                    <label>{{t("areasForConsiderationBySBSTTA")}}</label>
            

                    <div class="row ms-3">
                        <div class="col-md-12">                       
                            <div class="form-check">                         
                                <input  class="form-check-input" type="radio" value="SCBD" id="preparedBySCBD" name="recommendedToSbsttaBy" v-model="document.recommendedToSbsttaBy" :disabled="document.status!='recommendedToSbstta'" />
                                <label class="form-check-label">{{t("preparedByCBDWorkshops")}}</label>
                            </div>
                            <div class="form-check ">                          
                                <input  class="form-check-input" type="radio" value="ORG" id="preparedByORG" name="recommendedToSbsttaBy" v-model="document.recommendedToSbsttaBy" :disabled="document.status!='recommendedToSbstta'" />
                                <label class="form-check-label">{{t("preparedByCompetentOrganizations")}}</label>
                            </div>
                        </div>
                    </div>

                    <!-- hide temporarily because not getting options.meetings -->
                    <!-- <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label >{{t("cbdWorkshop")}}</label><br/>
                                <ng v-vue-ng:km-select name="recommendedToSbsttaByWorkshop" v-model:ng-model="document.recommendedToSbsttaByWorkshop" @ng-disabled="document.status!='recommendedToSbstta'" watch-items @items="()=>options.meetings"></ng>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>  

            <div class="row">
                <div class="col-md-12"> 
                    <input type="radio" name="status" v-model="document.status" value="recommendedToWorkshop"  />
                    <label>{{t("areasForConsiderationByWorkshop")}}</label>
        
                    <div class="row ms-3">
                        <div class="col-md-12"> 
                            <div class="form-group">                    
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="recommendedToWorkshopBy" value="GOV" id="recommendedToWorkshopByGov" v-model="document.recommendedToWorkshopBy" :disabled="document.status!='recommendedToWorkshop'" />
                                    <label class="form-check-label">{{t("government")}}</label>
                                </div>    
                                <div class="form-check">                      
                                    <input class="form-check-input" type="radio" name="recommendedToWorkshopBy" value="ORG" id="recommendedToWorkshopByOrg" v-model="document.recommendedToWorkshopBy" :disabled="document.status!='recommendedToWorkshop'" />
                                    <label class="form-check-label">{{t("competentOrganization")}}</label>                       
                                </div> 
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="recommendedToWorkshopBy" value="OTHER" id="recommendedToWorkshopByOthers" v-model="document.recommendedToWorkshopBy" :disabled="document.status!='recommendedToWorkshop'" />
                                    <label class="form-check-label">{{t("other")}}</label>                        
                                </div>
                            </div>
                        </div> 
                    </div> 

                    <div class="row ms-3" v-if="document.recommendedToWorkshopBy=='GOV'">
                        <div class="col-md-12">
                            <div class="form-group">   
                                <ng v-vue-ng:km-control-group name="selectCountries" required :caption="t('selectCountries')">
                                    <ng v-vue-ng:km-select name="recommendedToWorkshopByGovernments" multiple v-model:ng-model="document.recommendedToWorkshopByGovernments" @ng-disabled="document.status!='recommendedToWorkshop'" :placeholder="t('selectCountryOption')" watch-items @items="()=>options.countries"></ng> 
                                </ng>
                            </div>
                        </div>
                    </div>

                    <div class="row ms-3" v-if="document.recommendedToWorkshopBy=='ORG'">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="selectOrganizations" required :caption="t('selectOrganizations')">
                                    <ng v-vue-ng:document-selector  @on-build-query="onBuildOrganizationQuery(searchText)"
                                        v-model:ng-model="document.recommendedToWorkshopByOrganizations" question="organizations" filter="true" type="checkbox" allow-new-schema="organizations">
                                    </ng>   
                                </ng>
                            </div>
                        </div>
                    </div>

                    <div class="row ms-3" v-if="document.recommendedToWorkshopBy=='OTHER'">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="details" required :caption="t('details')">
                                    <ng v-vue-ng:km-textbox-ml name="recommendedToWorkshopByOthers" rows="4" v-model:ng-model="document.recommendedToWorkshopByOthers" @ng-disabled="document.status!='recommendedToWorkshop'" :locales="document.header.languages"></ng>
                                </ng>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>     
            
            <div class="row">
                <div class="col-md-12">     
                    <input type="radio" name="status" v-model="document.status" value="recommendedToAny" />
                    <label>{{t("otherRelevantAreas")}}</label>       

                    <div class="row ms-3">
                        <div class="col-md-12">
                            <div class="form-group">   
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="GOV" id="recommendedToAnyByGov" name="recommendedToAnyBy" v-model="document.recommendedToAnyBy" :disabled="document.status!='recommendedToAny'" />
                                    <label class="form-check-label">{{t("government")}} </label>
                                </div>    
                                <div class="form-check">                      
                                    <input class="form-check-input" type="radio" value="ORG" id="recommendedToAnyByOrg" name="recommendedToAnyBy" v-model="document.recommendedToAnyBy" :disabled="document.status!='recommendedToAny'" />
                                    <label class="form-check-label">{{t("competentOrganization")}}</label>                       
                                </div> 
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="OTHER" id="recommendedToAnyByOthers" name="recommendedToAnyBy" v-model="document.recommendedToAnyBy" :disabled="document.status!='recommendedToAny'" />
                                    <label class="form-check-label">{{t("other")}}</label>                        
                                </div>
                            </div>
                        </div>
                    </div>            

                    <div class="row ms-3" v-if="document.recommendedToAnyBy=='GOV'">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="selectCountries" required :caption="t('selectCountries')">
                                    <ng v-vue-ng:km-select name="recommendedToAnyByGovernment" multiple v-model:ng-model="document.recommendedToAnyByGovernment" @ng-disabled="document.status!='recommendedToAny'" :placeholder="t('selectCountryOption')" watch-items @items="()=>options.countries"></ng>  
                                </ng> 
                            </div>
                        </div>
                    </div>

                    <div class="row ms-3" v-if="document.recommendedToAnyBy=='ORG' ">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="selectOrganizations" required :caption="t('selectOrganizations')">
                                    <ng v-vue-ng:document-selector  @on-build-query="onBuildOrganizationQuery(searchText)"
                                        v-model:ng-model="document.recommendedToAnyByOrganizations" question="organizations" filter="true" type="checkbox" allow-new-schema="organizations">
                                    </ng>
                                </ng> 
                            </div>
                        </div>
                    </div>

                    <div class="row ms-3" v-if="document.recommendedToAnyBy=='OTHER'">
                        <div class="col-md-12">
                            <div class="form-group">
                                <ng v-vue-ng:km-control-group name="details" required :caption="t('details')">
                                    <ng v-vue-ng:km-textbox-ml  name="recommendedToAnyByOthers"  rows="3" v-model:ng-model="document.recommendedToAnyByOthers"  @ng-disabled="document.status!='recommendedToAny'" :locales="document.header.languages" ></ng>
                                </ng>       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <legend>{{t("assessmentOfArea")}}</legend>
            <div class="form-check" v-for="assessment in document.assessments" :key="assessment">  
                <div class="form-group">   
                    <input class="form-check-input" type="checkbox" v-model="assessment.selected" >
                    <label><b>{{assessment.title}}</b></label>
                    <br/>
                
                    <div class="btn-group" bs-buttons-radio  >
                        <button type="button" class="btn btn-default" :disabled="!assessment.selected" :class="{ 'btn-info':assessment.level=='high',          'active':assessment.level=='high'}"          @click="assessment.level='high'">{{t("high")}}</button>
                        <button type="button" class="btn btn-default" :disabled="!assessment.selected" :class="{ 'btn-info':assessment.level=='medium',        'active':assessment.level=='medium'}"        @click="assessment.level='medium'">{{t("medium")}}</button>
                        <button type="button" class="btn btn-default" :disabled="!assessment.selected" :class="{ 'btn-info':assessment.level=='low',           'active':assessment.level=='low'}"           @click="assessment.level='low'">{{t("low")}}</button>
                        <button type="button" class="btn btn-default" :disabled="!assessment.selected" :class="{ 'btn-info':assessment.level=='noInformation', 'active':assessment.level=='noInformation'}" @click="assessment.level='noInformation'">{{t("noInformation")}}</button>
                    </div>
                
                    <ng v-vue-ng:km-rich-textbox @ng-disabled="!assessment.selected" v-model:ng-model="assessment.justification" rows="8" :locales="document.header.languages"
                            :identifier="document.header.identifier">
                    </ng>  
                </div>        
            </div>

        </section>

        <section>
            <legend>{{t("additionalInformation")}}</legend>
            <div class="form-group">           
                <label>{{t("additionalInformation")}}</label><br/>               
                <ng v-vue-ng:km-control-group name="otherRelevantInformationInfo" required :caption="t('otherRelevantInformationInfo')">
                    <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.relevantInformation" rows="3" :placeholder="t('otherRelevantInformationInfo')" :locales="document.header.languages" ></ng>                
                </ng>
                <ng v-vue-ng:km-control-group name="otherRelevantDocument" required :caption="t('otherRelevantDocument')">
                    <ng v-vue-ng:km-link name="relevantDocuments" v-model:ng-model="document.relevantDocuments" 
                        :allow-link="true" :allow-file="true"   :identifier="document.header.identifier">
                    </ng>
                </ng>
            </div>       
        </section>

        <section>
            <legend>{{t("notes")}}</legend>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <ng v-vue-ng:km-control-group name="notes" required :caption="t('notes')">
                            <div>
                                <div class="help-info"> {{t("notesInfos")}}</div>    
                                <ng v-vue-ng:km-notes name="notes" v-model:ng-model="document.notes"></ng>  
                            </div>
                        </ng>
                    </div>                                            
                </div>
            </div>
        </section>
    </div>
    
</template>
<script setup>
    import { computed, inject, watch, shallowRef, onMounted, ref} from 'vue';
    import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"  
    import { sanitizeDocument } from '~/services/filters/common';
    import { mapConfig } from '~/views/forms/view/chm/leaflet/config.js'; 
    import { THESAURUS } from '~/services/filters/constant';
    import { useAuth }   from "@scbd/angular-vue/src/index.js";
    import { useI18n }   from 'vue-i18n';  
    import messages      from '~/app-text/views/forms/edit/chm/edit-chm-marine-ebsa.json';
    import ThesaurusApi  from "~/api/thesaurus.js";
    import KmDocumentApi from "~/api/km-document";
    import SolrApi       from "~/api/thesaurus.js";
    import { useRealm } from  '~/services/composables/realm.js';
    import { onBuildDocumentSelectorQuery } from '~/services/solr/queries.js';
    import L from 'leaflet';
 
    const realm = useRealm();
    const document                = defineModel();
    const angularGetCleanDocument = inject('getCleanDocument')
    const { t }                   = useI18n({ messages });
    const auth                    = useAuth();
    const gisLayer                = shallowRef([]);
    const thesaurusApi            = new ThesaurusApi({tokenReader:()=>auth.token()});
    const kmDocumentApi           = new KmDocumentApi({tokenReader:()=>auth.token()});
    const solrApi                 = new SolrApi({tokenReader:()=>auth.token()});
    const isReady                 = ref(false);

    const  decisionQuery = {
        query       : "schema_s:decision AND treaty_s:XXVII8 AND body_s:COP",
        rowsPerPage : 999999,
        fields      : "title_t,symbol_s,event_s"
    };

    const THESAURUS_EBSA_REGION="0AE91664-5C43-46FB-9959-0744AD1B0E91";
  

    const options = {
        countries     : thesaurusApi.getDomainTerms(THESAURUS.COUNTRIES),
        ebsaRegions   : thesaurusApi.getDomainTerms(THESAURUS_EBSA_REGION)
    };
    const userGovernment = computed(()=> auth.user()?.government);
   
    const getCleanDocument = (doc) =>{  
        const lDocument = doc || document.value
        if (!lDocument)
                return undefined
    
        if (/^\s*$/g.test(lDocument.notes))
            lDocument.notes = undefined
    
        return sanitizeDocument(lDocument);
    };

    angularGetCleanDocument({
         getCleanDocument
    }); 

    onMounted(() => {
        //BF. trick leaflet to resize to render the map
        // window.dispatchEvent(new Event('resize'));
        // document.value.gisFiles=  document.value.gisFiles || [];  
        // console.log('hello')
        // // loadShapes (document.value?.gisFiles).then(()=>{
        //     setTimeout(()=>{
        //         //BF. trick leaflet to resize to render the map
        //         window.dispatchEvent(new Event('resize'));
        //         console.log('resize')
        //     }, 1500); 
        // });


        initAssessments();
    });

    const initAssessments=()=> {
        document.value.assessments=[
                { selected: false, identifier: "criteria1", title: t("c1") },
				{ selected: false, identifier: "criteria2", title: t("c2") },
				{ selected: false, identifier: "criteria3", title: t("c3") },
				{ selected: false, identifier: "criteria4", title: t("c4") },
				{ selected: false, identifier: "criteria5", title: t("c5") },
				{ selected: false, identifier: "criteria6", title: t("c6") },
				{ selected: false, identifier: "criteria7", title: t("c7") }
        ]
    }

    watch(()=>document.value.gisFiles, (newVal, oldVal)=> { 
        if(!newVal?.length){
            gisLayer.value = [];
            return;
        }
        isReady.value = false;
        loadShapes (newVal).then(()=>{
            setTimeout(()=>isReady.value = true, 3500); 
        }); 
    });

    async function loadShapes (fileLinks) {
        if(!fileLinks?.length)
            return;

        //BF. trick leaflet to resize to render the map
        window.dispatchEvent(new Event('resize'));
        
        const qLayers = fileLinks?.map(async (link) => {
            const res  = await fetch(link.url);
            const data = await res.json();   
            data.view = true;
            const layer =  L.geoJson(data);
            return layer
        });
        const s = await Promise.all(qLayers);  
        gisLayer.value = s;       
    };

    const onBuildQuery=(searchText)=>{
        var queryOptions = {
                schemas   : ['resource'],
                realm     : realm.value,
                searchText: searchText
            }
        return onBuildDocumentSelectorQuery(queryOptions);
    }

    const onBuildOrganizationQuery=(searchText)=>{
        var queryOptions = {
                schemas   : ['organization'],
                realm     : realm.value,
                searchText: searchText
            }
        return onBuildDocumentSelectorQuery(queryOptions);
    }

    const onBuildOnDecisionQuery=(searchText)=>{
        var queryOptions = {
                schemas   : ['decision'],            
                searchText: searchText,
                query: "treaty_s:XXVII8 AND body_s:COP"
            }
        return onBuildDocumentSelectorQuery(queryOptions);
    }
    
</script>