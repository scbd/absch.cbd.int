define(['app','lodash', "text!views/forms/view/view-reference-records.directive.html", 
'components/scbd-angularjs-services/services/storage', 'services/search-service'], function (app, _, template) {

app.directive("viewReferencedRecords", [function () {
	return {
		restrict: "EA",
		template: template ,
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", '$q', 'searchService', function ($scope, storage, $filter, $q, searchService) {

			// //==================================
		    // //
		    // //==================================
		    $scope.$watch('model', function(newValue, oldValue){
		        if(newValue){

					var searchQuery = {
						query 	: "referenceRecord_ss:" + $scope.model,
						fields	: 'title:title_EN_t, referenceRecord_ss, referenceRecord_info_ss, schema:schema_EN_s, identifier:idenfifier_s, uniqueId:uniqueIdentifier_s'
					}
					$q.when(searchService.list(searchQuery))
					.then(function(data) {

						if(data.data.response.docs.length > 0){							
							_.each(data.data.response.docs, function(record){
								_.each(record.referenceRecord_info_ss, function(info){
									info = JSON.parse(info);
									_.each(info.identifiers, function(identifier){
										if(removeRevisonNumber(identifier) == $scope.model){
											if(!$scope.referenceRecords)
												$scope.referenceRecords = {};
											$scope.referenceRecords[info.field] = $scope.referenceRecords[info.field] || {count:0, docs:[], schema:record.schema}
											
											$scope.referenceRecords[info.field].count += 1;
											$scope.referenceRecords[info.field].docs.push({uniqueId:record.uniqueId, title:record.title})
										}
									})
								});								
							})
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
