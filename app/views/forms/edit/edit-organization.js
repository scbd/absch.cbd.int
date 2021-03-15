import app from 'app';
import 'views/forms/edit/edit';
import 'views/forms/edit/directives/edit-organization.directive';
    

    app.controller("editOrganization", ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });


     }]);
     

