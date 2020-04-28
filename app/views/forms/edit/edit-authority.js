define(['app', './directives/edit-authority.directive'], function(app) {

    app.controller("editAuthorityController", ["$scope", "$controller", function($scope, $controller) {

        $controller('editController', {
            $scope: $scope
        });

    }]);
});
