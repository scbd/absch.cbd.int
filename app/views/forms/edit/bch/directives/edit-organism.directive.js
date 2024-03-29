import app from '~/app';
import _ from 'lodash';
import template from 'text!./edit-organism.directive.html';
import '~/views/forms/edit/edit';
import '~/services/main';
import '~/views/forms/edit/document-selector';
import "~/views/forms/view/bch/view-organism.directive";
import editOrganismT from '~/app-text/views/forms/edit/bch/directives/edit-organism.json';

app.directive("editOrganism", ["$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService", "realm", "translationService",
		function ($routeParams, $route, Thesaurus, $q, $controller, thesaurusService, realm, translationService) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
				translationService.set('editOrganismT', editOrganismT);
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;    
				$controller('editController', {
					$scope: $scope
				});

				_.extend($scope.options, {	
					organismType 	: function(){
						return thesaurusService.getDomainTerms('typeOfOrganisms').then(function(data){
							var terms = [];
							_.forEach(data, function(d){
								if( _.includes(d.broaderTerms, '8DAB2400-CF00-44B2-ADCF-49AABF66B9B0'))
									terms.push(d);
								else{
									var parentIds = _.map(terms,  'identifier')
									if(_.intersection(parentIds, d.broaderTerms).length)
										terms.push(d);
								}
							});
							return terms;
						})
					},	
					domestication 	: thesaurusService.getDomainTerms('domestication'),	
					commonUses 		: thesaurusService.getDomainTerms('OrganismCommonUses', {other:true, otherType:'lstring', multiple:true}),	
				});
				$scope.onOrganismQuery = function(searchText){

					var queryOptions = {
						realm     : realm.value,
						schemas	  : ['organism'],
						searchText: searchText
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
				//Disable Parent terms of types of organism
				var parentIDs =['B19E9266-FA70-439C-BE18-0356850BB9FA',
								'356629AD-5C7A-4026-9076-444BA3B97EF9',
								'105F74DA-8439-42a8-9298-096A91C8458A',
								'D6DA48D8-5158-4F20-A7E7-DCAF801EAEE7'];
					_.forEach(parentIDs, function(opt) {
						$element.find("input[value="+opt+"]").attr('disabled', 'disabled').parent().css({"color": "#ccc"});
					});

					if (/^\s*$/g.test(document.notes))
						document.notes = undefined;

					if(!_.isEmpty($scope.scientificNameSynonyms))
						document.scientificNameSynonyms = _($scope.scientificNameSynonyms).map('value').compact().value();
					if(_.isEmpty(document.scientificNameSynonyms))
						document.scientificNameSynonyms = undefined;


					if(!_.isEmpty($scope.commonNames))
						document.commonNames = _($scope.commonNames).map('value').compact().value();
					if(_.isEmpty(document.commonNames))
						document.commonNames = undefined;

					return $scope.sanitizeDocument(document);
				};

				$scope.addItem = function(type){
					type.push({})
				}
				$scope.removeItem = function(type, $index){
					if(type.length>1)
						type.splice($index, 1)
				}
				
				$q.when($scope.setDocument({}, true))
				.then(function(doc){
					if(doc.scientificNameSynonyms)
						$scope.scientificNameSynonyms = _.map(doc.scientificNameSynonyms, function(t){return { value: t}});
					if(doc.commonNames)
						$scope.commonNames = _.map(doc.commonNames, function(t){return { value: t}});
						
				});

			}
		}

   }]);


