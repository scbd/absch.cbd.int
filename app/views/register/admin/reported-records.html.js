define(['app', '/app/js/common.js',
    '/app/views/forms/view/record-loader.directive.html.js',
    '/app/views/register/directives/register-top-menu.js', 'ngDialog'
], function (app) {
    app.controller('adminReportedRecordsCtrl', ['$scope', '$http', '$timeout', '$element', 'ngDialog',
        function ($scope, $http, $timeout, $element, ngDialog) {
            
            
            $http.get('/api/v2015/report-records')
                .then(function (data) {
                    $scope.reportRecords = data.data
                });

            $scope.api = {};
            
            $scope.loadDocumentDetails = function (showDoc, record) {
                if (showDoc) {
                    $timeout(function () {
                        $scope.api.recordLoaderApi.loadDocument(record.schema, record.identifier);
                    }, 10);
                }
            };
          
            $scope.viewHistory = function(evt, record){
                    console.log(evt)
                    evt.stopPropagation()
                    record.showHistory = !record.showHistory;

                    if(record.showHistory){
                        $http.get('/api/v2015/report-records/' + record._id)
                        .then(function (data) {
                            record.history = data.data.history
                        });
                    } 
            };
            $scope.addComments = function(evt, record){
                console.log(evt)
                evt.stopPropagation()
                var recordCopy = angular.copy(record);
                ngDialog.open({
                                template : 'addCommentsDialog',
                                controller : ['$scope', '$http', function($scope, $http){
                                        recordCopy.status = undefined;
                                        recordCopy.comments = undefined;
                                        $scope.record = recordCopy;

                                        $scope.save = function(){
                                            $scope.loading = true;                                            
                                            $http.put('/api/v2015/report-records/' + $scope.record._id, $scope.record)
                                            .then(function (data) {
                                                record = data.data;
                                                $scope.closeDialog();
                                            });
                                        }
                                        $scope.closeDialog = function(){
                                            ngDialog.close();                                            
                                        }

                                }]
                              })
            } 
            
            $scope.delete = function(evt, record){
                console.log(evt)
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
