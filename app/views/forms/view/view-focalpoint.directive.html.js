define(['app'], function (app) {

app.directive('viewFocalPoint', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-focalpoint.directive.html',
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
