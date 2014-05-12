define(['app'], function (app) {

app.directive('viewAuthorityReference', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-authority-reference.directive.html',
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
});