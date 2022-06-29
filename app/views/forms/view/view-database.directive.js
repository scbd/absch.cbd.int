import app from 'app';
import template from "text!./view-database.directive.html";
import 'views/directives/record-options';
import viewDatabaseT from '~/app-text/views/forms/view/view-database.json';

app.directive("viewDatabase", ["translationService", function (translationService) {
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
			
			translationService.set('viewDatabaseT', viewDatabaseT);
			
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


