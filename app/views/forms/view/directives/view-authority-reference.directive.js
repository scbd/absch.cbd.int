define(['app', 'text!views/forms/view/directives/view-authority-reference.directive.html'], function (app, template) {

app.directive('viewAuthorityReference', [function() {
	return {
		restrict: 'EAC',
		template: template ,
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
