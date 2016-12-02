define(['app', 'underscore', './block-region-directive.js' ], function (app, _) {
        app.directive('reportRecord', function () {
                return {
                        restrict: 'EAC',
                        replace: true,
                        // transclude: true,
                        templateUrl: '/app/views/directives/report-record.html',
                        scope: {
                                uid: '@',
                                schema: '@'
                        },
                        link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

                        }]
                        , controller: ['$scope','$rootScope', '$q','$element','$http', '$filter', 'toastr', '$timeout', 'realm',
                                function ($scope, $rootScope, $q, $element, $http, $filter, toastr, $timeout, realm) {

                                $scope.showReport = true;
                                function init(){
                                    $scope.report = {};
                                    if($rootScope.user)
                                        $scope.report.reportedBy = $rootScope.user.email;
                                }

                                $scope.submitReport = function(report){
                                    report.schema = $scope.schema;
                                    report.identifier = $scope.uid;
                                    report.realm     = realm.value;
                                    $scope.loading = true;
                                    $http.post('/api/v2015/report-records', report)
                                    .then(function(data){
                                        $timeout(function(){//dont' know why
                                            var toast = toastr.success();
                                            toastr.clear(toast);
                                            toastr.success('Thank you for reporting on the record, the information was successfully sent to ABS-CH team.');
                                            console.log(toast);
                                            toastr.clear(toast);
                                        },50)
                                        //

                                        init();
                                        $scope.showReport = false;
                                        //$scope.showtoast(toast);
                                    })
                                    .finally(function(){
                                        $scope.loading = false;
                                    });
                                }
                                //
                                $scope.showtoast = function(toast){
                                    toastr.clear();
                                    toastr.success('Thank you for reporting on the record, the information was successfully sent to ABS-CH team.');
                                    //toastr.success('Record submmited')
                                }


                                init();
                        }]
                };

        });
});
