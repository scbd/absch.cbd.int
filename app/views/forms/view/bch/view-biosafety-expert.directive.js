import app from '~/app';
import template from "text!./view-biosafety-expert.directive.html";
import '~/views/directives/record-options';
import viewExpT from '~/app-text/views/forms/view/bch/view-biosafety-expert.json';

	app.directive("viewBiosafetyExpert", ['translationService', function (translationService) {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide	: "@"
		},
		controller : ["$scope", function ($scope)
			{		
			translationService.set('viewExpT', viewExpT);
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


