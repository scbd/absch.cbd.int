define(['app', 'views/forms/edit/edit', 'views/forms/edit/directives/edit-organization.directive'], function(app) {
    

    app.controller("editOrganization", ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });


     }]);
     
});
