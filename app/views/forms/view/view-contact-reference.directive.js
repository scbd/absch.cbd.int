define(['app','scbd-angularjs-services'], function (app) {

app.directive("viewContactReference", [function () {
	return {
		restrict: "EAC",
		templateUrl: "/app/views/forms/view/view-contact-reference.directive.html",
		replace: true,
		transclude: false,
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ["$scope", "IStorage", function ($scope, storage) {

			$scope.$watch("model", function(newVal, oldVal) {
				console.log(newVal);
				if(newVal && !$scope.document && !newVal.header && newVal.identifier){
					storage.documents.get(newVal.identifier)
						.then(function(data){
							$scope.document = data.data;
						});
				}
				else if(newVal.header) {
					$scope.document = newVal;
				}
			});


			$scope.isPerson = function() {

				var doc = $scope.document;

				if(!doc)
					return false;

				if(doc.type=="person")
					return true;

				if(!doc.type && (document.firstName || document.lastName))
					return true; //default behaviour

				return false;
			};

			$scope.isOrganization = function() {

				return !$scope.isPerson();
			};
		}]
	};
}]);
});
