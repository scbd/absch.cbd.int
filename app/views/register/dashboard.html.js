define(['app', '/app/views/directives/switch-realm-directive.html.js', '/app/services/role-service.js'], function(app) {
    "use strict";
    app.controller("DashboardController", ["$rootScope", "$scope", "underscore", "roleService", "IWorkflows", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http",
        function($rootScope, $scope, _, roleService, workflows, realm, $q, $routeParams, $location, $filter, $http) {




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

                $scope.userCountry = {identifier:$scope.user.government };
            }
        }
    ]);
});
