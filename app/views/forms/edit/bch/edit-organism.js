import app from 'app';
import 'views/forms/edit/bch/directives/edit-organism.directive';

	app.controller("editOrganismController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});
   }]);


