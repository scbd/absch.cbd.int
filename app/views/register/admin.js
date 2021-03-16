import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    export { default as template } from './admin.html';

  export default ["$rootScope", "$scope", "roleService", 'localStorageService',
        function($rootScope, $scope, roleService, localStorageService) {

            if ($rootScope.user.isAuthenticated) {
                $scope.roles = {
                    isAdministrator       : roleService.isAdministrator()
                };
               
                $scope.isValidatingTranslation = localStorageService.get('validateTranslation');

                $scope.validateTranslation = function(validate){
                    localStorageService.set('validateTranslation', validate);
                    $scope.isValidatingTranslation = validate;

                    if(validate)
                        $('body#top').addClass('validate-translation')
                    else
                        $('body#top').removeClass('validate-translation')
                }
            }
        }
    ];

