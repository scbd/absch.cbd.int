import app from 'app';
import template from 'text!./km-control-group.html';
import $ from 'jquery';
import _ from 'lodash';
import './km-info-tip'; ;

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
				if($attr.helpContent){
					$scope.infoTip = {
						title	: $attr.helpTitle,
						content : $attr.helpContent
					}
				}

				if ($attr.isValid) {
					$scope.hasError = function() { return false; };
					$scope.hasWarning = function() {
						return !$scope.isValidFn({ "name": $scope.name });
					};
				}
				else if ($scope.$parent.$parent.isFieldValid) {
					$scope.hasError = function() { return false; };
					$scope.hasWarning = function() {
						return !$scope.$parent.isFieldValid($scope.name);
					};
				}

				$scope.hasWarning = function() {  //default behavior

					if($scope.name) {
						var validationReport = findReportInParent($scope, 0)||{}
						return !!_.find(validationReport.warnings, { property : $scope.name });
					}

					return false; //default behavior
				};

				$scope.hasError = function() {  //default behavior

					if($scope.name) {
						var validationReport = findReportInParent($scope, 0)||{}
						return !!_.find(validationReport.errors, (error)=>{ 
							return error.property == $scope.name ||
									(error.properties||[]).map(p=>p.property).includes($scope.name)
						});
					}

					return false;
				};

				$scope.isRequired = function() {
					return $scope.required !== undefined && $scope.required.toString()!="false";
				};
	
				function findReportInParent($scope, level){
					if(level < 5 && $scope.$parent){
						if($scope.$parent.validationReport)
							return $scope.$parent.validationReport
						
						return findReportInParent($scope.$parent, level++);
					}
	
					return;
				}
			}
		};
	}]);


