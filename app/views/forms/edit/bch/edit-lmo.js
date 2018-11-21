define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-lmo.directive"], 
function (app, _) {

	app.controller("editLmo", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
		
		
		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {		
			techniqueUsed	: thesaurusService.getDomainTerms('techniqueUsed'),
			commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses'),
			traits			: thesaurusService.getDomainTerms('dnaSequenceTraits')
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
		
		$scope.setDocument({}, true);

   }]);

});
