define(['app', 'lodash', 'text!./edit-modified-organism.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service','./lmo-construct',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-lmo.directive", 'views/forms/directives/traits-selector.directive'], 
function (app, _, template) {

	app.directive("editModifiedOrganism", ["$http", "$controller", "thesaurusService", function($http, $controller, thesaurusService) {
		
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
					
					//temp
					if(document.hasUniqueIdentification==undefined && document.uniqueIdentification)
						document.hasUniqueIdentification = true;

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
						if(cons.identifier && !_.find($scope.document.genes, {identifier: cons.identifier}))
							$scope.document.genes.push({ identifier:cons.identifier })
					});
					
				}

				$scope.lookupDetections = function(){
					var uniqueIdentifier = $scope.document.uniqueIdentification;
					if(!uniqueIdentifier)
						return;

					$scope.lookingupDetections =true

					$http.get('/api/v2020/bch/lmo-detection-methods/'+uniqueIdentifier)
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
			}
		}

   }]);

});
