define(['app', '/app/js/common.js',
    '/app/views/register/directives/register-top-menu.js', 'ngDialog',
'/app/views/register/user-preferences/user-search-filter.js'
], function (app) {
    app.controller('userPreferencesCtrl', ['$scope', '$http', '$timeout', '$element', 'ngDialog', '$routeParams',
        function ($scope, $http, $timeout, $element, ngDialog, $routeParams) {
            
            $scope.api = {};
            var recordId='';
            if($routeParams.id){
                recordId = '/' + $routeParams.id;
            }
            $scope.delete = function(evt, record){
                
                evt.stopPropagation();
                ngDialog.open({
                                template : 'confirmDeleteDialog',
                                controller : ['$scope', '$http', function($scope, $http){
                                        
                                        $scope.record = record;

                                        $scope.confirmDelete = function(){
                                            $scope.loading = true;                                            
                                            $http.delete('/api/v2015/report-records/' + $scope.record._id)
                                            .then(function () {
                                                removeRecord();
                                                $scope.closeDialog();
                                            });
                                        }
                                        $scope.closeDialog = function(){
                                            ngDialog.close();                                            
                                        }

                                }]
                              })
                function removeRecord(){
                    $scope.reportRecords.splice($scope.reportRecords.indexOf(record), 1);;
                }
            }
        }]
    );

});
