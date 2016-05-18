define(['app', '/app/views/directives/switch-realm-directive.html.js',
 '/app/services/role-service.js', 
 '/app/views/register/directives/register-top-menu.js'], function(app) {
 "use strict";
    app.controller("AdminController", ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            if ($rootScope.user.isAuthenticated) {
                $scope.roles = {
                    isAbsAdministrator       : roleService.isAbsAdministrator(),
                    isAdministrator          : roleService.isAdministrator()
                };
               
            }
        }
    ]);
});
