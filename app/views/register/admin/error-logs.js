define(['app', 'underscore', 'components/scbd-angularjs-services/services/generic-service', 'js/common', 'ngInfiniteScroll', 'moment', 'components/scbd-angularjs-controls/form-control-directives/all-controls',
    'views/register/directives/register-top-menu',
    ], function (app, _) {

        "use strict";
        app.controller("adminErrorLogsCotroller", ["$scope", "$timeout", "IGenericService", "realm", "commonjs",
            function ($scope, $timeout, IGenericService, realm, commonjs) {
                $scope.filters = {};
                var filterQuery = {
                    $and: [                        
                        { "realm": realm.value },
                        { timestamp: { "$gte": moment().subtract(1, "weeks").toISOString() } }
                    ]
                };
                
                $scope.length = 25;
                $scope.skip = 0;
                $scope.sort = { timestamp: -1 };
                
                
                $scope.loadErrors = function (loadCount) {
                    if ($scope.loadingErrors || $scope.skip > Math.ceil($scope.recordCount / $scope.length))
                        return;

                    $scope.loadingErrors = true;
                    if(loadCount){
                         IGenericService.query('v2016', 'error-logs', filterQuery, null, null, null, 1)
                                    .then(function (recordCount) {
                                        $scope.recordCount = recordCount.count;
                                    })
                    }
                    IGenericService.query('v2016', 'error-logs', filterQuery, $scope.skip == 0 ? 0 : $scope.length * $scope.skip, $scope.length, $scope.sort)
                                    .then(function (errors) {
                                        $scope.skip++;
                                        $scope.errors = _.union($scope.errors||[], errors);
                                    })
                                    .finally(function(){ 
                                        $scope.loadingErrors = false;
                                    });
                }
                

                $scope.$watch('filters', function(newVal){

                    var queries = [ 
                                    { realm: realm.value }
                                  ]
                    if($scope.filters.endDate)
                        queries.push({ timestamp: { "$lte": moment(moment($scope.filters.endDate).format("YYYY-MM-DD")).toISOString() } })
                    
                    if($scope.filters.startDate)
                        queries.push({ timestamp: { "$gte": moment(moment($scope.filters.startDate).format("YYYY-MM-DD")).toISOString() } })
                    
                    filterQuery.$and = queries;
                    
                    $scope.errors = [];
                    $scope.recordCount = 0;
                    $scope.length = 25;
                    $scope.skip = 0;
                    $scope.loadErrors(true);
                }, true)
                
                $scope.loadErrors(true);
                
                $scope.getGitHash = function(appVersion){
                    if(appVersion.indexOf('-')>=0)
                        return appVersion.split('-')[1];
                    
                    return appVersion;
                }
            }]);
    });
