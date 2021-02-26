define(['app', 'text!./report-record.html', 'views/directives/block-region-directive', 'ngDialog' ], function (app, template) {
        app.directive('reportRecord', ['ngDialog','$rootScope', '$http', 'toastr', 'realm', 
            function (ngDialog, $rootScope, $http, toastr, realm) {
                return {
                        restrict: 'EAC',
                        replace: true,
                        template: template,
                        scope: {
                            uid: '@',
                            schema: '@',
                            title:'@'
                        },
                        link: function ($scope) {

                                $scope.isBCH = realm.is('BCH');
                                $scope.isABS = realm.is('ABS');                                

                                $scope.submitReport = function(report){
                                    $scope.showError = false;
                                    if(report.incorrect == undefined && report.broken == undefined && report.copyright == undefined && 
                                        (report.additionalInformation == undefined || report.additionalInformation == '')){
                                        $scope.showError = true;
                                        return;
                                    }
                                    report.schema = $scope.schema;
                                    report.identifier = $scope.uid;
                                    report.realm     = realm.value;
                                    $scope.loading = true;
                                    $http.post('/api/v2015/report-records', report)
                                    .then(function(data){
                                        toastr.success('Thank you for reporting on the record, the information was successfully sent to Clearing-House team.');
                                        ngDialog.close();
                                    })
                                    .finally(function(){
                                        $scope.loading = false;
                                    });
                                }

                                $scope.cancelReport = function(){
                                    ngDialog.close();
                                }

                                $scope.showReportRecordDialog = function(){

                                    if ($rootScope.user && !$rootScope.user.isAuthenticated) {
                                        var signInEvent = $scope.$on('signIn', function () {
                                            $scope.showReportRecordDialog();
                                            signInEvent();
                                        });
                                        $('#loginDialog').modal("show");
                                        $('#loginDialog').on('hidden.bs.modal', function () {
                                            signInEvent();
                                        });
                                    } 
                                    else{
                                        $scope.report = {
                                            reportedBy : $rootScope.user.email
                                        };
                                        if($rootScope.user){
                                            ngDialog.open({
                                                template: 'divReportRecordDiaglog',
                                                className: 'ngdialog-theme-default wide',
                                                scope: $scope
                                            });
                                        }
                                    }
                                        
                                }
                        }
                };            
        }]);
});
