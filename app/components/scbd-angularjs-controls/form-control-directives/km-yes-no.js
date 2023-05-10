import app from '~/app';
import template from 'text!./km-yes-no.html';
import $ from 'jquery';
import kmYesNoT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-yes-no.json'; 

		//============================================================
		//
		//
		//============================================================
		app.directive('kmYesNo', ["translationService",function(translationService) {
				return {
						restrict: 'EAC',
						template: template,
						replace: true,
						transclude: false,
						scope: {
								binding: '=ngModel',
								ngDisabledFn: '&ngDisabled',
								required: "@"
						},
						link: {},
						controller: ["$scope", function($scope) {
								//==============================
								//
								//==============================
								translationService.set('kmYesNoT', kmYesNoT);		

								$scope.isRequired = function() {
										return $scope.required !== undefined && $.isEmptyObject($scope.binding);
								};
						}]
				};
		}]);
