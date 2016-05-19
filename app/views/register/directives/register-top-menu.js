define(['app', 'underscore', '/app/services/role-service.js'], function(app, _) {

    app.directive("registerTopMenu", ['roleService', function(roleService) {

        return {
            restrict: "EA",
            templateUrl: "/app/views/register/directives/register-top-menu.html",
            replace: true,
            transclude: false,
            scope: {},
            link: function($scope, element, attrs) {

                $scope.roles = {
                    isAdministrator: roleService.isAdministrator()
                };
            }
        };
    }]);
});
