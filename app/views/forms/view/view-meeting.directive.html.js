require("app").directive('viewMeeting', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-meeting.directive.html',
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