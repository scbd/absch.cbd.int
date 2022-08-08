import app from '~/app';
import { S4 } from '~/components/scbd-angularjs-services/services/utilities'
export { default as template } from './index.html';

export default ['$scope', '$routeParams', '$http', '$location', 'locale', 'localStorageService', 'realm', '$filter',
 function ($scope, $routeParams, $http, $location, locale, localStorageService, realm, $filter){

    const elementMapping = {
        'chm-document' : '#recordContent',
        'chm-search-result' : '#searchPage'
    }

    async function init(){

        const searchQuery  = $location.search();
        $scope.loading = true;
        
        try{
            if($routeParams.accessKey){
                let data;
                
                if($routeParams.accessKey == 'legacy-widget'){
                    const uniqueKey = `${$routeParams.accessKey}_${S4()}`
                    localStorageService.remove(`${uniqueKey}_obsoleteSchemas`);
                    localStorageService.remove(`${uniqueKey}`);

                    const realmSchemas = [...realm.nationalSchemas, ...realm.referenceSchemas, ...realm.scbdSchemas];
                    //old bch schema names were not case sensitive, find from realm
                    let schemas = searchQuery.schema;
                    if(typeof schemas == 'string')
                        schemas = [schemas];

                    if(!schemas?.length){
                        data = {
                            storageType : 'chm-search-result',
                            sharedData  : { 
                                realm : realm.value,
                                searchQuery : { 
                                    _id : `${uniqueKey}`,
                                    filters : [] 
                                } 
                            } 
                        };
                    }
                    else {
                                           
                        const obsoleteSchemas = [];
                        for (let i = 0; i < schemas.length; i++) {
                            let schemaName = schemas[i].toLowerCase();

                            if(isSchemaObsolete(schemaName)){
                                console.warn(`Schema is obsolete in new BCH, ${schemaName}`)
                                obsoleteSchemas.push(schemaName);
                            }
                            else{
                                schemaName         = legacyBchMapping(schemaName)
                                const realmSchema  = realmSchemas.find(e=>e.toLowerCase() == schemaName.toLowerCase())                    
                                const schema       = realm.schemas[realmSchema]
                                if(schema){
                                    data.sharedData.searchQuery.filters.push(
                                        {
                                            id: realmSchema,
                                            name: $filter('lstring')(schema.title, locale),
                                            otherType: schema.type,
                                            type: "schema"
                                        });
                                }
                            }

                            if(obsoleteSchemas.length)
                                localStorageService.set(`${uniqueKey}_obsoleteSchemas`, obsoleteSchemas);
                        }
                    

                        if(searchQuery.countries){
                            let countries = searchQuery.countries;
                            if(typeof countries == 'string')
                                countries = [countries]
                            for (let i = 0; i < countries.length; i++) {
                            
                                data.sharedData.searchQuery.filters.push({
                                    id: countries[i],
                                    name: countries[i],
                                    otherType: undefined,
                                    type: "country"
                                });                            
                            }
                        }
                    }                    
                }
                else{
                    data = (await $http.get(`/api/v2018/document-sharing/${$routeParams.accessKey}`)).data;
                }
                
                if(data.sharedData.realm != realm.value){
                    console.error('wrong realm for share id loaded')
                    return;
                }

                if(data.storageType == 'chm-document'){
                    safeapply(()=>{
                        $location.path(`/database/record/${data.sharedData.recordKey}`);
                    })
                }
                else if(data.storageType == 'chm-search-result'){
                    localStorageService.set(data.sharedData.searchQuery._id, data.sharedData?.searchQuery);
                    safeapply(()=>{

                        if($routeParams.accessKey == 'legacy-widget'){
                            $location.search('schema', undefined);
                            $location.search('countries', undefined);
                        }

                        $location.path(`/search`);
                        $location.search('searchShareQueryId', data.sharedData.searchQuery._id);
                    })
                }
                
            }
        }
        catch(err){
            console.log(err);
            $scope.error = 'There was an error loading this page. Please try again.'
        }
        finally{
            $scope.loading = false;
        }
    }
    function safeapply(fn) {
        ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
    } 
    
    function legacyBchMapping(schema){
        //lowercase because in legacy bch schema names were not case sensitive
        const schemaMapping = {
            "biosafetyexpert": "biosafetyExpert",
            "capacitybuildingneeds": "capacityBuildingInitiative",            
            "decision": "biosafetyDecision",
            "law": "biosafetyLaw",
            "nationaldatabase": "database",
            "news": "biosafetyNews",
            "riskassessment": "nationalRiskAssessment"            
        }

        return schemaMapping[schema] || schema;
    }

    function isSchemaObsolete(schema){
        const obsoleteSchemas = [
            "bibliographicreference",
            "biosafetyexpertassignment",
            "syntheticbiologyexpert",
            "cpbnews"
        ]

        return obsoleteSchemas.includes(schema);
    }
    // function registerIframeCommunication(selector){

    //     window.addEventListener('message', (evt)=>{
    //         console.log(evt);

    //         if(evt.data){
    //             const data = JSON.parse(evt.data);
    //             if(data.type == 'getClientHeight'){
    //                 var height = $(selector).height()+20;
    //                 data.height = height;
    //                 data.type = 'setClientHeight';
    //                 window.parent.postMessage(JSON.stringify(data), evt.origin);
    //             }
    //         }
    //     });
    // }

    function sendIframeCommunication(selector){
        var height = $(selector).height()+20;
        var data = {
            height : height,
            type : 'setClientHeight'
        }
        window.parent.postMessage(JSON.stringify(data), '*');
    }

    init()

}];