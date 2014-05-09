require("app").directive('viewNotification', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-notification.directive.html',
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