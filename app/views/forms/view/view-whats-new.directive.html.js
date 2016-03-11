define(['app'], function (app) {

app.directive('viewWhatsNew', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-whats-new.directive.html',
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
