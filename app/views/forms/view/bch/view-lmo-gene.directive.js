define(['app','lodash', "text!views/forms/view/bch/view-lmo-gene.directive.html", 
'components/scbd-angularjs-services/services/storage', 'services/search-service'], function (app, _, template) {

app.directive("viewLmoGene", [function () {
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

					var geneIdentifiers = _.map(_.flatten(newValue), "identifier");
					var searchQuery = {
						query 	: "identifier_s:(" +geneIdentifiers.join(' ') + ")",
						fields	: 'identifier_s,identity:identity_EN_t, uniqueIdentifier:uniqueIdentifier_s, urls:url_ss'
					}
					$scope.dnaDetails = {};
					$q.when(searchService.list(searchQuery))
					.then(function(data) {
						_.each(data.data.response.docs, function(record){
							$scope.dnaDetails[record.identifier_s] = record;
						})
					});

		        }
		    });

		 }] //controller
	};
}]);
});
