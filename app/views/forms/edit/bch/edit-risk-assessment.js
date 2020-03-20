define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-risk-assessment.directive"], 
function (app, _) {

	app.controller("editRiskAssessment", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
		
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

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

			return document;
		};
		
		$scope.setDocument({});

   }]);

});
