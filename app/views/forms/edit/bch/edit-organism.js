define(['app', 'views/forms/edit/bch/directives/edit-organism.directive'], 
function (app) {

	app.controller("editOrganismController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});
   }]);

});
