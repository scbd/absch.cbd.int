import app from '~/app';
import template from 'text!./km-toggle.html';
//============================================================
//
//
//============================================================
app.directive('kmToggle', function() {
		return {
				restrict: 'EAC',
				template: template,
				replace: true,
				transclude: false,
				scope: {
						binding: '=ngModel',
						ngDisabledFn: '&ngDisabled',
						placeholder: "@",
				},
				link: function($scope, $element, $attrs, ngModelController) {
						//$scope.value = false;

				},
				controller: ["$scope", function($scope) {
						$scope.$watch('value', function(oldValue, newValue) {
								if (oldValue !== undefined)
										$scope.binding = newValue;
						});

				}]

		};
});
