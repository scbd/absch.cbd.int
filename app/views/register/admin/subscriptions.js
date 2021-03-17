import app from 'app';
import _ from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'ngInfiniteScroll';
import 'moment';
import 'components/scbd-angularjs-controls/main';
import 'views/register/directives/register-top-menu';

        
        export { default as template } from './subscriptions.html';

  export default ["$scope", "$timeout", "IGenericService", "realm", "commonjs",
            function ($scope, $timeout, IGenericService, realm, commonjs) {
                $scope.filters = {systemAlert:false};
                var filterQuery = {             
                        "realm": realm.value ,
                        'isSystemAlert': $scope.filters.systemAlerts||false
                };
                
                $scope.length = 25;
                $scope.skip = 0;
                $scope.sort = { timestamp: -1 };
                
                
                $scope.loadSubscriptions = function (loadCount) {
                    if ($scope.loadingSubscriptions || $scope.skip > Math.ceil($scope.recordCount / $scope.length))
                        return;

                    $scope.loadingSubscriptions = true;
                    if(loadCount){
                         IGenericService.query('v2016', 'subscriptions', filterQuery, null, null, null, 1)
                                    .then(function (recordCount) {
                                        $scope.recordCount = recordCount.count;
                                    })
                    }
                    IGenericService.query('v2016', 'subscriptions', filterQuery, $scope.skip == 0 ? 0 : $scope.length * $scope.skip, $scope.length, $scope.sort)
                                    .then(function (subscriptions) {
                                        $scope.skip++;
                                        $scope.subscriptions = _.union($scope.subscriptions||[], subscriptions);
                                    })
                                    .finally(function(){ 
                                        $scope.loadingSubscriptions = false;
                                    });
                }
                

                $scope.$watch('filters', function(newVal){

                    var queries = { realm: realm.value }
                    if($scope.filters.endDate)
                        queries['meta.createdOn'] = { "$lte": moment(moment($scope.filters.endDate).format("YYYY-MM-DD")).toISOString() }
                    
                    if($scope.filters.startDate)
                        queries['meta.createdOn'] = { "$gte": moment(moment($scope.filters.startDate).format("YYYY-MM-DD")).toISOString() }
                    
                    if(!$scope.filters.systemAlerts)
                        queries['$or'] = [{ isSystemAlert : false},{ isSystemAlert :{$exists: false}}];

                    filterQuery = queries;
                    
                    $scope.subscriptions = [];
                    $scope.recordCount = 0;
                    $scope.length = 25;
                    $scope.skip = 0;
                    $scope.loadSubscriptions(true);
                }, true)
                
                $scope.loadSubscriptions(true);
                
            }];
    
