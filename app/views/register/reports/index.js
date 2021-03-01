define(['app', 
 'services/main', 
 'views/register/directives/register-top-menu'], function(app) {
 "use strict";
    app.controller("ReportsController", ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            // if ($rootScope.user.isAuthenticated) {
            //     $scope.roles = {
            //         isAdministrator       : roleService.isAdministrator()
            //     };
               
            // }
        }
    ]);
});
