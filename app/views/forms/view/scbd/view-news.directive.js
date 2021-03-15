import app from 'app';
import template from 'text!./view-news.directive.html';
import 'views/directives/record-options';

app.directive('viewNews', [function() {
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

