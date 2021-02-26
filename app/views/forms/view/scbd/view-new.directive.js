define(['app', 'text!./view-new.directive.html',
'views/directives/record-options'], function (app, template) {

app.directive('viewNew', [function() {
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
