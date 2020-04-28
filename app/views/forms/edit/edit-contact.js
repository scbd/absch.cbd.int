define(['app', 'views/forms/edit/edit', 'views/forms/edit/directives/edit-contact.directive' ], function(app) {

    app.controller("editContact", ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });

	 }]);
});
