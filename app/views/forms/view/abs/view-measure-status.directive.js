import app from '~/app';
import template from "text!./view-measure-status.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/view/directives/view-record-reference.directive';

	app.directive("viewMeasureStatus", [function () {

		return {
			restrict   : "EAC",
			template: template ,
			replace    : true,
			transclude : false,
			scope: {
				document: "=ngModel",
				locale  : "=",
				target  : "@linkTarget",
				allowDrafts : "@",
				hide:"@"
			},
			controller : ["$scope", 'realm', function ($scope, realm)
			{
				//====================
				//
				//====================
				$scope.display = function(field) {

					if(!$scope.hide) return true; //show all fields

					return( $scope.hide.indexOf(field) >= 0 ? false : true);
				}

			}]
		};
	}]);


