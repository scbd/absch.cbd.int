﻿import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import '~/components/scbd-angularjs-services/main';
import template from './has-government-record.directive.html';
import hasGovernmentRecordT from '~/app-text/views/forms/directives/has-government-record.json';
import 'ngDialog';

app.directive("hasGovernmentRecord", ["$http", 'IStorage', '$routeParams', "$timeout", "$q", 'guid', 'ngDialog', 'realm', 'translationService',
    function ($http, storage, $routeParams, $timeout, $q, guid, ngDialog, realm, translationService) {

        return {
            template: template,
            restrict: "EAC",
            replace: true,
            transclude: false,
            scope: {
                governmentId: '=',
				schemaName: "=",
                docType: "="
            },
            link: function ($scope, $timeout) {
                translationService.set('hasGovernmentRecordT', hasGovernmentRecordT);
				$scope.$watch('governmentId', function () {
                    verifyCountryHasReport($scope.governmentId)					 
				});

                function verifyCountryHasReport(governmentId){
                    $q.all([
                        storage.documents.query("(type eq '"+$scope.schemaName+"')", "my", {$top:10}),
                        storage.drafts.query("(type eq '"+$scope.schemaName+"')", {$top:10})
                    ])
                    .then(function(nationalRecords) {
                        var filterByGovernment = function(item){
                            return item && (item.metadata||{}).government == governmentId
                        }              
                        var published   = _.find((nationalRecords[0].data||{}).Items,  filterByGovernment);
                        var draft       = _.find((nationalRecords[1].data||{}).Items,  filterByGovernment);
        
                        if (((published || draft) && (!$routeParams.identifier || $routeParams.identifier != (draft||published).identifier))) {
                            $scope.blockEditForm = true;
                            ngDialog.open({
                                template: 'recordExistsTemplate.html',													
                                closeByDocument: false,
                                closeByEscape: false,
                                showClose: false,
                                closeByNavigation: false,
                                controller: ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
                                    $scope.alertSeconds = 10;
                                    time();
        
                                    function time(){
                                        $timeout(function(){
                                            if($scope.alertSeconds == 1){																	
                                                $scope.openExisting();
                                            }
                                            else{
                                                $scope.alertSeconds--;																
                                                time()
                                            }
                                        }, 1000)
                                    }
                                    $scope.openExisting = function() {
                                        ngDialog.close();
                                        $location.path(`register/${$scope.docType}/` + (draft||published).identifier+'/edit');
                                    }
                                }]
                            });
                        }
                        else{
        
                        }
                    });
                }
			}			 
		};
	
    }])