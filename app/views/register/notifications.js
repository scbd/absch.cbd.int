import app from 'app';
import _ from 'lodash';
import 'services/main';
import 'components/scbd-branding/main';
import 'views/register/directives/register-top-menu';
    
    app.controller("NotificationsController", ["$rootScope", "$scope", "roleService", "IWorkflows", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$element","$timeout",
        function($rootScope, $scope, roleService, workflows, realm, $q, $routeParams, $location, $filter, $http, $element, $timeout) {

            $timeout(function(){
                $element.find('[data-toggle="tooltip"]').tooltip();
            },50);    
                        
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
    ]);

