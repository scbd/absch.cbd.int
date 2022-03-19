import as from '~/app'
import 'components/scbd-angularjs-services/main';

export { default as template } from './draft-document-pdf-link.html'
export default ["$scope", "$http", "$q", "$location", '$sce', 'locale', '$route', 'realm', '$timeout',
    function ($scope, $http, $q, $location, $sce, locale, $route, realm, $timeout) {

        var uniqueId = $route.current.params.documentId;
        var language = ($route.current.params.lang||$location.search()?.lang||''); 

        function getPdfLink(){
            //15 minute expiry
            var document = {
                storageType : "km-document",
                expiry      : new Date(new Date().getTime()+(60*60*1000)),
                sharedData  : { "identifier": uniqueId },
                sharedWith  : { "link" : true },
                forPdf      : true
            }             

            $scope.status = "creatingLink";
            return $q.when($http.post('/api/v2018/document-sharing', document))
            .then(function(response){
                var id= response.data.id;
                return $q.when($http.get('/api/v2018/document-sharing/'+id))
                        .then(function(result){                          
                            $location.url('/pdf/draft-documents/'+uniqueId + '/'+ 
                                            result.data.urlHash +
                                            `?lang=${language}`+
                                            (language ? '': 'mixLocale=true&shareId='+id))
                        })
            });
        }

        getPdfLink();

}]