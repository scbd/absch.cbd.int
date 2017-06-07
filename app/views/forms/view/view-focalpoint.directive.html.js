define(['app', 'text!/app/views/forms/view/view-focalpoint.directive.html'], function (app, template) {

app.directive('viewFocalPoint', [function() {
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
		controller: ['$scope','commonjs', function ($scope, commonjs) {
			$scope.getNFPText = commonjs.getNFPText;
		}]
	}
}]);
});
