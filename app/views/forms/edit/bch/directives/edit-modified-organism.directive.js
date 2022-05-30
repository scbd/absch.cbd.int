import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-modified-organism.directive.html';
import 'views/forms/edit/edit';
import 'services/main';
import '~/views/forms/edit/bch/directives/lmo-construct';
import 'views/forms/edit/document-selector';
import "~/views/forms/view/bch/view-lmo.directive";
import '~/views/forms/directives/traits-selector.directive';
import '~/views/forms/directives/view-terms-hierarchy';
import { uniqIdentifiers } from '~/services/common'

	app.directive("editModifiedOrganism", ["$http", "$controller", "thesaurusService", 'IStorage', '$q', 'realm', 'solr', '$timeout',
		 function($http, $controller, thesaurusService, storage, $q, realm, solr, $timeout) {
		
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
				var oldGenes = [];
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;    
				$controller('editController', {
					$scope: $scope
				});

				$scope.externalLinks = []
				_.extend($scope.options, {
					techniqueUsed	: thesaurusService.getDomainTerms('techniqueUsed', 		{other:true, otherType:'lstring', multiple:true}),
					commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses', {other:true, otherType:'lstring', multiple:true})			
				});

				$scope.onContactQuery = function(searchText){

					var queryOptions = {
						realm     : realm.value,
						schemas	  : ['contact'],
						searchText: searchText
					}

					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}

				$scope.onRecipientOrganismsQuery = function(searchText){

					var queryOptions = {
						realm     : realm.value,
						schemas	  : ['organism', 'modifiedOrganism'],
						searchText: searchText
					}
					if($scope.document?.header?.identifier)
						queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}

				$scope.onBuildQuery = function(searchText, schemasVal){

					var queryOptions = {
						realm     : realm.value,
						schemas	  : [schemasVal],
						searchText: searchText
					}
					if(schemasVal=="modifiedOrganism" && $scope.document?.header?.identifier){
						queryOptions.fieldQueries = [`NOT identifier_s:${solr.escape($scope.document.header.identifier)}`];
                    }
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}
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

					document.genes = uniqIdentifiers(document.genes);

					return $scope.sanitizeDocument(document);
				};
				
				$scope.onModifiedGeneChange = function(genes){
					var geneIdentifiers = _.map(genes||[], 'identifier');
					var newGenes = _.filter(geneIdentifiers, function(identifier){ return !_.includes(oldGenes, identifier) });				
					
					if(newGenes.length){
						updateOldGenes($scope.document);
						$scope.loadingGeneTraits = true;
						var queries = _.map(newGenes, function(identifier){return loadReferenceDocument(identifier).then(function(result){return result.data;})});
						$q.all(queries)
						.then(function(documents){
							var newTraits = _(documents).map('body').map('traits').flatten().compact().flatten().uniq().value();
							if(newTraits.length){

								var newDocumentTraits = angular.copy($scope.document.traits||[]);
								_.forEach(newTraits, function(trait){
									if(trait.customValue || !_.find(newDocumentTraits, trait)){
										newDocumentTraits.push(trait);
									}
								})
								if(newDocumentTraits.length)
									$scope.document.traits = _.union($scope.document.traits, newDocumentTraits);
							}
						})
						.finally(function(){
							$scope.loadingGeneTraits = false;
						})
					}
				}

				$scope.onConstructChange = function(){
					var constructIds = _($scope.document.geneConstructs).flatten().compact().value();

					if(constructIds.length>0 && !$scope.document.genes)
						$scope.document.genes = [];
				
					_.forEach(constructIds, function(cons){
						let existing = $scope.document.genes.filter((e)=> e.identifier.replace(/@.*$/,"") == cons.identifier.replace(/@.*$/,""))
						if(cons.identifier && !existing?.length){
							$scope.document.genes.push({ identifier:cons.identifier })
						}
						else{
							//replace all matching identifiers with the new one, the uniqIdentifiers fn wll remove duplicate one
							existing.forEach(e=>{
								e.identifier = cons.identifier
							})
						}
					});

					$scope.document.genes = uniqIdentifiers($scope.document.genes);

				}

				$scope.lookupDetections = function(){
					
					if(!$scope.document)
						return;

					$scope.externalLinks = undefined;
					var uniqueIdentifier = $scope.document.uniqueIdentification;
					if(!uniqueIdentifier){						
						return;
					}
					$scope.lookingUpDetections =true;
					$http.get('/api/v2020/bch/lmo-detection-methods/'+uniqueIdentifier, {cache:true})
					.then(function(result){
						if(result.data){
							
							const externalLinks = [];
							result.data.forEach(e=>{
								var exists = _.find($scope.externalLinks, {url: decodeURIComponent(e.url)})
								if(!exists){
									externalLinks.push(e);
								}							
							});
							
							$timeout(()=>{
								$scope.externalLinks = externalLinks
							}, 200);
						}
					})
					.finally(function(){
						$scope.lookingUpDetections = false;
					})
				}
				$scope.setDocument({}, true).then((document)=>{
					updateOldGenes(document);
					$scope.lookupDetections();
				});

				function updateOldGenes(document){
					if(document)
						oldGenes = _.map(document.genes||[], 'identifier');
				}
				function loadReferenceDocument(identifier){
					return storage.drafts.get(identifier, { info: true })					
					.catch(function(e){
						if (e.status == 404)
							return storage.documents.get(identifier, { info: true });
					});
				}
			}
		}

   }]);


