require("app").directive('viewStatement', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-statement.directive.html',
		replace: true,
		transclude: false,
		scope: {
			document: "=ngModel",
			locale: "=",
			target: "@linkTarget"
		},
		controller: ['$scope', function ($scope) {
		}]
	}
}]);