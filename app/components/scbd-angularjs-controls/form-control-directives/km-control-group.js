define(['app', 'text!./km-control-group.html', 'jquery','lodash'], function(app, template,$, _) { 'use strict';

	app.directive('kmControlGroup', [function ()
	{
		return {
			restrict: 'EAC',
			template : template,
			replace: true,
			transclude: true,
			scope: {
				name      : '@name',
				caption   : '@caption',
				required  : '@required',
				isValidFn : "&isValid"
			},
			link: function ($scope, $element, $attr)
			{
				if ($attr.isValid) {
					$scope.hasError = function() { return false; };
					$scope.hasWarning = function() {
						return !$scope.isValidFn({ "name": $scope.name });
					};
				}
				else if ($scope.$parent.isFieldValid) {
					$scope.hasError = function() { return false; };
					$scope.hasWarning = function() {
						return !$scope.$parent.isFieldValid($scope.name);
					};
				}

				$scope.hasWarning = function() {  //default behavior

					if($scope.name && $scope.$parent && $scope.$parent.validationReport && $scope.$parent.validationReport.warnings) {

						return !!_.findWhere($scope.$parent.validationReport.warnings, { property : $scope.name });
					}

					return false; //default behavior
				};

				$scope.hasError = function() {  //default behavior

					if($scope.name && $scope.$parent && $scope.$parent.validationReport && $scope.$parent.validationReport.errors) {

						return !!_.findWhere($scope.$parent.validationReport.errors, { property : $scope.name });
					}

					return false;
				};

				$scope.isRequired = function() {
					return $scope.required !== undefined && $scope.required!="false";
				};
			}
		};
	}]);
});

