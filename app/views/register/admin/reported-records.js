import app from '~/app';
import '~/services/main';
import '~/views/forms/view/record-loader.directive';
import '~/views/register/directives/register-top-menu';
import 'ngDialog';
import '~/components/scbd-angularjs-services/main';
    export { default as template } from './reported-records.html';
export default ['$scope', '$http', '$timeout', '$element', 'ngDialog', '$routeParams', 'IGenericService','realm', '$q',
        function ($scope, $http, $timeout, $element, ngDialog, $routeParams, IGenericService, realm, $q) {
            
            $scope.api = {};
            var recordId='';
            if($routeParams.id){
                recordId = '/' + $routeParams.id;
            }

            var operation 
            if(recordId)
                operation = IGenericService.get('v2015', 'report-records', recordId);
            else
                operation = IGenericService.query('v2015', 'report-records', {realm: realm.value});

            $q.when(operation)
              .then(function (data) {
                if($routeParams.id){
                    var record = data;
                    record.showDoc = true;
                    $scope.loadDocumentDetails(record.showDoc, record)
                    $scope.reportRecords = [record];                        
                }
                else
                    $scope.reportRecords = data
            });

            
            $scope.loadDocumentDetails = function (showDoc, record) {
                if (showDoc) {
                    $timeout(function () {
                        $scope.api.recordLoaderApi.loadDocument(record.schema, record.identifier);
                    }, 10);
                }
            };
          
            $scope.viewHistory = function(evt, record){
                    
                    evt.stopPropagation()
                    record.showHistory = !record.showHistory;

                    // if(record.showHistory){
                    //     $http.get('/api/v2015/report-records/' + record._id)
                    //     .then(function (data) {
                    //         record.history = data.data.history
                    //     });
                    // } 
            };
            $scope.addComments = function(evt, record){
                
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
        }];


