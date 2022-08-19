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
                                        
                    const obsoleteSchemas = [];
                    for (let i = 0; i < schemas.length; i++) {
                        let schemaName = schemas[i].toLowerCase();

                        if(isSchemaObsolete(schemaName)){
                            console.warn(`Schema is obsolete in new BCH, ${schemaName}`)
                            obsoleteSchemas.push(schemaName);
                        }
                        else{
                            const subFilters   = legacyBchSchemaSubFilterQuery(schemaName);
                            schemaName         = legacyBchMapping(schemaName)
                            const realmSchema  = realmSchemas.find(e=>e.toLowerCase() == schemaName.toLowerCase())                    
                            const schema       = realm.schemas[realmSchema]
                            if(schema && !data.sharedData.searchQuery.filters.find(e=>e.id == realmSchema)){
                                data.sharedData.searchQuery.filters.push(
                                    {
                                        id: realmSchema,
                                        name: $filter('lstring')(schema.title, locale),
                                        otherType: schema.type,
                                        type: "schema"
                                    });
                                if(subFilters){
                                    data.sharedData.searchQuery.subFilters =  data.sharedData.searchQuery.subFilters || {};
                                    data.sharedData.searchQuery.subFilters[realmSchema] = subFilters;
                                }
                            }
                        }
                    }
                
                    if(obsoleteSchemas.length)
                        localStorageService.set(`${uniqueKey}_obsoleteSchemas`, obsoleteSchemas);

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
            "biosafetyexpert"      : "biosafetyExpert",
            "capacitybuildingneeds": "capacityBuildingInitiative",
            "decision"             : "biosafetyDecision",
            "decisionunderaia"     : "biosafetyDecision",
            "decisionundera11"     : "biosafetyDecision",
            "decision"             : "biosafetyDecision",
            "law"                  : "biosafetyLaw",
            "nationaldatabase"     : "database",
            "news"                 : "biosafetyNews",
            "riskassessment"       : "nationalRiskAssessment",
            "nationalreport0"      : "cpbNationalReport0",
            "nationalreport1"      : "cpbNationalReport1",
            "nationalreport2"      : "cpbNationalReport2",
            "nationalreport3"      : "cpbNationalReport3"
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

    function legacyBchSchemaSubFilterQuery(schema){
        const queryMapping = {
            decisionunderaia : [{ 
                schema  : 'biosafetyDecision',
                field   : 'decisionTypes_ss', 
                selectedItems   : {
                    'E8C5A15C-A736-4fb7-A1B6-192412BE7E45' : { identifier:'E8C5A15C-A736-4fb7-A1B6-192412BE7E45'},
                    'A0F944AD-1578-47F4-BB71-A9805EC0EB7A' : { identifier:'A0F944AD-1578-47F4-BB71-A9805EC0EB7A'},
                    '47B66371-7016-4F28-B33A-0DBFF43581CA' : { identifier:'47B66371-7016-4F28-B33A-0DBFF43581CA'},
                }
            }],
            decisionundera11 : [{ 
                schema  : 'biosafetyDecision',
                field   : 'decisionTypes_ss', 
                selectedItems   : {
                    'BE64016A-C3BD-4C61-9620-C3FEF96B2A24' : { identifier : 'BE64016A-C3BD-4C61-9620-C3FEF96B2A24'}, 
                    '0D0BEEF4-54E4-44C1-ABB2-B89DC145E0B3' : { identifier : '0D0BEEF4-54E4-44C1-ABB2-B89DC145E0B3'}, 
                    'C15E5CD8-B6F9-41AE-A09C-7EF5F73B0507' : { identifier : 'C15E5CD8-B6F9-41AE-A09C-7EF5F73B0507'}, 
                }
            }],
            decision : [{ 
                schema  : 'biosafetyDecision',
                field   : 'decisionTypes_ss', 
                selectedItems   : {
                    '8979219B-330B-424F-A52C-209D4B4B65C0' : { identifier : '8979219B-330B-424F-A52C-209D4B4B65C0'},
                    '1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8' : { identifier : '1B6F702C-0C68-4B53-BCA4-1DA4A25E23A8'},
                    'D698B5F7-A434-49E2-A7FF-FE869AFBEE8D' : { identifier : 'D698B5F7-A434-49E2-A7FF-FE869AFBEE8D'},
                    '83C0DBFB-AD5C-4B88-8ECE-5365991F2956' : { identifier : '83C0DBFB-AD5C-4B88-8ECE-5365991F2956'},
                    '3FF9FEB3-20FA-4287-B562-46635A1154A3' : { identifier : '3FF9FEB3-20FA-4287-B562-46635A1154A3'},
                    '3293477D-466D-40CB-A890-4B139BCE93AC' : { identifier : '3293477D-466D-40CB-A890-4B139BCE93AC'},
                    '0C9BBC54-34F1-431A-A579-F018D8E5CEAD' : { identifier : '0C9BBC54-34F1-431A-A579-F018D8E5CEAD'},
                    '8E26ACCB-3358-4BC3-8389-56AA508991E6' : { identifier : '8E26ACCB-3358-4BC3-8389-56AA508991E6'},
                    'A8C8A4D9-8084-4F6E-88B7-47BA04075E40' : { identifier : 'A8C8A4D9-8084-4F6E-88B7-47BA04075E40'},
                    '2C74A444-32C1-45B0-B1AC-F419773A4A7E' : { identifier : '2C74A444-32C1-45B0-B1AC-F419773A4A7E'},
                    '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' : { identifier : '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'},
                }
            }]
        }
        return queryMapping[schema];
    }
    

    init()

}];