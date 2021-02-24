import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-risk-assessment.directive.html';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/edit/document-selector';
import "views/forms/view/bch/view-risk-assessment.directive";

	var riskAssessmentDirective = ["$controller", "thesaurusService", "$routeParams", function($controller, thesaurusService, $routeParams) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){

				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;    
				$scope.isNational = $routeParams.isNational;
		
				$controller('editController', {
					$scope: $scope
				});

				_.extend($scope.options, {

					riskAssessmentScope: function() {
						return thesaurusService.getDomainTerms('riskAssessmentScope', {other:true, otherType:'lstring'});
					}
					
				});

				$scope.onBuildQuery = function(searchText, schema){
					var queryOptions = {
						schemas	  : [schema],
						searchText: searchText
					}
					if($scope.document != undefined && $scope.document.government != undefined && $scope.document.government.identifier != undefined){
						queryOptions.government = $scope.document.government.identifier;
					}

					if( $scope.document != undefined && $scope.document.header != undefined && $scope.document.header.identifier != undefined){
						queryOptions.identifier = $scope.document.header.identifier;
					}

					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}

				//==================================
				//
				//==================================
				$scope.getCleanDocument = function(document) {

					document = document || $scope.document;

					if (!document)
						return undefined;

					if(!$scope.isNational && document.government){
						document.government = undefined;
					}

					if(!document.isForCommercialUse){
						document.forwardToOECD = undefined;
						document.isForFoodSafety = undefined;
						document.codexConduted = undefined;
						document.forwardToFAO = undefined;
					}

					if(!document.isForFoodSafety){
						document.codexConduted = undefined;
						document.forwardToFAO = undefined;
					}

					if (/^\s*$/g.test(document.notes))
						document.notes = undefined;

					return $scope.sanitizeDocument(document);
				};
				
				$scope.setDocument({});


			}
		}
	}];
	   
	app.directive("editRiskAssessment", 			riskAssessmentDirective);
	app.directive("editNationalRiskAssessment", 	riskAssessmentDirective);
	app.directive("editIndependentRiskAssessment", 	riskAssessmentDirective);

