import as from '~/app'
import 'components/scbd-angularjs-services/main';

export { default as template } from './draft-document-pdf-link.html'
export default ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        var uniqueId = $route.current.params.documentId;
        var language = ($route.current.params.lang||$location.search()?.lang||''); 

        async function getPdfLink(){
            //60 minute expiry
            var document = {
                shareType   : "link",
                storageType : "km-document",
                expiry      : new Date(new Date().getTime()+(60*60*1000)),
                sharedData  : { "identifier": uniqueId, realm : realm.value },
                sharedWith  : { "link" : true },
                forPdf      : true
            }             

            $scope.status = "creatingLink";
            const response = (await $http.post('/api/v2018/document-sharing', document)).data
            const id       = response.id;
            
            const documentShare = (await $http.get('/api/v2018/document-sharing/'+id)).data
            const documentShareInfo = (await $http.get('/api/v2018/document-sharing/'+documentShare.urlHash)).data
                            // console.log(result);            
            let schema = documentShareInfo.sharedData?.document?.type || uniqueId  
            
            $location.url(`/pdf/draft-documents/${schema}/${documentShare.urlHash}?code=${documentShare.urlHash}&shareId=${id}&${(language ? `lang=${language}`: '&mixLocale=true')}`);

        }

        getPdfLink();

}]