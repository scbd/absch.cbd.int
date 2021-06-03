import app from 'app';
import template from 'text!./view-pressrelease.directive.html';
import 'views/directives/index';

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

