define(['app', 'text!./km-yes-no.html','jquery'], function(app, template,$) { 'use strict';
		//============================================================
		//
		//
		//============================================================
		app.directive('kmYesNo', [function() {
				return {
						restrict: 'EAC',
						template: template,
						replace: true,
						transclude: false,
						require: "?ngModel",
						scope: {
								binding: '=ngModel',
								ngDisabledFn: '&ngDisabled',
								required: "@"
						},
						link: function($scope, $element, $attr, ngModelController) {
								//==============================
								//
								//==============================
								$scope.isRequired = function() {
										return $scope.required !== undefined && $.isEmptyObject($scope.binding);
								};

								$scope.onChange = function(val){
									ngModelController.$setViewValue($scope.binding)
								}
						}
				};
		}]);
});