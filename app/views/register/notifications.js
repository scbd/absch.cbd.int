define(['app',
        'services/role-service',
        'components/scbd-branding/directives/xuser-notifications-panel',
        'views/register/directives/register-top-menu'
  ], function(app) {
    "use strict";
    app.controller("NotificationsController", ["$rootScope", "$scope", "underscore", "roleService", "IWorkflows", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$element","$timeout",
        function($rootScope, $scope, _, roleService, workflows, realm, $q, $routeParams, $location, $filter, $http, $element, $timeout) {

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
});
