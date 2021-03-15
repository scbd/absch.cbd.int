import app from 'app';
import 'services/main';
import 'views/register/directives/register-top-menu';
 
    app.controller("AdminController", ["$rootScope", "$scope", "roleService", 'localStorageService',
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
    ]);

