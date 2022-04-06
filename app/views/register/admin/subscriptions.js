import app from 'app';
import _ from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'moment';
import 'components/scbd-angularjs-controls/main';
import 'views/register/directives/register-top-menu';

        
export { default as template } from './subscriptions.html';

  export default ["$scope", "$timeout", "IGenericService", "realm", "commonjs", "$routeParams",
            function ($scope, $timeout, IGenericService, realm, commonjs, $routeParams) {

                $scope.filters = {systemAlert:false};
                var filterQuery = {             
                        "realm": realm.value ,
                        'isSystemAlert': $scope.filters.systemAlerts||false
                };
                
                $scope.itemsPerPage = 25;
                $scope.currentPage = 1;
                $scope.sort = { 'meta.modifiedOn': -1 };
                
                
                function loadSubscriptions(loadCount) {
                    if ($scope.loadingSubscriptions)
                        return;

                    if($routeParams.userId)
                        filterQuery['meta.createdBy'] = Number($routeParams.userId);

                    $scope.loadingSubscriptions = true;
                    if(loadCount){
                         IGenericService.query('v2016', 'subscriptions', filterQuery, null, null, null, 1)
                                    .then(function (recordCount) {
                                        $scope.recordCount = recordCount.count;
                                        $scope.pageCount = Math.ceil($scope.recordCount / $scope.itemsPerPage);
                                    })
                    }
                    IGenericService.query('v2016', 'subscriptions', filterQuery, ($scope.currentPage-1) == 0 ? 0 : $scope.itemsPerPage * ($scope.currentPage-1), $scope.itemsPerPage, $scope.sort)
                                    .then(function (subscriptions) {
                                        $scope.subscriptions = subscriptions;
                                    })
                                    .finally(function(){ 
                                        $scope.loadingSubscriptions = false;
                                    });
                }
                
                 //==============================================================
                $scope.confirmDelete = function (record) {
                     if($scope.deletingRecord)
                        return false;

                     if(confirm('Are you sure you want to unsubscribe the user from notifications')){
                        $scope.deletingRecord = record._id;
                        IGenericService.delete('v2016', 'subscriptions', record._id)
                        .then(function () {
                            $scope.subscriptions.splice($scope.subscriptions.indexOf(record), 1);
                        })
                        .finally(()=>$scope.deletingRecord = undefined);
                     }
                };

                $scope.onPageChange = function(page){
                    $scope.currentPage = page;
                    loadSubscriptions(false)
                }
                $scope.onPageSizeChanged = function(size){
                    $scope.itemsPerPage = size;
                    loadSubscriptions(false)
                }
                
        
                $scope.$watch('filters', function(newVal){

                    var queries = { realm: realm.value }
                    if($scope.filters.endDate)
                        queries['meta.createdOn'] = { "$lte": { $date : moment(moment($scope.filters.endDate).format("YYYY-MM-DD")).toISOString() }}
                    
                    if($scope.filters.startDate)
                        queries['meta.createdOn'] = { "$gte": { $date : moment(moment($scope.filters.startDate).format("YYYY-MM-DD")).toISOString() }}
                    
                    if(!$scope.filters.systemAlerts)
                        queries['$or'] = [{ isSystemAlert : false},{ isSystemAlert :{$exists: false}}];

                    filterQuery = queries;
                    
                    $scope.subscriptions = [];
                    $scope.recordCount = 0;
                    $scope.currentPage = 1;
                    loadSubscriptions(true);
                }, true)
                
                loadSubscriptions(true);
                
            }];
    
