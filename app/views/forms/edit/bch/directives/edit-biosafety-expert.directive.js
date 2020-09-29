define(['app', 'lodash', 'text!./edit-biosafety-expert.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-expert.directive"], 
function (app, _, template) {

	app.directive("editBiosafetyExpert", ["locale", "$filter", "$timeout", "$q", "$controller", "thesaurusService",
	function(locale, $filter, $timeout, $q, $controller, thesaurusService) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){

				$scope.gender = {
					options : {
						male 	: '0999095A-13E0-46F0-A928-613B9AF32AAE',
						female 	: '7CC8AFB1-36E0-4583-AE4E-DB928E60A3B3',
					},
					value	: undefined
				}
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;
				$scope.motherTongue		= {unLanguages:[], otherLanguages:[]};
				$scope.languageRating   = []; 
				$controller('editController', {
					$scope: $scope
				});

				_.extend($scope.options, {	
					organizationTypes: function() { 
						return thesaurusService.getDomainTerms('organizationTypes', {other:true})
								.then(function(types){ 
									return _.filter(types, function(type){
										return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'
									}); 
								}) 
					},
					nationalities	: function(){
						return thesaurusService.getDomainTerms('nationalities')
						.then(function(nationalities){
							return _.sortBy(nationalities, function(nation){
								return nation.title[locale]});
						})
					},
                	areaOfExpertise	: thesaurusService.getDomainTerms('areasOfExpertise', {other:true, otherType:'lstring', multiple:true}),	
					languages 		: thesaurusService.getDomainTerms('unLanguages'),
					otherLanguages 	: thesaurusService.getDomainTerms('languages').then(function(languages){
						return _.map(languages, function(element) {
									element.__value = $filter('lstring')(element.title, locale);
									return element
								});
					}),
				});
                
                $scope.setTab = function () {
                    $scope.tab = 'edit';
                };

                $scope.$watch('tab', function(newValue){

                    if(newValue != 'edit'){
                        $("#expertTabs > li").removeClass("active");
                    }
                    // if(newValue =='edit')
                    //     $('#expertTabs a:first').tab('show');

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

					if($scope.gender.value)
						document.gender = { identifier : $scope.gender.value };

					var motherTongue = []
					if($scope.motherTongue){
						if(($scope.motherTongue.unLanguages||[]).length){
							motherTongue = $scope.motherTongue.unLanguages
						}
						if(($scope.motherTongue.otherLanguages||[]).length){
							motherTongue = _.union(motherTongue, $scope.motherTongue.otherLanguages)
						}
					}
					document.motherTongue = motherTongue;

					var languageRating = []
					if($scope.languageRating){
						_.each($scope.languageRating, function(rating){
							if(rating.level)
								languageRating.push({identifier:rating.identifier, level:rating.level})
						})
					};
					document.languageRating = languageRating;

					var d = $scope.sanitizeDocument(document);
					
					return d;
				};

				$scope.addItem = function(type){
					if(type){
						var lastItem = type[type.length - 1];
						if (!angular.equals(lastItem, {}))
							type.push({})
					}
				}
				$scope.addOtherLanguageItem = function(type){
					if(type){
						var lastItem = type[type.length - 1];
						if (!angular.equals(lastItem, {}))
							type.push({});
					}
				}
				
				$scope.removeItem = function(type, $index){
					if(type.length>0)
						type.splice($index, 1)
				}

				$q.when($scope.setDocument({}))
				.then(function(doc){
					if(doc.gender)
						$scope.gender.value = doc.gender.identifier;

					$q.when(thesaurusService.getDomainTerms('unLanguages')).then(function(languages){

						$scope.motherTongue.unLanguages = _.filter(doc.motherTongue, function(lang){
							return _.find(languages, {identifier:lang.identifier});
						});
						$scope.motherTongue.otherLanguages = _.filter(doc.motherTongue, function(lang){
							return !_.find(languages, {identifier:lang.identifier});
						});

						var unLanguages = _.map(languages, function(lang){
							var langRating = _.find(doc.languageRating, {identifier:lang.identifier});
							return _.extend(lang, {level:(langRating||{}).level, isUNLanguage:true});
						});
						var otherLanguages = _.filter(doc.languageRating, function(lang){
							return !_.find(languages, {identifier:lang.identifier});
						});
						$scope.languageRating = _.union(unLanguages, otherLanguages)
					});
				});

			}
		}

   }]);

});
