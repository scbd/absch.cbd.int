define(['app', 'views/forms/edit/edit', 'views/forms/edit/directives/edit-organiztion'], function(app) {
    

    app.controller("editOrganization", ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });

		$scope.identifier = $routeParams.identifier;


     }]);
     
});
