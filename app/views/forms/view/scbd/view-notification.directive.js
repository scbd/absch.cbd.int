import app from 'app';
import template from 'text!./view-notification.directive.html';
import 'views/directives/record-options';

app.directive('viewNotification', [function() {
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

