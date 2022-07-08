import app from '~/app';
import '~/services/main';
import '~/views/register/directives/register-top-menu';
import reportsIndexT from '~/app-text/views/register/reports/index.json';
 
    export { default as template } from './index.html';

export default ["$rootScope", "$scope", "roleService", "realm", 'translationService',
    async function ($rootScope, $scope, roleService, realm, translationService) {
        translationService.set('reportsIndexT', reportsIndexT);
        // if ($rootScope.user.isAuthenticated) {
        //     $scope.roles = {
        //         isAdministrator       : roleService.isAdministrator()
        //     };
            
        // }
        try{
            $scope.loading = true;
            if(realm.is('ABS'))
                $scope.reports = (await import('~/app-data/abs/kibana-reports.js')).reports;
            else
                $scope.reports = (await import('~/app-data/bch/kibana-reports.js')).reports;
        }
        finally{
            $scope.loading = false;
        }
    }
];

