require("app").directive("viewDatabase", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-database.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		controller : ["$scope", function ($scope)
		{

			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}
		}]
	};
}]);
