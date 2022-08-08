import app from '~/app';
import template from "text!./view-resource.directive.html";
import '~/views/directives/record-options';
import '~/views/forms/directives/view-terms-hierarchy';
import viewResourceT from '~/app-text/views/forms/view/view-resource.json';
app.directive("viewResource", ['translationService', function (translationService) {
	return {
		restrict   : "EAC",
		template: template, 
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide : "@"
		},
		controller : ["$scope", "IStorage", "$http","realm",function ($scope, storage, $http, realm)
		{
			translationService.set('viewResourceT', viewResourceT);
			$scope.isABS = realm.is('ABS');
			$scope.isBCH = realm.is('BCH');
			
			
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			};

			
		}]
	};
}]);


