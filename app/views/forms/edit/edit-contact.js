import app from 'app';
import 'views/forms/edit/edit';
import 'views/forms/edit/directives/edit-contact.directive';

    app.controller("editContact", ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });

	 }]);

