define(['app',  './directives/edit-country-profile.directive' ], 
function (app, _) {
	app.controller("editCountryProfileController", ["$scope",   "$controller",
	function($scope,  $controller,  IStorage, $routeParams, ngDialog,searchService) {
		$controller('editController', {
			$scope: $scope , 
		}); 
   }]);
});
