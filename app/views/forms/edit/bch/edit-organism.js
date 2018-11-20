define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-organism.directive"], 
function (app, _) {

	app.controller("editOrganism", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
		
		$scope.scientificNameSynonyms = [{}];
		$scope.commonNames = [{}];

		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {	
			organismType 	: thesaurusService.getDomainTerms('typeOfOrganisms'),	
			domestication 	: thesaurusService.getDomainTerms('domestication'),	
			commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses'),	
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

			if(!_.isEmpty($scope.scientificNameSynonyms))
				document.scientificNameSynonyms = _($scope.scientificNameSynonyms).pluck('value').compact().value();
			if(_.isEmpty(document.scientificNameSynonyms))
				document.scientificNameSynonyms = undefined;


			if(!_.isEmpty($scope.commonNames))
				document.commonNames = _($scope.commonNames).pluck('value').compact().value();
			if(_.isEmpty(document.commonNames))
				document.commonNames = undefined;

			return document;
		};
		
		$q.when($scope.setDocument({}, true))
		.then(function(doc){
			if(doc.scientificNameSynonyms)
				$scope.scientificNameSynonyms = _.map(doc.scientificNameSynonyms, function(t){return { value: t}});
			if(doc.commonNames)
				$scope.commonNames = _.map(doc.commonNames, function(t){return { value: t}});
				
		});

   }]);

});
