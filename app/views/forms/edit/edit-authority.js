define(['app', 'views/forms/edit/directives/edit-authority.directive'], function(app) {
// ,'components/test'// , 'angular-vue', testVue
    app.controller("editAuthorityController", ["$scope", "$controller", function($scope, $controller) {

        $controller('editController', {
            $scope: $scope
        });

        // $scope.vueOptions = {
        //     components: { testvue: testVue }
        //   };

    }]);
});
