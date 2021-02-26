define(['app', 'text!./view-pressrelease.directive.html',
'views/directives/record-options',
], function (app, template) {

app.directive('viewPressRelease', [function() {
	return {
		restrict: 'EAC',
		template: template, 
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
