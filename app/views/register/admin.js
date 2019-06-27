define(['app', 
 'services/role-service', 
 'views/register/directives/register-top-menu'], function(app) {
 "use strict";
    app.controller("AdminController", ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            if ($rootScope.user.isAuthenticated) {
                $scope.roles = {
                    isAdministrator       : roleService.isAdministrator()
                };
               
            }
        }
    ]);
});
