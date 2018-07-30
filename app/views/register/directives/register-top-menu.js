define(['app', "text!views/register/directives/register-top-menu.html",
'underscore', 'services/role-service'], function(app, template, _) {

    app.directive("registerTopMenu", ['roleService', '$rootScope', 'realm', function(roleService, $rootScope, realm) {

        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {},
            link: function($scope, element, attrs) {

                $scope.roles = {
                    isAdministrator: roleService.isAdministrator(),
                    isAbsAdministrator: roleService.isAbsAdministrator()
                };
                $scope.user = $rootScope.user;
                $scope.isBCH = realm.is('BCH')
                $scope.isABS = realm.is('ABS')
            }
        };
    }]);
});
