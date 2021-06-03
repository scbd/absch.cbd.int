import app from 'app';
import template from 'text!./view-statement.directive.html';
import 'views/directives/index';

app.directive('viewStatement', [function() {
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

