import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/bch/directives/edit-modified-organism.directive';

	app.controller("editModifiedOrganismController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});


   }]);


