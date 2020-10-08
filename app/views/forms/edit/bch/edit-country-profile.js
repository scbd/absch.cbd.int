define(['app', 'views/forms/edit/edit', './directives/edit-country-profile.directive'], 
function (app, _) {
	app.controller("editCountryProfileController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope, 	
		});
   }]);
});
