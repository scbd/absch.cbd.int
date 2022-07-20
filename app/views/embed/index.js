import app from 'app';

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
                    const realmSchemas = [...realm.nationalSchemas, ...realm.referenceSchemas, ...realm.scbdSchemas];
                    //old bch schema names were not case sensitive, find from realm
                    const realmSchema  = realmSchemas.find(e=>e.toLowerCase() == searchQuery.schema.toLowerCase())                    
                    const schema       = realm.schemas[realmSchema]

                    data = {
                        storageType : 'chm-search-result',
                        sharedData  : { 
                            realm : realm.value,
                            searchQuery : { 
                                _id : `${$routeParams.accessKey}_${realmSchema}`,
                                filters : [{
                                    id: realmSchema,
                                    name: $filter('lstring')(schema.title, locale),
                                    otherType: schema.type,
                                    type: "schema"
                                }] 
                            } 
                        } 
                    };
                    if(searchQuery.countries && searchQuery.countries != '*'){
                        const countries = searchQuery.countries.split(/\s/g);
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
                window.scbdEmbedData = {
                    selector : elementMapping[data.storageType]
                }

                if(data.storageType == 'chm-document'){
                    safeapply(()=>{
                        $location.path(`/database/record/${data.sharedData.recordKey}`);
                    })
                }
                else if(data.storageType == 'chm-search-result'){
                    localStorageService.set(data.sharedData.searchQuery._id, data.sharedData.searchQuery);
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
        }
        finally{
            $scope.loading = false;
        }
    }
    function safeapply(fn) {
        ($scope.$$phase || $scope.$root.$$phase) ? fn() : $scope.$apply(fn);
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