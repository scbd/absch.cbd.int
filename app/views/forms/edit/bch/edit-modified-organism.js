define(['app', 'lodash', 'views/forms/edit/bch/directives/edit-modified-organism.directive'], 
function (app, _) {

	app.controller("editModifiedOrganismController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});


   }]);

});
