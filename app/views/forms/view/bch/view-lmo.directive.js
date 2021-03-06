import app from 'app';
import template from "text!./view-lmo.directive.html";
import 'views/directives/record-options';
import 'views/forms/view/bch/view-lmo-reference.directive';
import 'views/forms/view/bch/view-lmo-gene.directive';
import 'views/forms/view/directives/view-record-reference.directive';
import 'views/forms/directives/view-terms-hierarchy';

app.directive("viewModifiedOrganism", [function () {
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


