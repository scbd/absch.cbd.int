define(['app'], function (app) {

app.directive('viewPressRelease', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-pressrelease.directive.html',
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