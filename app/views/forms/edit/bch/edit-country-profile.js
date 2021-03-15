import app from 'app';
import _ from 'views/forms/edit/bch/directives/edit-country-profile.directive';
	app.controller("editCountryProfileController", ["$scope",   "$controller",
	function($scope,  $controller,  IStorage, $routeParams, ngDialog,searchService) {
		$controller('editController', {
			$scope: $scope , 
		}); 
   }]);

