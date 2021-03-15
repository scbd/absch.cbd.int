import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/bch/directives/edit-biosafety-expert.directive';

	app.controller("editBiosafetyExpertController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);


