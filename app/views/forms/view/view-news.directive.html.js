define(['app'], function (app) {

app.directive('viewNews', [function() {
	return {
		restrict: 'EAC',
		templateUrl: '/app/views/forms/view/view-news.directive.html',
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
