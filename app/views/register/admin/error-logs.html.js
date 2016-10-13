define(['app', 'underscore', 'scbd-angularjs-services/generic-service', '/app/js/common.js', 'ngInfiniteScroll', 'moment', 'scbd-angularjs-controls',
    '/app/views/register/directives/register-top-menu.js',
    ], function (app, _) {

        "use strict";
        app.controller("adminErrorLogsCotroller", ["$scope", "$timeout", "IGenericService", "realm", "commonjs",
            function ($scope, $timeout, IGenericService, realm, commonjs) {
                $scope.filters = {};
                var filterQuery = {
                    $and: [                        
                        { "realm": realm.value },
                        // { createdOn: { "$gte": moment().subtract(12, "weeks").toISOString() } }
                    ]
                };
                

                $scope.errors = null;
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
                                        $scope.errors = [];
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
                

                $scope.$watch('filters', function(old, newVal){

                    var queries = [ 
                                    { realm: realm.value }
                                  ]
                    if($scope.filters.endDate)
                        queries.push({ createdOn: { "$lte": moment(moment($scope.filters.endDate).format("YYYY-MM-DD")).toISOString() } })
                    
                    if($scope.filters.startDate)
                        queries.push({ createdOn: { "$gte": moment(moment($scope.filters.startDate).format("YYYY-MM-DD")).toISOString() } })
                    
                    filterQuery.$and = queries;
                    console.log(filterQuery);
                    $scope.recordCount = 0;
                    $scope.length = 25;
                    $scope.skip = 0;
                    $scope.loadErrors(true);
                }, true)
                

            }]);
    });
