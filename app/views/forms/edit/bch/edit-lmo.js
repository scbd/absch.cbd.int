define(['app', 'lodash', 'views/forms/edit/edit', 'services/thesaurus-service','views/forms/directives/lmo-construct',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-lmo.directive", 'ngDialog'], 
function (app, _) {

	app.controller("editLmo", ["$scope", "$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService", 'ngDialog', '$element', '$compile',
	function($scope, $routeParams, $route, Thesaurus, $q, $controller, thesaurusService, ngDialog, $element, $compile) {
		
		$scope.traits = {
			'81799D15-669E-4346-9AEC-6834893D2BE4':[],
			'0C74FEB2-78E8-4163-81EF-2D410FB2FBBC':[],
			'87D98E42-4757-42DE-9C3F-815BFAA35218':[],
			'31396BD1-9E3E-4EB3-A29E-9A22B7230221':[],
			'337747E5-522D-42DF-8C57-FE626C1572EC':[],
			'3B427EA6-5260-47F1-B424-FAAA5960FB52':[],
			'5B9DB3B4-90A1-451A-A10C-E3A47995344F':[],
			'C8C662E2-D633-4C69-96EA-C9853997A3A5':[],
			'traitsOtherSection'				  :[]
		}
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
		
		$scope.setDocument({}, true).then(function(doc){			
			var traitsIds = _.map(doc.traits, 'identifier');
			_.each($scope.traits, function(trait, key){
				if(key!='traitsOtherSection'){
					$q.when($scope.options.traits(key)).then(function(traitsTerms){						
						traitsTerms = _(traitsTerms).map('identifier').without('5B6177DD-5E5E-434E-8CB7-D63D67D5EBED').value();

						$scope.traits[key] = _(traitsTerms).intersection(traitsIds).map(function(id){ return _.find(doc.traits, {identifier:id}); }).value();
						
						// when the parent key matches identifiers its for other custom value, 
						// use filter as there can be multiple others
						if(_.includes(traitsIds, key)){ 
							$scope.traits[key] = _(doc.traits).filter({identifier:key})
												.map(function(t){return {identifier:'5B6177DD-5E5E-434E-8CB7-D63D67D5EBED', customValue:t.customValue}})
												.union($scope.traits[key]||[])
												.value();
						}
					});
				}
				else{
					$q.when($scope.options.traitsOtherSection()).then(function(terms){
						var traitsOtherTerms = _.map(terms, 'identifier');				
						$scope.traits['traitsOtherSection'] =  _(doc.traits)
																.filter(function(t){ return _.includes(traitsOtherTerms, t.identifier) })
																.map(function(t){
																	return {identifier:t.identifier, customValue:t.customValue}
																})
																.value();
					});
				}
			});
		});

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

   }]);

});
