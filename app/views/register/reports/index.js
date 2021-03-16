import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    export { default as template } from './index.html';

    export default ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            // if ($rootScope.user.isAuthenticated) {
            //     $scope.roles = {
            //         isAdministrator       : roleService.isAdministrator()
            //     };
               
            // }
        }
    ];

