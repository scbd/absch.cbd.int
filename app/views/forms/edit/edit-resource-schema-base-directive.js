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
				$scope.isNationalUser = false;
				$scope.keywords = [{}];
				$scope.hasRiskAssessmentSubject = false;
				$scope.countryRegions		= [];
				//$scope.countryRegions		= {countries:[], regions:[]};

				if ($scope.user.isAuthenticated) {
					$scope.isNationalUser =  roleService.isNationalUser();
				}

				// TODO: where this code is using
				$scope.displayMCCWarning = false;
				var changeParentFor = ['F7D357FEC3884D388FD49CECBCFF5083', '3A02804CB9AB43F2BADF23B6BC0F5661'];
				var newParent = '5427EB8F-5532-4AE2-88EE-5B9619917480';

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

					resourceTypesVlr   : function() {return thesaurusService.getDomainTerms('resourceTypesVlr',{other:true, otherType:'lstring'})},
					aichiTargets    : function() {return thesaurusService.getDomainTerms('aichiTargets');},
					cbdSubjects		: function() {return thesaurusService.getDomainTerms('cbdSubjects',{other:true, otherType:'lstring'})}, // 14 CBD Subject Areas
					bchSubjects   	: function() {return thesaurusService.getDomainTerms('cpbThematicAreas',{other:true, otherType:'lstring'})}, // Biosafety Thematic Areas
					bchRaAuthorAffiliation : function() {return thesaurusService.getDomainTerms('bchRaAuthorAffiliation',{other:true, otherType:'lstring'})}, // Author affiliation
					bchRaSubjects	: function() {return thesaurusService.getDomainTerms('bchRaSubjects');}, // raSubjects
					absKeyAreas     : function() {return thesaurusService.getDomainTerms('keyAreas');}, // ABS keyAreas

					regions	: function() {return thesaurusService.getDomainTerms('regions')
						.then(function(o){
							return Thesaurus.buildTree(o);
							});
					},
					//absSubjects		: missing //absSubjects
					// TODO: need to verify, need to remove unused
					
					fileFormats     : function() {return thesaurusService.getDomainTerms('cbrFormats');},
					purposes    	: function() {return thesaurusService.getDomainTerms('cbrPurpose');},
					targetGroups    : function() {return thesaurusService.getDomainTerms('cbiAudience');},
					expertiseLevels : function() {return thesaurusService.getDomainTerms('cbrLevel');},
					bchLanguages    : function() {return thesaurusService.getDomainTerms('languages').then(function(o){return _.sortBy(o, 'name' );})},
				});
				}, 1000 );

				$scope.years = [];
				var end = new Date().getFullYear();
				for (var i = end; i > (end-100) ; i--) {
					$scope.years.push({id:i, name: i});
				}
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
				//need add more conditions for lmo, gene as well
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
						//fieldQueries: ['schema_s:contact AND type_s:person'],
						//fieldQueries: ['schema_s:organization'],
						fieldQueries: ['schema_s:contact'],
						searchText: searchText
					}
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
				}
				$scope.onBuildAmendedVlrQuery = function(searchText){
									
                    var queryOptions = {
						realm     : realm.value,
						schemas	  : ['resource'],
                        searchText: searchText
                    }					
					//TODO: show only current user's records		
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
                }
				//============================================================
				//
				//============================================================
				// TODO: need to verify ts use 
			    $scope.IsLiterature = function(document) {

			        document = document || $scope.document;

			        if (!document || !document.purpose)
			            return false;
						
			        var purposes = _.map(document.purpose, 'identifier');

			        return _.includes(purposes, 'C1B32F41-89D1-4EDC-8EF2-335362B91F8D'); // Literature

			    };

				

				//==================================
				//
				//==================================
				$scope.getCleanDocument = function(document) {
					console.log('i am getCleanDocument at directive ');

					document = document || $scope.document;
					if ( !document )
						return undefined;
						if ( !_.isEmpty( $scope.keywords )  && !$scope.isABS)
							document.keywords = _( $scope.keywords ).map( 'value' ).compact().value();
						if ( _.isEmpty( document.keywords )  || $scope.isABS)
							document.keywords = undefined;
					//set all bch fields to undefined for eg. addressLmoCategories etc
					if(!$scope.isBCH){
						document.publisher = undefined;
					}
					if($scope.isBCH) {
						$scope.onLmoCategoriesChange( document.addressLmoCategories );
						$scope.onRaRecommendChange( document.bchRaRecommend );
						$scope.onThematicAreaChange(document.bchSubjects);
						$scope.onRaRecommendChange(document.bchRaRecommend);
					}
					if($scope.isABS) {
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
					// TODO: move this code, once setDocument issue fixed
					// if((doc.countryRegions||[]).length){
					// 	$q.when(thesaurusService.getDomainTerms('countries')).then(function(countries){
					// 		$scope.countryRegions.countries = _.filter(doc.countryRegions, function(country){
					// 			return _.find(countries, {identifier:country.identifier});
					// 		});
					// 		$scope.countryRegions.regions = _.filter(doc.countryRegions, function(region){
					// 			return !_.find(countries, {identifier:region.identifier});
					// 		});
					// 	});
					// }
					
					return $scope.sanitizeDocument(document);
				};

				$scope.addItem = function(type){
					type.push({});
				}
				$scope.removeItem = function(type, $index){
					if(type.length>1) 
						type.splice($index, 1)
				}
                //============================================================
				//
				//============================================================
				// TODO: where this code is using
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
				// TODO FBAF958B-14BF-45DD-BC6D-D34A9953BCEF REPLACED with 043C7F0D-2226-4E54-A56F-EE0B74CCC984 
				$scope.onThematicAreaChange = function(value){
					$scope.hasRiskAssessmentSubject = _.some(value||[], {identifier: "043C7F0D-2226-4E54-A56F-EE0B74CCC984"});
					
				}

				//============================================================
				//
				//============================================================
				// TODO need to verify
				function removeFromList(badSubjectList,validList){
					return _.without(validList,badSubjectList);
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


