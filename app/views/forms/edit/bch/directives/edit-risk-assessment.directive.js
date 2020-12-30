define(['app', 'lodash', 'text!./edit-risk-assessment.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-risk-assessment.directive"], 
function (app, _, template) {

	app.directive("editRiskAssessment", ["$controller", "thesaurusService", "$routeParams", function($controller, thesaurusService, $routeParams) {
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

   }]);

});
