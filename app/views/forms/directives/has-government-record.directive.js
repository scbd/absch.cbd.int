import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import '~/components/scbd-angularjs-services/main';
import template from './has-government-record.directive.html';
//import hasGovernmentRecordT from '~/app-text/views/forms/directives/has-government-record.json';
import 'ngDialog';

app.directive("hasGovernmentRecord", ['IStorage', '$routeParams', 'realm', "$timeout", "$q", 'ngDialog', 'translationService',
    function (storage, $routeParams, realm, $timeout, $q, ngDialog, translationService) {

        return {
            template: template,
            restrict: "EAC",
            replace: true,
            transclude: false,
            scope: {
                governmentId: '=',
				schemaName: "="
            },
            link: function ($scope) {
                //translationService.set('hasGovernmentRecordT', hasGovernmentRecordT);
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
                        var schemaName = $scope.schemaName ;
        
                        if (((published || draft) && (!$routeParams.identifier || $routeParams.identifier != (draft||published).identifier))) {
                            $scope.blockEditForm = true;
                            ngDialog.open({
                                template: 'recordExistsTemplate.html',													
                                closeByDocument: false,
                                closeByEscape: false,
                                showClose: false,
                                closeByNavigation: false,
                                controller: ['$scope', '$timeout', 'realm', '$location', function($scope, $timeout, realm, $location) {
                                    $scope.alertSeconds = 10;
                                    $scope.schemaTitle = realm.schemas[schemaName].title.en; // ToDo: translation
                                    var shortCode = realm.schemas[schemaName].shortCode
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
                                        $location.path(`register/${shortCode}/` + (draft||published).identifier+'/edit');
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