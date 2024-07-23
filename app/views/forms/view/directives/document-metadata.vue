<template>
    <div id="doc-metadata" class="record-metadata">
        <div class="col-12">
           
            <a class="text-decoration-none uid" rel="noopener" translation-url        
                :href="`/database/${(document.schema_s||document.header.schema)|schemaShortName|encodeURIComponent/getUniqueIDForUrl|encodeURIComponent}`"
                target="_blank" >
                <i class="bi bi-box-arrow-up-right"></i> {{getUniqueID(document)}}
            </a>

            <span class="float-end  hide-on-print">
                <a class="text-decoration-none color-red text-reset text-warning" rel="noopener" v-if="showReportedRecord()" translation-url href="#" 
                    @click="loadReportRecord(document.schema_s||document.header.schema,document.identifier_s||document.header.identifier, lstring(document.title, locale)) ">
                    <i class="bi bi-exclamation-triangle-fill"></i> {{ t("report") }}
                </a>
            </span>
            <!-- <div id="divReportRecord" style="display: none;"></div> -->
            <div>
                <div id="divReportRecord" v-html="dynamicContent" style="display: none;"></div>
                <!-- <button id="reportRecordCtl" @click="handleClick">Click me</button> -->
            </div>      
        </div>
   </div> 
</template>


