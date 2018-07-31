define(['app','underscore', "text!views/forms/view/view-default-reference.directive.html", 
'components/scbd-angularjs-services/services/main'], function (app, _, template) {

app.directive("viewDefaultReference", [function () {
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
							if (error.status == 404) {
								$scope.errorCode = 404;
								return storage.drafts.get(identifier, { info : true})
									.then(function(result){
										$scope.errorCode = undefined;
										return result.data;
									});
							};
						});
			}

		 }] //controller
	};
}]);
});
