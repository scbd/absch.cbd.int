define(['app', '/app/js/common.js',
'/app/views/register/directives/register-top-menu.js', 'ngDialog',
'/app/views/register/user-preferences/user-preference-filter.js',
'/app/services/local-storage-service.js','angular-gravatar'
], function (app) {
    app.controller('userPreferencesCtrl', ['$scope', '$http', '$timeout', '$element', 'ngDialog', 
    '$routeParams', 'localStorageService', '$location',
        function ($scope, $http, $timeout, $element, ngDialog, $routeParams, 
        localStorageService, $location) {
            
            $scope.runFilter = function(filter){

                localStorageService.set("run-query", filter.filters)
                $location.path('/search/run-query')
            }
            
        }]
    );

});
