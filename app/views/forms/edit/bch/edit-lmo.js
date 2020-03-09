define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service','views/forms/directives/lmo-construct',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-lmo.directive", 'ngDialog', 'views/forms/directives/traits-selector.directive'], 
function (app, _) {

	app.controller("editLmo", ["$scope", "$http", "$route", "Thesaurus", "$q", "$controller", "thesaurusService", 'ngDialog', '$element', '$compile',
	function($scope, $http, $route, Thesaurus, $q, $controller, thesaurusService, ngDialog, $element, $compile) {
		
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
			
			if((document.traits||[]).length == 0)
				document.traits = undefined;
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

		$scope.onConstructChange = function(){
			var constructIds = _($scope.document.geneConstructs).flatten().compact().value();

			if(constructIds.length>0 && !$scope.document.genes)
				$scope.document.genes = [];
			
			_.each(constructIds, function(cons){
				if(!_.find($scope.document.genes, {identifier: cons.identifier}))
					$scope.document.genes.push({ identifier:cons.identifier })
			});
			
		}

		$scope.lookupDetections = function(uniqueIdentifier){
			if(!uniqueIdentifier)
				return;

			$scope.lookingupDetections =true

			$http.get('http://localhost:8000/api/v2020/bch/lmo-detection-methods/'+uniqueIdentifier)
			.then(function(result){
				if(result.data){
					var exists = _.find($scope.document.detectionMethodLinks, {url: decodeURIComponent(result.data.url)})
					if(!exists){
						var newMethods = angular.copy($scope.document.detectionMethodLinks||[]);
						$scope.document.detectionMethodLinks = undefined;
						newMethods.push({
							url:result.data.url, 
							name: uniqueIdentifier + ' - EU Reference Laboratory for GM Food and Feed (EURL-GMFF)',
							language: 'lang-en'
						});
						$scope.document.detectionMethodLinks = newMethods;
					}
					//
				}
			})
			.finally(function(){
				$scope.lookingupDetections = false;
			})
		}

   }]);

});
