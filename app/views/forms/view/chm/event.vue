<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document"> 
            <!--TODO: add compare-val for fields  -->

            <document-date :document-info="documentInfo"></document-date>

            <section>
                <div class="row">
                    <div class="col-2" v-if="document.logo">
                        <label>{{t("logo")}}</label>
                        <div class="km-value text-center bg-white">
                            <img class="mw-100" :src="document.logo"></img>                    
                        </div>
                    </div> 
                    <div :class="document.logo? 'col-md-10' : 'col-md-12'"  v-if="document.title">
                        <div v-if="document.title">
                            <label>{{t("title")}}</label> 
                            <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>
                        </div>
                    </div>                    
                  </div>               
            </section>           
         
            <section v-if="document.description || document.descriptionNative || document.symbol || document.type">                
                <legend>{{t("details")}}</legend>

                <div v-if="document.description">
                    <label>{{t("description")}}</label>                       
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html km-pre></ng>
                </div>

                <div v-if="document.descriptionNative">
                    <label>{{t("descriptionNativeLanguage")}}</label>
                    <div class="km-value km-pre">  
                        {{document.descriptionNative}} 
                    </div>                          
                </div>

                <div class="row">
                    <div :class="[document.type?'col-6':'col-12']" v-if="document.symbol" >                                                   
                        <label>{{t("symbol")}}</label>  
                        <div class="km-value km-pre">
                            {{lstring(document.symbol)}}   
                        </div>   
                    </div>
                    <div :class="[document.symbol?'col-6':'col-12']" v-if="document.type">  
                        <label>{{t("type")}}</label>
                        <div class="km-value km-pre" >        
                            <div v-for="term in document.type">                                
                                <km-term :value="term" :locale="locale"></km-term>
                            </div>
                        </div>                          
                    </div> 
                </div> 
            </section>

            <section v-if="document.startDate || document.endDate || document.durations"> 
                <legend>{{t("durations")}}</legend>
                <div class="row">                     
                    <div :class="[document.endDate?'col-6':'col-12']" v-if="document.startDate">
                        <label>{{t("startDateAndTime")}}</label>   
                        <div class="km-value">
                            {{formatDate(document.startDate, 'YYYY-MM-DD HH:mm')}}
                        </div> 
                    </div>

                    <div  :class="[document.startDate?'col-6':'col-12']" v-if="document.endDate">
                        <label>{{t("endDateAndTime")}}</label>
                        <div class="km-value">
                            {{formatDate(document.endDate, 'YYYY-MM-DD HH:mm')}}
                        </div>                          
                    </div>
                </div>
                
                <div  v-if="document.durations">
                    <label>{{t("durations")}}</label><br>
                    <div class="km-value km-pre">
                        <div  v-for="(duration,index) in document.durations" >
                            <div class="row  vertical-align">
                                <div class="col-6">
                                    {{lstring(duration.title)}}
                                </div>
                                <div class="col-6">
                                    {{formatDate(document.startDate, 'YYYY-MM-DD HH:mm')}} 
                                    <br><strong class="ps-5">to</strong><br> 
                                    {{formatDate(document.endDate, 'YYYY-MM-DD HH:mm')}} 
                                </div> 
                                <div v-if="index != Object.keys(document.durations).length-1"><hr></div>                                    
                            </div>  
                        </div>                       
                    </div>
                </div>   
            </section> 

            <section v-if="document.address">                        
                <div class="row" >
                    <legend>{{t("location")}}</legend> 
                    
                    <label>{{t("address")}}</label>   
                    <div class="km-value km-pre">                                
                        <span v-if="document.address.address"> {{lstring(document.address.address,locale)}}</span> 
                        <br/>
                        <span v-if="document.address.city">{{lstring(document.address.city,locale)}}, </span> 
                        <span v-if="document.address.state">{{lstring(document.address.state,locale)}}</span>
                        <br v-if="document.address.city || document.state" />
                        <span v-if="document.address.postalCode">{{lstring(document.address.postalCode,locale)}}</span>   
                        <span v-if="document.address.country">                          
                            <b> <km-term :value="document.address.country" :locale="locale"></km-term></b> 
                            <img class="m-1" style="height:15px;" :src="`https://www.cbd.int/images/flags/96/flag-${document.address.country.identifier}-96.png?v=<%=gitVersion%>`"></img>      
                        </span>                   
                    </div>  
                                
                    
                    <div class="col-xs-12">                       
                        <label><i class="fa fa-google" aria-hidden="true"></i>{{t("map")}}</label>
                        <div class="km-value" v-if="document.address.googlePlaceId">
                            <iframe :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyCyD6f0w00dLyl1iU39Pd9MpVVMOtfEuNI&q=place_id:${document.address.googlePlaceId}`"
                            width="100%" height="200" frameborder="0"  class="border-0" allowfullscreen></iframe>
                        </div>                           
                    </div>           
                </div>
            </section>  
            
            <section v-if="document.websites || document.videos || document.documents || document.images || document.logo " >  
                <legend>{{t("socialMedia")}}</legend> 
                <div class="row">                   
                    <div class="col-6" v-if="websiteLinks.length>0"  >                                                 
                        <label>{{t("website")}}</label> 
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="websiteLinks" ></ng>    
                        </div>
                    </div>                         
    
                    <div class="col-6" v-if="facebookLinks.length>0" >                           
                        <label>{{t("facebook")}}</label>
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="facebookLinks" ></ng>    
                        </div>
                    </div>                      

                    <div class="col-6"  v-if="twitterLinks.length>0" >
                        <label>{{t("twitter")}}</label> 
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="twitterLinks" ></ng>    
                        </div>
                    </div>                       

                    <div class="col-6" v-if="youtubeLinks.length>0" >                            
                        <label >{{t("youtube")}}</label>
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="youtubeLinks" ></ng>    
                        </div>
                    </div>                      

                    <div  class="col-6" v-if="otherLinks.length>0">                           
                        <label>{{t("additionalLinks")}}</label> 
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="otherLinks" ></ng>    
                        </div>                       
                    </div>                      

                    <div  class="col-6" v-if="document.images">                            
                        <label>{{t("images")}}</label>                               
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.images" ></ng>    
                        </div>
                    </div>

                    <div  class="col-6" v-if="document.documents">                         
                        <label>{{t("documents")}}</label>                            
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.documents" ></ng>    
                        </div>              
                    </div>

                    <div  class="col-6" v-if="document.videos">                           
                        <label>{{t("videos")}}</label>
                        <div class="km-value">                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.videos" ></ng>    
                        </div>                           
                    </div>  
                </div>               
            </section> 

            <section v-if="document.contactOrganization"> 
                <!-- TODO: change component to show same style as old project -->               
                <legend>{{ t("contactHost") }}</legend>                         
                <div class="km-value">                               
                    <ng v-vue-ng:view-record-reference  v-model:ng-model="document.contactOrganization" :locales="locale" html></ng>   
                </div>                 
            </section> 

            <section v-if="document.thematicAreas || document.aichiTargets ">             
                <legend>{{ t("thematicAreas") }}</legend>
                <div class="row">
                    <div :class="[document.aichiTargets?'col-6':'col-12']" v-if="document.thematicAreas">
                        <label>{{t("cbdSubjectAreas")}}</label>
                        <div class="km-value">
                            <div v-for="term in document.thematicAreas">                              
                                <km-term :value="term" :locale="locale"></km-term>
                            </div>
                        </div>
                    </div>

                    <div  :class="[document.thematicAreas?'col-6':'col-12']" v-if="document.aichiTargets">
                        <label>{{ t("aichiTargets") }}</label>
                        <div class="km-value">
                            <div v-for="term in document.aichiTargets">
                                <img style="height: 20px;  width: 20px;" class="mb-2" :src="`https://www.cbd.int/images/aichi/48/abt-${getAichiNumber(term)}-48.png?v=<%=gitVersion%>`"/>
                                <a :href="`https://www.cbd.int/aichi-targets/target/${getAichiNumber(term)}`">
                                    <km-term :value="term" :locale="locale"></km-term>
                                </a>
                            </div>
                        </div>
                    </div>    
                </div>               
            </section>

            <div> 
                <ng v-vue-ng:view-referenced-records  v-model:ng-model="document.header.identifier"></ng> 
            </div>         
        </div> 
        <ng v-vue-ng:document-metadata  :document="document"></ng> 
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import '~/views/forms/view/directives/view-reference-records.directive.js'   
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/event.json';
    import documentDate from '~/views/forms/view/directives/document-date.vue'; 
    import { useI18n } from 'vue-i18n';
    import { formatDate, lstring } from '~/components/kb/filters';

    const { t, locale } = useI18n({ messages });    
     
    const props = defineProps({
        documentInfo: { type:Object, required:true },
        locale      : { type:String, required:true }
    })     
            
    const document = computed(()=>props.documentInfo?.body);

    const websiteLinks  = computed(()=>{    
        if (!document.value.websites) return [];     
        return document.value.websites.filter(checkWebsiteLinks )       
    });
    const twitterLinks  = computed(()=>{
        if (!document.value.websites) return [];     
        return document.value.websites.filter(checkTwitterLinks )
    });
    const facebookLinks = computed(()=>{
        if (!document.value.websites) return [];     
        return document.value.websites.filter(checkFacebookLinks)
    });
    const youtubeLinks  = computed(()=>{ 
        if (!document.value.websites) return [];     
        return document.value.websites.filter(checkYoutubeLinks )
    });
    const otherLinks = computed(()=>{ 
        if (!document.websites) return [];  
        return document.websites.filter(checkOtherLinks)
    });          
   
    const checkWebsiteLinks = (obj) => {return (obj.name ==='website' )}
    const checkTwitterLinks = (obj) => {return (obj.name ==='twitter' )}
    const checkFacebookLinks= (obj) => {return (obj.name ==='facebook')}
    const checkYoutubeLinks = (obj) => {return (obj.name ==='youtube' )}
    const checkOtherLinks   = (obj) => {
        return (obj.name !='website' && obj.name !='twitter' && obj.name !='facebook' && obj.name !='youtube');
    }
    const getAichiNumber = (term) => {return term.identifier.slice(-2)};   
  
</script>
