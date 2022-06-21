import app from '~/app'
import 'views/forms/view/record-loader.directive';
import 'components/scbd-angularjs-services/main';
    
export {default as template } from './shared-document.html';
export default ['$scope', '$http', '$q', '$route', 'locale', '$location',
function($scope, $http, $q, $route, locale, $location){

    $scope.options = { locale : locale, currentDate : new Date()};
    var qs = $route.current.params;
    if(qs.code){
        $scope.status = 'loading'
        $q.when($http.get('/api/v2018/document-sharing/'+ qs.code))
            .then(function(result){
                
                if(result.status == 200){
                    $scope.sharedData = {...result.data};

                    if(['chm-search-result', 'chm-document', 'chm-country-profile'].includes($scope.sharedData.storageType)){
                        console.log('hi')
                        $location.url(`/share/${$scope.sharedData.shareType}/${$scope.sharedData.storageType}/${$scope.sharedData.shortUrlHash}`);
                        
                    }
                    else{
                        $scope.document = {...result.data.sharedData.document.body};
                        delete result.data.sharedData.document.body;
                        $scope.documentInfo = {...result.data.sharedData.document};
                        $scope.status = 'ready'
                    }
                }
            })
            .catch(function(error){
                $scope.status = 'error'
                $scope.error  = error.data;

                if(error.data.startsWith('The document was not shared with you')){
                    $location.search({ returnUrl: $location.url() });
                    console.log($location.url())
                    $location.path('/signin')
                }
            })
            .finally(function(){
            })
    }
    else{
        $scope.message = "missing code"
    }

    if(qs.print){
        $scope.printMode = true;
        $scope.options.locale = '*';
    }
}]