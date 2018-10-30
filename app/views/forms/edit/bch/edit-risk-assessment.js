define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-risk-assessment.directive"], 
function (app, _) {

	return ["$scope", "$http", "$filter", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $http, $filter, Thesaurus, $q, $controller, thesaurusService) {
	   	
		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {

			riskAssessmentScope: function() {
				return thesaurusService.getDomainTerms('riskAssessmentScope');
			}
			
		});
		
		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

			return document;
		};
		
		$scope.setDocument({});

   }];

});
