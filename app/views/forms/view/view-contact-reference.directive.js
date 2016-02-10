define(['app','underscore', 'scbd-angularjs-services'], function (app, _) {

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

			$scope.$watch("model", function(newVal) {
				console.log(newVal);
				if(newVal && !newVal.header && newVal.identifier && !$scope.document ){
					storage.documents.get(newVal.identifier)
						.then(function(data){
							$scope.document = data.data;
							if($scope.document.$scope.document){
								storage.documents.get(newVal.identifier)
								.then(function(data){
									_.extend($scope.document.contactOrganization, data.data);
								});
							}

						});
				}
				else if(newVal && newVal.header) {
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
