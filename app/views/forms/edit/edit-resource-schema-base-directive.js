import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-resource-schema-base-directive.html';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/edit/organization-selector';
import "views/forms/view/view-resource.directive";

	app.directive('convertToNumber', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function(val) {
				return parseInt(val, 10);
			});
			ngModel.$formatters.push(function(val) {
				return '' + val;
			});
			}
		};
	});
	app.directive('editSchemaResourceBase', ["$q", "$timeout", "Thesaurus", function ($q, $timeout, Thesaurus)
	{
		return {
			restrict: 'EAC',
			template: template ,
			replace: true,
			controller: ["$rootScope", "$scope", "$http", "$filter","IStorage", "roleService", "realm","thesaurusService", function ($rootScope, $scope, $http, $filter, storage, roleService, realm,thesaurusService)
			{

				$scope.isABS = realm.is('ABS');
				$scope.isBCH = realm.is('BCH');
				$scope.user = $rootScope.user;
				$scope.countryRegions		= {};
				// TODO: where this code is using
				$scope.displayMCCWarning = false;

				$timeout (function (){
				_.extend($scope.options, {
					 
					documentLinksExt : [{
						model:"language",
						title:"Language",
						required:true,
                    	mapping: function(item){ return item.identifier;},
						options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){
							var options = $filter("orderBy")(o.data, "name");
							_.forEach(options, function(element) {
									element.__value = element.name;
								});
							return options;
						})
					}],

					resourceTypes   : function() {return thesaurusService.getDomainTerms('resourceTypesVlr',{other:true, otherType:'lstring'})},
					aichiTargets    : function() {return thesaurusService.getDomainTerms('aichiTargets');},
					bchSubjects   	: function() {return thesaurusService.getDomainTerms('cpbThematicAreas',{other:true, otherType:'lstring'})}, // Biosafety Thematic Areas
					bchRaAuthorAffiliation : function() {return thesaurusService.getDomainTerms('bchRaAuthorAffiliation',{other:true, otherType:'lstring'})}, // Author affiliation
					bchRaSubjects	: function() {return thesaurusService.getDomainTerms('bchRaSubjects');}, // raSubjects
					absKeyAreas     : function() {return thesaurusService.getDomainTerms('keyAreas');}, // ABS keyAreas
					absSubjects	: function() {return thesaurusService.getDomainTerms('absSubjects');}, // ABS Thematic Areas

					cbdSubjects : function() { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms", { cache: true }).then(function(o){
						var subjects = ['CBD-SUBJECT-BIOMES', 'CBD-SUBJECT-CROSS-CUTTING'];
						var items = [];
						_.forEach(subjects, function(subject) {
							var term = _.find(o.data, {'identifier': subject } );
							items.push(term);
							_(term.narrowerTerms).forEach(function (term) {
								items.push(_.find(o.data, {'identifier':term}));
							})
						});
						return items;
					});
					}, });
				}, 1000 );

				//==================================
				// Using
				//==================================
				$scope.onRaRecommendChange = function(value){
					if (!$scope.document || !$scope.document.biosafety)
       					 return;
					if(!value){
						$scope.document.biosafety.raAuthorAffiliation = undefined;
						$scope.document.biosafety.raSubjects = undefined;
					}
				}

				$scope.onAddressModifiedOrganismsChange = function(value){
					if (!$scope.document || !$scope.document.biosafety)
       					 return;
					if(!value){
						$scope.document.biosafety.modifiedOrganisms = undefined;
					}
				}
				$scope.onAddressOrganismsChange = function(value){
					if (!$scope.document || !$scope.document.biosafety)
       					 return;
					if(!value){
						$scope.document.biosafety.organisms = undefined;
					}
				}
				$scope.onAddressGenesChange = function(value){
					if (!$scope.document || !$scope.document.biosafety)
       					 return;
					if(!value){
						$scope.document.biosafety.genes = undefined;
					}
				}

				$scope.onBuildQuery = function(searchText, schema){
					var queryOptions = {
						realm     : realm.value,
						schemas	  : [schema],
						searchText: searchText
					}

					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}

				$scope.onAuthorContactQuery = function(searchText){
					var queryOptions = {
						realm     : realm.value,
						fieldQueries: ['schema_s:organization'],
						searchText: searchText
					}
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}
				//==================================
				//
				//==================================
				$scope.getCleanDocument = function(document) {


					document = document || $scope.document;
					if ( !document )
						return undefined;

					//set all bch fields to undefined for eg. addressLmoCategories etc
					if(!$scope.isBCH){
						document.publisher = undefined;
					}
					if($scope.isBCH) {
						document.nagoya = undefined;
						if(document.biosafety){
							$scope.onLmoCategoriesChange( document.biosafety.addressLmoCategories );
							$scope.onRaRecommendChange( document.biosafety.raRecommend );
							$scope.onThematicAreaChange(document.biosafety.subjects);
						}
					}
					if($scope.isABS) {
						document.biosafety = undefined;
						$scope.onResourceTypesChange( document.resourceTypes );
					}

					//TODO: add countryRegions 
					var countryRegions = []
					if($scope.countryRegions){

						if(($scope.countryRegions.countries||[]).length){
							countryRegions = $scope.countryRegions.countries
						}
						if(($scope.countryRegions.regions||[]).length){
							countryRegions = _.union(countryRegions, $scope.countryRegions.regions)
						}
						document.countryRegions = countryRegions;
					}
					
					if (/^\s*$/g.test(document.notes))
						document.notes = undefined;
				
					return $scope.sanitizeDocument(document);
				};

                //============================================================
				//
				//============================================================
				// TODO: will remove unused code once ABS tested, where this code is using
				$scope.onResourceTypesChange = function(value){
					if (value && _.indexOf((_.map(value, "identifier")), '48D40B9E207B43948D95A0BA8F0D710F') >= 0)
						$scope.displayMCCWarning = true;
					else
						$scope.displayMCCWarning = false;
				}
				$scope.onLmoCategoriesChange = function(value){
					if(!value){
						$scope.document.organisms = undefined;
						$scope.document.genes = undefined;
						$scope.document.modifiedOrganisms = undefined;
					}
				}
				$scope.onThematicAreaChange = function(value){
					$scope.hasRiskAssessmentSubject = _.find(value||[], {identifier: "FBAF958B-14BF-45DD-BC6D-D34A9953BCEF"});
					if(!$scope.hasRiskAssessmentSubject && $scope.document.biosafety){
						$scope.document.biosafety.raRecommend = undefined;
						$scope.document.biosafety.raAuthorAffiliation = undefined;
						$scope.document.biosafety.raSubjects = undefined;
					}

				}

				//==================================
				//
				//==================================
				$scope.loadRecords = function(identifier) {


					if (identifier) { //lookup single record
						var deferred = $q.defer();
						storage.documents.get(identifier)
							.then(function(r) {
								deferred.resolve(r.data);
							}, function(e) {
								if (e.status == 404) {
									storage.drafts.get(identifier)
										.then(function(r) { deferred.resolve(r.data);},
											function(e) { deferred.reject (e);});
								}
								else {
									deferred.reject (e);
								}
							});
						return deferred.promise;
					}

				};

				$scope.setCountryRegions = function(countryRegions){
					$q.when(thesaurusService.getDomainTerms('countries')).then(function(countries){
						$scope.countryRegions.countries = _.filter(countryRegions, function(country){
							return _.find(countries, {identifier:country.identifier});
						});
						$scope.countryRegions.regions = _.filter(countryRegions, function(region){
							return !_.find(countries, {identifier:region.identifier});
						});
					});
				}
			}]
		};
	}]);


