import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    app.controller("ReportsController", ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            // if ($rootScope.user.isAuthenticated) {
            //     $scope.roles = {
            //         isAdministrator       : roleService.isAdministrator()
            //     };
               
            // }
        }
    ]);

