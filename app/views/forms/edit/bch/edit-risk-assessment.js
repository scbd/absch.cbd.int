define(['app', 'lodash', './directives/edit-risk-assessment.directive'], 
function (app, _) {

	app.controller("editRiskAssessmentController", ["$scope", "$controller", function($scope, $controller) {
		
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