<script setup>
    import { computed,  onMounted, ref } from 'vue'; 
    import messages from '~/app-text/views/reports/chm/document-metadata.json';
    import { lstring } from '~/services/filters/lstring.js'; 
    import {  useRouter, useAuth } from "@scbd/angular-vue/src/index.js";
    import { useI18n } from 'vue-i18n';  
    import _            from 'lodash';
    import'~/views/directives/report-record';
    import { useRealm } from '~/services/composables/realm.js';
    import scbdSchemaDetails from '~/components/scbd-angularjs-services/filters/schema-name.json' ;
    import { scbdSchemas  } from '~/components/scbd-angularjs-services/main';   
    import KmDocumentApi from "~/api/km-document"; 
    const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});

    const { t } = useI18n({ messages });
    const realm = useRealm();
    const auth = useAuth();    
    const router = useRouter();
    const props = defineProps({
        document: { type:Object, required: true },
        locale  : { type:String, required: true }  
    }) 
   

    const getUniqueID = function(){   
        if(!props.document)
                return;
        var uid;
        // if(!document.id)
        // 	uid = $filter("uniqueIDWithoutRevision")(document.info);
        // else

        uid = uniqueID(props.document.header.identifier);
        // uid = uniqueID(props.document);

        if(!uid)
            return "[new draft]";

        return uid;
    }
    
    const loadReportRecord = computed((document)=>{
        if(!document)
                return;
        var uid

        if(!document.id)
            uid = uniqueIDWithoutRevision(document);
        else
            uid = uniqueID(document);

        if(document.revision || document.info && document.info.revision){
            var revision = (document.revision || document.info.revision);
            //temporary till revision data is migrated
            var tempUId = uniqueID(props.document);
            if(tempUId == uid+'-'+revision)
                return uid

            return  uid + '/' + revision;
        }
        return  uid;
    });   

    const showReportedRecord  = function(document){
        return !/^\/register\/\w{2,4}\/new/.test(router) &&  !/^\/register\/\w{2,4}\/([a-z])\w.+\/edit/i.test(router);
    };
    
    const  dynamicContent= ref('');
    const loadReport = function(schema, identifier,title) {  
         // var directiveHtml = "<div report-record uid='"+ identifier + "' schema='" +  schema +  "' title='" +  title + "'></div>";
        var directiveHtml = "<ng report-record :uid='"+ identifier + "' :schema='" +  schema +  "' :title='" +  title + "'></ng>";         
        dynamicContent.value = "";//directiveHtml;           
    }; 

    onMounted(() => {
        loadReport(props.document.schema_s||props.document.header.schema, props.document.identifier_s||props.document.header.identifier, lstring(props.document.title, props.locale)); 
    });
  
    // handleClick() {
    //     $element.find('#reportRecordCtl').click();
    // }
    
    const getUniqueIDForUrl =computed(()=>{
   
        if(!props.document)
                return;
        var uid

        if(!props.document.id)
            uid = uniqueIDWithoutRevision(props.document);
        else
            uid = uniqueID(props.document);

        if(props.document.revision || props.document.info && props.document.info.revision){
            var revision = (props.document.revision || props.document.info.revision);
            //temporary till revision data is migrated
            var tempUId = "uniqueID"(props.document);
            if(tempUId == uid+'-'+revision)
                return uid

            return  uid + '/' + revision;
        }

        return  uid;
    })


    const  uniqueID= async function(term) {   
        var cacheMap = {};

        if(!term)
            return "";

        var document;


        if(term && (typeof(term)==='string')){
    
            term = { identifier : term };
            if(cacheMap[term.identifier])
                return cacheMap[term.identifier] ;
            //'include-deleted':true,           
            document =  await kmDocumentApi.getDocument(term.identifier);     
          
        }
        // else if(term && ( typeof term === 'object' && term !== null)){

        //     document = term.info && term.info.metadata ? term.info : term;

        //     var revision = ''
        //     if(document.revision)
        //         revision = '-' + document.revision;
        //     var identifier = '';
        //     if(term.identifier)
        //         identifier = term.identifier;
        //     else if(document.identifier)
        //         identifier = document.identifier;
        //     else if(document.data && document.data.identifier)
        //         identifier = document.data.identifier;
        //     else if(document.id)
        //         identifier = document.id;

        //     if(identifier == '')
        //         return;
            
        //     if( document.documentID === undefined && !document.id)
        //         revision = "DRAFT";

        //     term = { identifier : identifier + revision};

        //     if(cacheMap[term.identifier]){
        //             return cacheMap[term.identifier] ;
        //     }
        // }

        if(!document)
            return;

        // cacheMap[term.identifier] = Promise.resolve(document).then(document => {
 
            var isDeletedRecord = document.deletedOn!=null;
            
            if(document.data)
                document = document.data;
            else
                document = document;

            let government = '';
            let uIdPrefix	= realm.uIdPrefix;
            let documentId;

            console.log("document", document);

            // if(document.documentID)
            //     documentId = document.documentID;
            // else if(document.id){

            //     if(document.id.indexOf('_')>0)
            //         documentId = hexToInteger(document.id.substr(0,document.id.indexOf('_')));
            //     else
            //         documentId = hexToInteger(document.id);
            // }

            if(document.documentID)
                documentId = document.documentID;
            else if(document.header.identifier){

                if(document.header.identifier.indexOf('_')>0)
                    documentId = hexToInteger(document.header.identifier.substr(0,document.header.identifier.indexOf('_')));
                else
                    documentId = hexToInteger(document.header.identifier);
            }
          
            console.log(documentId)
            if(documentId === undefined)
                documentId = "DRAFT";

            if(document.government_s)
                government = document.government_s;
            else if(document.government)
                government = document.government.identifier;
            else if(document.metadata && document.metadata.government)
                government = document.metadata.government;
            else if(document.body && document.body.government)
                government = document.body.government.identifier;

            if(document.type == 'focalPoint')
                uIdPrefix = 'CHM';
                
            var unique = uIdPrefix +
                        '-' + schemaShortName(document.type||document.schema_s||document.schema) +
                        '-' + (government != '' ?  government.toUpperCase : 'SCBD') +
                        '-' + documentId;

            if(document.revision === 'draft'){
                document.revision = "0";
            }

            if( document.revision)
                unique = unique + '-' + document.revision;

            if(isDeletedRecord)
                unique = '[DELETED] ' + unique;
                
            cacheMap[term.identifier] = unique;

            return unique;

        // }).catch(function(){

            // cacheMap[term.identifier] = term.identifier;

            // return term.identifier;

        // });
        cacheMap[term.identifier]= term.identifier;
        return cacheMap[term.identifier];
    };

    const  uniqueIDWithoutRevision = function (document ){
            var unique = uniqueID(document);			

            if ((typeof unique === 'string') && document){

				if(document.header && _.includes(scbdSchemas, document.header.schema))
					return unique;

				return unique.substring(0,unique.lastIndexOf('-'));
			}	
            return '';

		};

    function schemaShortName(schema) {
        if(!schema)
        return schema;

        var result = (realm.schemas[schema]||{}).shortCode;

        return result || (scbdSchemaDetails[schema]||{}).shortCode || schema;
        }


    function hexToInteger(hexString) {
        // Remove any leading '0x' or '0X' prefix
        hexString = hexString.replace(/^0x|^0X/, '');

        // Use parseInt with radix 16 to convert hex to integer
        return parseInt(hexString, 16);
    }


</script>