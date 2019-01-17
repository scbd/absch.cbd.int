define(['app','lodash', "text!views/forms/view/view-default-reference.directive.html", 
'components/scbd-angularjs-services/services/storage', 'services/search-service'], function (app, _, template) {

app.directive("viewReferenceRecords", [function () {
	return {
		restrict: "EAC",
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
						fields	: 'referenceRecord_ss, referenceRecord_info_ss'
					}
					$q.when(searchService.list(searchQuery))
					.then(function(data) {

						if(data.data.response.docs.length > 0){
							$scope.referenceRecords = {};
							_.each(data.data.response.docs, function(record){
								var details = JSON.parse(record.referenceRecord_info_ss);
								_.each(details, function(detail){
									if(_.includes(detail.identifier, $scope.identifier))
										$scope.referenceRecords[details.field] = ($scope.referenceRecords[detail.field]||0) + 1;
								})
								
							})
						}
					});

		        }
		    });

		 }] //controller
	};
}]);
});
