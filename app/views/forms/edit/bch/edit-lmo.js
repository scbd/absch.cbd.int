define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service','views/forms/directives/lmo-construct',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-lmo.directive", 'ngDialog', 'views/forms/directives/traits-selector.directive'], 
function (app, _) {

	app.controller("editLmo", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService", 'ngDialog', '$element', '$compile',
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService, ngDialog, $element, $compile) {
		
		$controller('editController', {
			$scope: $scope
		});

		_.extend($scope.options, {		
			techniqueUsed	: thesaurusService.getDomainTerms('techniqueUsed', 		{other:true, otherType:'lstring', multiple:true}),
			commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses', {other:true, otherType:'lstring', multiple:true})			
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

		$scope.onConstructChange = function(){
			var constructIds = _($scope.document.geneConstructs).flatten().compact().value();

			if(constructIds.length>0 && !$scope.document.genes)
				$scope.document.genes = [];
			
			_.each(constructIds, function(cons){
				if(!_.find($scope.document.genes, {identifier: cons.identifier}))
					$scope.document.genes.push({ identifier:cons.identifier })
			});
			
		}

   }]);

});
