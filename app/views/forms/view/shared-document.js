import app from '~/app'
import 'views/forms/view/record-loader.directive';
import 'components/scbd-angularjs-services/main';
    
export {default as template } from './shared-document.html';
export default ['$scope', '$http', '$q', '$route', 'locale', 
function($scope, $http, $q, $route, locale){

    $scope.options = { locale : locale, currentDate : new Date()};
    var qs = $route.current.params;
    if(qs.code){
        $scope.status = 'loading'
        $q.when($http.get('/api/v2018/document-sharing/'+ qs.code))
            .then(function(result){
                
                if(result.status == 200){
                    $scope.sharedData = {...result.data};
                    $scope.document = {...result.data.sharedData.document.body};
                    delete result.data.sharedData.document.body;
                    // $scope.documentInfo = {...result.data.sharedData.document};
                    $scope.status = 'ready'
                    console.log('hello')
                }
            })
            .catch(function(error){
                $scope.status = 'error'
                $scope.error  = error.data;
            })
            .finally(function(){
            })
    }
    else{
        $scope.message = "missing code"
    }

    if(qs.print){
        $scope.printMode = true;
        $scope.options = { locale : '*'};
    }
}]