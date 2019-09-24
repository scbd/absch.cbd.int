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
			commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses', {other:true, otherType:'lstring', multiple:true}),
			traits			: function(parent){ 
				return $q.all([thesaurusService.getDomainTerms('dnaSequenceTraits'),thesaurusService.getDomainTerms('other')])
				.then(function(data){	
					var terms = [];
					_.each(data[0], function(d){
						 if( _.includes(d.broaderTerms, parent))
							 terms.push(d);
						else{
							var parentIds = _.map(terms,  'identifier')
							if(_.intersection(parentIds, d.broaderTerms).length)
								terms.push(d);
						}
					});

					var other = data[1];
					other.identifier = other.identifier;
					other.type = 'lstring';
					other.multiple=true;
					other.broaderTerms.push(parent);

					return _.union(terms, [other]);
				})
			},
			traitsOtherSection: function(){
				return $q.all([thesaurusService.getTerms('D39FE35E-8BFE-459C-B640-E70E00BC0D20'),thesaurusService.getDomainTerms('other')])
				.then(function(data){	
					var other = data[1];
					other.type = 'lstring';
					other.multiple=true;
					return [data[0], other];
				});
			}
		});
		
		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;
			
			traits = [];
			_.each($scope.traits, function(trait, key){
				if((trait||[]).length){
					_.each(trait, function(t){
						
						if(t.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED')
							traits.push(t)
						else if(t.customValue){
							//incase of traitsOtherSection its a custom section for one term and other terms for all of traits
							traits.push({
								identifier: key == 'traitsOtherSection' ? t.identifier : key, 
								customValue:t.customValue
							})
						}
					})
				}
			})
			traits = _.flatten(traits)
			if(traits.length==0)
				document.traits = undefined;
			else
				document.traits = traits;
			
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

   }]);

});
