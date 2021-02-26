define(['app', 'lodash', 'text!views/forms/edit/bch/directives/edit-organism.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-organism.directive"], 
function (app, _, template) {

	app.directive("editOrganism", ["$routeParams", "$route", "Thesaurus", "$q", "$controller", "thesaurusService",
	function($routeParams, $route, Thesaurus, $q, $controller, thesaurusService) {
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

});
