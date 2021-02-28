define(['app','lodash', "text!./view-reference-records.directive.html", 
'components/scbd-angularjs-services/main', 'services/search-service', 'services/solr'], function (app, _, template) {

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
		controller: ["$scope", "solr", '$q', 'searchService', 'realm', function ($scope, solr, $q, searchService, realm) {

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
						searchQuery.fields += 'scopeRelease_b,scopeConfined_b,scopeFood_b,scopeFeed_b,scopeProcessing _b,scopeOther_b,traitDiseasesResistance_b,traitHerbicidesResistance_b,traitPhysiologyChanges_b,traitQualityChanges_b,traitMedicalProduction_b,traitOther_b'
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

											$scope.referenceRecords[record.schemaCode].fields[info.field] = $scope.referenceRecords[record.schemaCode].fields[info.field] || {count:0, docs:[], schema:record.schema}
											
											$scope.referenceRecords[record.schemaCode].fields[info.field].count += 1;
											$scope.referenceRecords[record.schemaCode].fields[info.field].docs.push(record)
										}
									})
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

			function removeRevisonNumber(identifier){
				return identifier.replace(/@[0-9]+$/, '');
			}

		 }] //controller
	};
}]);
});
