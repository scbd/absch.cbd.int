define(['app', 'text!views/directives/report-record.html', 'underscore', './block-region-directive' ], function (app, template, _) {
        app.directive('reportRecord', function () {
                return {
                        restrict: 'EAC',
                        replace: true,
                        // transclude: true,
                        template: template,
                        scope: {
                                uid: '@',
                                schema: '@'
                        },
                        link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

                        }]
                        , controller: ['$scope','ngDialog','$rootScope', '$q','$element','$http', '$filter', 'toastr', '$timeout', 'realm',
                                function ($scope, ngDialog, $rootScope, $q, $element, $http, $filter, toastr, $timeout, realm) {

                                $scope.isBCH = realm.is('BCH');
                                $scope.isABS = realm.is('ABS');
                                function init(){
                                    $scope.report = {};
                                    if($rootScope.user)
                                        ngDialog.open({
                                            template: 'divReportRecordDiaglog',
                                            className: 'ngdialog-theme-default',
                                            scope: $scope
                                        });
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

                                        ngDialog.close();
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

                                $scope.cancelReport = function(){
                                    ngDialog.close();
                                }
                                init();
                        }]
                };

        });
});
