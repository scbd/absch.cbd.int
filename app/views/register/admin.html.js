define(['app', '/app/views/directives/switch-realm-directive.html.js',
 '/app/services/role-service.js', 
 '/app/views/register/directives/record-overview.js'], function(app) {
 "use strict";
    app.controller("AdminController", ["$rootScope", "$scope", "roleService", 
        function($rootScope, $scope, roleService) {

            if ($rootScope.user.isAuthenticated) {
                $scope.roles = {
                    isAbsPublishingAuthority : roleService.isAbsPublishingAuthority(),
                    isAbsNationalFocalPoint  : roleService.isAbsNationalFocalPoint(),
                    isAbsAdministrator       : roleService.isAbsAdministrator(),
                    isAdministrator          : roleService.isAdministrator(),
                    isAbsNationalAuthorizedUser : roleService.isAbsNationalAuthorizedUser(),
                    isUser                      : roleService.isUser()
                };
               
            }
        }
    ]);
});
