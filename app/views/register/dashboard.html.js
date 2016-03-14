define(['app',
 '/app/services/role-service.js', 
 '/app/views/register/directives/record-overview.js'], function(app) {
    "use strict";
    app.controller("DashboardController", ["$rootScope", "$scope", "underscore", "roleService", "IWorkflows", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$element","$timeout",
        function($rootScope, $scope, _, roleService, workflows, realm, $q, $routeParams, $location, $filter, $http, $element, $timeout) {

            $timeout(function(){
                $element.find('[data-toggle="tooltip"]').tooltip();
            },50);    
                        
             
            //====================================================================================
            $scope.isFilter = function(filter) {
                return $scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
            }

            if ($rootScope.user.isAuthenticated) {
                $scope.roles = {
                    isAbsPublishingAuthority : roleService.isAbsPublishingAuthority(),
                    isAbsNationalFocalPoint  : roleService.isAbsNationalFocalPoint(),
                    isAbsAdministrator       : roleService.isAbsAdministrator(),
                    isAdministrator          : roleService.isAdministrator(),
                    isAbsNationalAuthorizedUser : roleService.isAbsNationalAuthorizedUser(),
                    isUser                      : roleService.isUser()
                };
                
                if($scope.user.government)
                    $scope.userCountry = {identifier:$scope.user.government };

            }
        }
    ]);
});
