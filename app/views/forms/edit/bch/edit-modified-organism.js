define(['app', 'lodash', './directives/edit-modified-organism.directive'], 
function (app, _) {

	app.controller("editModifiedOrganismController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});


   }]);

});
