import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    export { default as template } from './index.html';

    export default ["$rootScope", "$scope", "roleService", "realm",
        async function($rootScope, $scope, roleService, realm) {

            // if ($rootScope.user.isAuthenticated) {
            //     $scope.roles = {
            //         isAdministrator       : roleService.isAdministrator()
            //     };
               
            // }
            if(realm.is('ABS'))
                $scope.reports = await import('~/app-data/abs/kibana-reports.js');
            else
                $scope.reports = await import('~/app-data/bch/kibana-reports.js');
        }
    ];

