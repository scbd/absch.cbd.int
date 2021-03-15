import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/bch/directives/edit-law.directive';

	app.controller("editLawController", ["$scope", "$controller", function($scope, $controller) {
		
		$controller('editController', {
			$scope: $scope
		});

		

   }]);

