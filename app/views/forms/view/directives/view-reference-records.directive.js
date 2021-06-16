import app from 'app';
import _ from 'lodash';
import template from "text!./view-reference-records.directive.html";
import 'components/scbd-angularjs-services/main';
import 'services/main';

app.directive("viewReferencedRecords", [function () {
	return {
		restrict: "EA",
		template: template ,
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget",
			onDataFetch: "&?"
		},
		controller: ["$scope", "solr", '$q', 'searchService', 'realm','$filter', '$routeParams', function ($scope, solr, $q, searchService, realm, $filter, $routeParams) {

			// //==================================
			// //
			// //==================================
			$scope.$watch('model', function(newValue, oldValue){
				if(newValue){

					var searchQuery = {
						rowsPerPage:5000,
						query 	: "referenceRecord_ss:" + solr.escape($scope.model),
						fields	: 'title:title_EN_t, referenceRecord_ss, referenceRecord_info_ss,schemaCode:schema_s,schema:schema_EN_s, identifier:identifier_s, uniqueId:uniqueIdentifier_s, government_s,government:government_EN_s,'
					}
					if(realm.is('BCH')){
						searchQuery.fields += 'scopeRelease_b,scopeConfined_b,scopeFood_b,scopeFeed_b,scopeProcessing _b,scopeOther_b,scopePharmaceutical_b,scopeTransit_b,traitsDiseasesResistance_b,traitsHerbicidesResistance_b,traitsPhysiologyChanges_b,traitsQualityChanges_b,traitsMedicalProduction_b,traitsOther_b'
					}
					$q.when(searchService.list(searchQuery))
					.then(function(data) {

						if(data.data.response.docs.length > 0){
							_.forEach(data.data.response.docs, function(record){
								_.forEach(record.referenceRecord_info_ss, function(info){
									info = JSON.parse(info);
									_.forEach(info.identifiers, function(identifier){
										if(removeRevisonNumber(identifier) == $scope.model){
											if(record.schemaCode=='modifiedOrganism' || record.schemaCode=='nationalRiskAssessment' || record.schemaCode=='independentRiskAssessment')
												record.showIcons = true;
											if(!$scope.referenceRecords)
												$scope.referenceRecords = {};

											if(!$scope.referenceRecords[record.schemaCode])
												$scope.referenceRecords[record.schemaCode] = {
													schema:record.schema,
													fields : {}
												};

											 getTitle(info.field,record.schemaCode)
											.then(function(response) {
												if (response == undefined) { response = info.field;}
													$scope.referenceRecords[record.schemaCode].fields[response] = $scope.referenceRecords[record.schemaCode].fields[response] || {count : 0, docs : [], schema : record.schema}
													$scope.referenceRecords[record.schemaCode].fields[response].count += 1;
													$scope.referenceRecords[record.schemaCode].fields[response].docs.push( record );
											});
										}
									});
								});
							})
							if(typeof $scope.onDataFetch == 'function'){
								$scope.onDataFetch({data:$scope.referenceRecords})
							}
						}
					});

				}
			});

			$scope.encode = function(query){
				return encodeURIComponent(query);
			}

			function loadJsonFile(filePath){
				var deferred = $q.defer();
				require([filePath], function(res){
					deferred.resolve(res);
				});

				return deferred.promise;
			}

			function getTitle(referenceField, schema){
				return loadJsonFile('views/search/search-filters/bch-reference-record-filters.json')
				.then(function(keywords){
					let terms = {};
					_.forEach(keywords[schema], function(item){
						if(item.referenceField == referenceField) {
							terms = item.title;
						}
					});
					return terms;
				});
			}

			function removeRevisonNumber(identifier){
				return identifier.replace(/@[0-9]+$/, '');
			}

		}] //controller
	};
}]);


