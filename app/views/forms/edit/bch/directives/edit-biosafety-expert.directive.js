import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-biosafety-expert.directive.html';
import 'views/forms/edit/edit';
import 'views/forms/edit/document-selector';
import "views/forms/view/bch/view-biosafety-expert.directive";
import 'components/scbd-angularjs-controls/main';
import 'services/main';

	app.directive("editBiosafetyExpert", ["locale", "$filter", "searchService", "$q", "$controller", "thesaurusService", 'solr', 'Thesaurus',
	function(appLocale, $filter, searchService, $q, $controller, thesaurusService, solr, thesaurus) {
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
				$scope.countryRegionsWorkedIn		= {countries:[], regions:[]};
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
					regions	: function() {return thesaurusService.getDomainTerms('regions')
						.then(function(o){
							return thesaurus.buildTree(o);
							});
					},		
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
								return nation.title[appLocale]});
						})
					},
                	areaOfExpertise	: thesaurusService.getDomainTerms('areasOfExpertise', {other:true, otherType:'lstring', multiple:true}),	
					languages 		: thesaurusService.getDomainTerms('unLanguages').then(function(lang){
						return _.sortBy( lang, 'name' );
					}),
					otherLanguages 	: thesaurusService.getDomainTerms('languages').then(function(languages){
						return _.map(languages, function(element) {
									element.__value = $filter('lstring')(element.title, appLocale);
									return element
								});
					}),
				});
                $scope.onContactQuery = function(searchText, tab){
					var queryOptions = {
						schemas	  : ['contact'],
						contactType: 'person',
						searchText: searchText
					}
		
					if($scope.document != undefined && $scope.document.government != undefined && $scope.document.government.identifier != undefined){
						queryOptions.government = $scope.document.government.identifier;
					}
		
					if( $scope.document != undefined && $scope.document.header != undefined && $scope.document.header.identifier != undefined){
						queryOptions.identifier = $scope.document.header.identifier;
					}
		
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
		
				}
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
						_.forEach($scope.languageRating, function(rating){
							if(rating.level)
								languageRating.push({identifier:rating.identifier, level:rating.level})
						})
					};
					document.languageRating = languageRating;
					var countryRegionsWorkedIn = []
					if($scope.countryRegionsWorkedIn){

						if(($scope.countryRegionsWorkedIn.countries||[]).length){
							countryRegionsWorkedIn = $scope.countryRegionsWorkedIn.countries
						}
						if(($scope.countryRegionsWorkedIn.regions||[]).length){
							countryRegionsWorkedIn = _.union(countryRegionsWorkedIn, $scope.countryRegionsWorkedIn.regions)
						}
						document.countryRegionsWorkedIn = countryRegionsWorkedIn;
					}

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

				$scope.onSearchOrganizations = function(text, locale){

					$scope.loadingData=true;
					var queryField = 'title_EN_t'.replace(/EN/, (locale||appLocale).toUpperCase());
					var fields     = 'title:title_EN_t'.replace(/EN/, (locale||appLocale).toUpperCase());
					var searchQuery = solr.escape(text);
					
					var query = {
						fieldQuery: ['schema_s:organization'],
						query : queryField + ':(' + searchQuery + ')',
						fields: fields
					}
					return searchService.list(query).then(function(r) {
						return {data : r.data.response.docs};
					})
					.finally(function(){$scope.loadingData=false;});
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

					if((doc.countryRegionsWorkedIn||[]).length){
						$q.when(thesaurusService.getDomainTerms('countries')).then(function(countries){
							$scope.countryRegionsWorkedIn.countries = _.filter(doc.countryRegionsWorkedIn, function(country){
								return _.find(countries, {identifier:country.identifier});
							});
							$scope.countryRegionsWorkedIn.regions = _.filter(doc.countryRegionsWorkedIn, function(region){
								return !_.find(countries, {identifier:region.identifier});
							});
						});
					}
				});

			}
		}

   }]);


