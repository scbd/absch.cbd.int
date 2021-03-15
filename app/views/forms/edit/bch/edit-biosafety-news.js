import app from 'app';
import _ from 'views/forms/edit/edit';
import 'views/forms/edit/bch/directives/edit-biosafety-news.directive';
	app.controller("editBiosafetyNewsController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope, 	
		});
   }]);

