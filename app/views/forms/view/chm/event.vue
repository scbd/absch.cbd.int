<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">              
            {{ document }}   
            
            <section>
                <!-- TODO:change style -->
                <div class="row">
                    <div class="col-xs-2" v-if="document.logo">
                        <label >Logo</label>
                        <div class="km-value text-center" style="background-color:#fff;">
                            <img style="max-width:100%;" :src="document.logo"></img>
                        </div>
                    </div>
                      <div :class="{'col-xs-10':!!(document.logo),'col-xs-12':!!!(document.logo)}">
                            <div v-if="document.title">
                                <label >Title</label>                   
                                <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>
                            </div>
                      </div>      
                  </div>
            </section>

            <section> 
                <div v-if="document.description || document.descriptionNative || document.symbol || document.type">
                    <legend>Details</legend>

                    <div v-if="document.description">
                        <label >Description</label>                       
                        <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>
                    </div>

                    <div v-if="document.descriptionNative">
                        <label>Description Naitve Language</label>
                        <div class="km-value">  {{document.descriptionNative}} </div>                          
                    </div>

                    <div v-if="document.symbol">                           
                        <label >Symbol</label>                 
                        <ng v-vue-ng:km-value-ml  :value="document.symbol.locale" :locales="locale" html></ng>                       
                    </div>

                    <div v-if="document.type">
                        <label >Type</label>
                        <div class="km-value" >        
                            <div v-for="term in document.type">                                
                                <km-term :value="term" :locale="locale"></km-term>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section>                    
                <div class="row" v-if="document.startDate || document.endDate || document.durations">
                    <legend >Durations</legend>

                    <!-- TODO:change style -->
                    <div v-if="document.startDate">
                        <label >Start date and time</label>   
                        <div class="km-value">
                            {{formatDate(document.startDate, 'YYYY-MM-DD HH:mm')}}
                        </div> 
                    </div>

                    <div v-if="document.endDate">
                        <label >End date and time</label>
                        <div class="km-value">
                            {{formatDate(document.endDate, 'YYYY-MM-DD HH:mm')}}
                        </div>                          
                    </div>

                    <!-- TODO: add durations -->
                    <!-- <div v-if="document.durations">
                        <label >Durations</label><br>

                        <div class="col-xs-7 km-value" style="padding: 20px 0 20px 0;">
                            <div class="col-xs-12" v-for-start="duration in document.durations" >
                            <div  class="row vertical-align">
                                    <div  class="col-xs-6">
                                        {{lstring(duration.title)}}
                                    </div>
                                        <div class="col-xs-6">
                                            <ng v-vue-ng:km-value-ml  :value="formatDate(document.startDate, 'YYYY-MM-DD HH:mm')" :locales="locale" html></ng> 
                                            <br><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to</strong><br> 
                                            <ng v-vue-ng:km-value-ml  :value="formatDate(document.endDate, 'YYYY-MM-DD HH:mm')" :locales="locale" html></ng> 
                                        </div>        
                                    </div>
                            </div>
                            <div class="col-xs-12" v-for-end v-if="!$last"><hr ></div>
                        </div>
                    </div> -->
                </div> 
            </section> 
                    
            <section>                        
                <div class="row" v-if="document.address">
                    <legend >Location</legend> 
                        <div v-if="document.address">
                            <label >Address</label>   
                            <div class="km-value">
                                {{lstring(document.address.address,locale)}}<br/>
                                {{lstring(document.address.city,locale)}}<span v-if="document.address.city">, </span>
                                {{lstring(document.address.state,locale)}}<br v-if="document.address.city || document.state" />
                                {{lstring(document.address.postalCode,locale)}}<span v-if="document.address.postalCode">, </span>
                                <b> <km-term :value="document.address.country" :locale="locale"></km-term></b> 
                                <!-- TODO:test image -->
                                <!-- <image src="https://www.cbd.int/images/flags/96/flag-jp-96.png?v=<%=gitVersion%>"></image>  -->
                                <!-- <image style="height:15px;" :src="`https://www.cbd.int/images/flags/96/flag-${document.address.country.identifier}-96.png?v=<%=gitVersion%>`"></image>  -->
                      
                            </div>  
                        </div>                            
                         <!-- TODO:add-->
                        <!-- <div class="col-xs-12">
                            <div v-if="getEmbedMapUrl()">
                                <label > <i class="fa fa-google" aria-hidden="true"></i> Map</label>
                                <div class="km-value">
                                    <iframe ng-src="{{embedMapUrl | trustAsResourceUrl}} " width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>            -->
                </div>
            </section>    
        
           <section>
               <!-- TODO: change style, test -->
                <div v-if="document.websites || document.videos || document.documents || document.images || document.logo " >
                    <legend >Social Media</legend>
                   <div class="row">
                        <div class="col-xs-12 col-md-6" v-for="item in document.websites"  >
                            <div v-if="item.name==='website'">                           
                                <label>Website</label>
                                <div class="km-value">                                  
                                    <a target="_blank" :href="item.url">
                                        <i  class="fa fa-home" aria-hidden="true"></i> {{item.name||item.url}}
                                    </a>
                                    <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>                                     
                                </div>                        
                            </div>
                        </div>
        
                        <div  class="col-xs-12 col-md-6" v-for="item in document.websites" >
                            <div v-if="item.name==='facebook'">
                            
                                    <label >Facebook</label>
                                    <div class="km-value"> 
                                        <a target="_blank" :href="item.url">
                                            <i class="fa fa-facebook-square" aria-hidden="true"></i> {{item.name||item.url}}
                                        </a>
                                        <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>                                    
                                    </div>                            
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-6"  v-for="item in document.websites" >
                            <div v-if="item.name==='twitter'">
                            
                                    <label>Twitter</label>
                                    <div class="km-value">
                                        <a target="_blank" :href="item.url">
                                            <i class="fa fa-twitter-square" aria-hidden="true"></i> {{item.name||item.url}}
                                        </a>
                                        <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>                                        
                                    </div>
                                
                            </div>
                        </div> 

                        <div  class="col-xs-12 col-md-6" v-for="item in document.websites" >
                            <div v-if="item.name==='youtube'">
                            
                                    <label class="view">Youtube</label>
                                    <div class="km-value">
                                        <div>            
                                            <a target="_blank" :href="item.url">
                                                <i v-if="item.name==='youtube'" class="fa fa-youtube-square" aria-hidden="true"></i> {{item.name||item.url}}
                                            </a>
                                            <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>

                        <!-- <div  class="col-xs-12 col-md-6" v-if="hasOtherLinks()">
                            <div>
                                <label >Additional Links</label>
                                <div class="km-value">
                                    <div v-for="item in document.websites">        
                                        <a target="_blank" :href="item.url">
                                            <i class="fa fa-external-link" aria-hidden="true"></i> {{item.name||item.url}}
                                        </a>
                                        <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <div  class="col-xs-12 col-md-6"v-if="document.images">
                            <div>
                                <label>Images</label>
                                <div class="km-value">
                                    <div v-for="item in document.images">        
                                        <a target="_blank" :href="item.url">
                                            <i class="fa fa-external-link" aria-hidden="true"></i> {{item.name||item.url}}
                                        </a>
                                        <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div  class="col-xs-12 col-md-6" v-if="document.documents">                         
                            <label >Documents</label>
                            <div class="km-value">
                                <div v-for="item in document.documents">    
                                    <a target="_blank" :href="item.url">
                                        <i class="fa fa-external-link" aria-hidden="true"></i> {{item.name||item.url}}
                                    </a>
                                    <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>
                                </div>
                            </div>                          
                        </div>

                        <div  class="col-xs-12 col-md-6" v-if="document.videos">                           
                            <label >Videos</label>
                            <div class="km-value">
                                <div v-for="item in document.videos">        
                                    <a target="_blank" :href="item.url">
                                        <i class="fa fa-external-link" aria-hidden="true"></i> {{item.name||item.url}}
                                    </a>
                                    <div style="overflow:scroll;"><i class="small" v-if="item.name">({{item.url}})</i></div>
                                </div>
                            </div>                            
                        </div>       
                    </div> 
                </div>
            </section> 

             <!-- TODO: didn't show content -->
            <!-- <section v-if="contactOrganization">
                <legend  >Contact Host Organization</legend>
                <div class="km-value">                               
                    <ng v-vue-ng:view-record-reference  v-model:ng-model="document.contactOrganization" :locales="locale" html></ng>   
                </div>
            </section>                  -->
                  
        </div>   
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/event.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';
    import { lstring } from '~/components/kb/filters';
    // import _ from lodash;

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
   

    //const document = computed(()=>props.documentInfo?.body);
    const document ={
  "header": {
    "identifier": "CD515765-FE80-2EB6-585B-7C4AD78986E8",
    "schema": "event",
    "languages": [
      "en"
    ]
  },
  "type": [
    {
      "identifier": "60C32FAE-649C-4D33-B0E6-DDE1F8B06C55"
    }
  ],
  "contactOrganization": {
    "identifier": "07833B09-E5F4-0A33-25C3-4EE140F4EB74"
  },
  "organizations": [
    {
      "identifier": "07833B09-E5F4-0A33-25C3-4EE140F4EB74"
    }
  ],
  "governments": [
    {
      "identifier": "jp"
    }
  ],
  "title": {
    "en": "Symposium “Our Biodiversity, Our Food, Our Health” to celebrate the International Day for Biological Diversity"
  },
  "description": {
    "en": "Food is one of the most familiar blessings from biodiversity. In Japan, a wide variety of ingredients is coming from all over the world. On the other hand, food production has been increasingly influencing on the environment in negative ways, and number and abundance of edible species are becoming limited globally. The purpose of this symposium was to consider various options to obtain food sustainably and live healthy lives in the future through focusing on food in daily meals and to share best practices for revitalizing local communities by sustainable food production. As a result, by considering these best practices, we confirmed that harmony between biodiversity and food production contributes to the achievement of many of the SDGs. We will continue to pursue the realization of Regional/Local Circulating and Ecological Sphere (Regional/Local CES).\n\nContributing Host Organizations：UNU-Institute for the Advanced Study of Sustainability (UNU-IAS), Global Environment Outreach Centre (GEOC), Japan Committee for United Nations Decade on Biodiversity (UNDB-J), NPO Farmer’s Market Association"
  },
  "descriptionNative": "我々が得ている生物多様性の恵みの中で、最も身近なものは食料です。現在の日本の食卓には、世界各地からの多様な食材がのぼっていますが、一方で、世界では食糧に利用される種数が限定されつつあり、また、食料資源の持続可能性や食料生産による環境への悪影響も問題となっています。本シンポジウムの目的は、我々の日々の食卓に目を向け、将来にわたり持続的に食料を得て、そして健康に生活していくための様々な選択を考えるとともに、持続可能な食料生産により地域を活性化している事例を取り上げることでした。こうした事例をもとに、生物多様性と食料生産の調和がSDGsの多くのゴールの達成に資することを確認しました。我々は地域循環共生圏の実現を目指します。",
  "logo": "/api/v2013/documents/CD515765-FE80-2EB6-585B-7C4AD78986E8/attachments/jp-moe.png",
  "websites": [
    {
      "name": "website",
      "url": "https://www.env.go.jp/en/",
      "type": "link"
    },
    {
      "name": "twitter",
      "url": "https://twitter.com/MOEJ_Climate",
      "type": "link"
    },
    {
      "name": "facebook",
      "url": "https://www.facebook.com/KankyoJpn.gov/",
      "type": "link"
    }
  ],
  "startDate": "2019-05-11 14:00",
  "endDate": "2019-05-11 17:00",
  "onlineEvent": false,
  "address": {
    "address": {
      "en": "Elizabeth Rose International Conference Hall, United Nations University"
    },
    "city": {
      "en": "Shibuya City"
    },
    "state": {
      "en": "Tokyo"
    },
    "country": {
      "identifier": "jp"
    },
    "postalCode": {
      "en": "150-8925"
    },
    "googleMapsUrl": "https://maps.google.com/?cid=3818780095316791456",
    "googlePlaceId": "ChIJvWfCZF-LGGARoJCwkEMI_zQ",
    "geoLocation": {
      "lat": 35.662312,
      "lng": 139.7082801
    }
  },
  "aichiTargets": [
    {
      "identifier": "AICHI-TARGET-01"
    },
    {
      "identifier": "AICHI-TARGET-06"
    },
    {
      "identifier": "AICHI-TARGET-07"
    },
    {
      "identifier": "AICHI-TARGET-13"
    },
    {
      "identifier": "AICHI-TARGET-14"
    }
  ],
  "thematicAreas": [
    {
      "identifier": "CBD-SUBJECT-BIOMES"
    },
    {
      "identifier": "CBD-SUBJECT-CROSS-CUTTING"
    },
    {
      "identifier": "CBD-SUBJECT-OUT+CEPA"
    },
    {
      "identifier": "CBD-SUBJECT-IBD"
    },
    {
      "identifier": "CBD-SUBJECT-UNDB"
    },
    {
      "identifier": "CBD-SUBJECT-COMM"
    }
  ]
}

 

    // const isLinkType = (type) => {
    //     if(!document) return false;
	// 	return _.find(document.websites,{name:type});
    // }

  
    
</script>