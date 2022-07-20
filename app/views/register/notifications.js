import app from '~/app';
import _ from 'lodash';
import '~/services/main';
import '~/components/scbd-branding/main';
import '~/views/register/directives/register-top-menu';
import notificationsT from '~/app-text/views/register/notifications.json';

    export { default as template } from './notifications.html';

    export default ["$rootScope", "$scope", "roleService", "IWorkflows", "realm", "$q",
    "$routeParams", '$location', "$filter", "$http", "$element", "$timeout", "translationService",
        function ($rootScope, $scope, roleService, workflows, realm, $q, $routeParams, $location, $filter, $http, $element, $timeout, translationService) {

            $timeout(function(){
                $element.find('[data-bs-toggle="tooltip"]').tooltip();
            },50);    
            translationService.set('notificationsT', notificationsT);         
            $scope.user = $rootScope.user;
            
            if ($scope.user.isAuthenticated) {
                $scope.roles = {
                    isPublishingAuthority : roleService.isPublishingAuthority(),
                    isNationalFocalPoint  : roleService.isNationalFocalPoint(),
                    isAdministrator       : roleService.isAdministrator(),
                    isNationalAuthorizedUser : roleService.isNationalAuthorizedUser(),
                    isUser                      : roleService.isUser()
                };
                
                if($scope.user.government)
                    $scope.userCountry = {identifier:$scope.user.government };

            }
            
            $scope.realm = realm.value;
        }
    ];

