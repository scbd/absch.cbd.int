define(['app','underscore', 'scbd-angularjs-services'], function (app, _) {

app.directive("viewDefaultReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-default-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", "$filter", '$q', function ($scope, storage, $filter, $q) {


            // $scope.document = $scope.model;

            // //==================================
		    // //
		    // //==================================
		    $scope.$watch('model', function(newValue, oldValue){
		        if(newValue){
					$q.when(loadReferenceDocument($scope.model))
					.then(function(data) {
						$scope.document = data;
					});

		        }
		    });


			function loadReferenceDocument(identifier){

				return storage.documents.get(identifier, { info : true})
						.then(function(result){
							return result.data;
						})
						.catch(function(error, code){
							if (code == 404) {
								return storage.drafts.get(ref.identifier, { info : true})
									.then(function(result){
										return result.data;
									});
							};
						});
			}

		 }] //controller
	};
}]);
});
