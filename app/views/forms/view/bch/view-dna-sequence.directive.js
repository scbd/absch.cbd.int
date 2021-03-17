import app from 'app';
import template from "text!./view-dna-sequence.directive.html";
import 'views/forms/directives/view-terms-hierarchy';
import 'views/directives/record-options';

app.directive("viewDnaSequence", [function () {
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


