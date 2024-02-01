import app from '~/app';
import template from 'text!./view-notification.directive.html';
import '~/views/directives/record-options';

app.directive('viewNotification', ['realm',function(realm) {
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
			$scope.isBCH = realm.is('BCH');
			const documentWatch = $scope.$watch("document", (newVal)=>{
				if(newVal){
					$scope.notificationSymbol = `NT-${$scope.document?.symbol_s}`;
					documentWatch();
				}
			});
			
		}]
	}
}]);

