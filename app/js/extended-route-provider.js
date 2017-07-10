'use strict';

define(['app', 'angular', 'services/app-config-service', 'scbd-angularjs-services/locale'], function(app, angular) {
        
    app.provider('extendedRoute', ["$routeProvider", function($routeProvider) {
        
        var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');

        var __when = $routeProvider.when.bind($routeProvider);

        //============================================================
        //
        //
        //============================================================
        function new_when(path, route) {

            var ext = { resolve: route.resolve || {} };

            var templateUrl = route.templateUrl;
            
            if(templateUrl) {

                if(templateUrl.indexOf('/')!==0) {
                    route.templateUrl = baseUrl + templateUrl;
                }
                route.templateUrl += '?v='+window.appVersion;
            }
            if(route.resolveController) {
                ext.controller = proxy;
                ext.resolve.controller = resolveController();
            }

            if(route.resolveUser) {
                ext.resolve.user = resolveUser();
            }
            var prj = proxy;

            return __when(path, angular.extend(route, ext));
        }

        return angular.extend($routeProvider, { when: new_when });

        //********************************************************************************
        //********************************************************************************
        //********************************************************************************
        //********************************************************************************

        //============================================================
        //
        //
        //============================================================
        function proxy($injector, $scope, $route, controller) {

            if(!controller)
                return;

            var locals = angular.extend($route.current.locals, { $scope: $scope });

            return $injector.invoke(controller, undefined, locals);
        }
        proxy.$inject = ['$injector', '$scope', '$route', 'controller'];

        //============================================================
        //
        //
        //============================================================
        function resolveUser() {
            return ['$rootScope', 'authentication', function($rootScope, authentication) {
                return authentication.getUser().then(function (user) {
                    return user;
                });
            }];
        }


        //============================================================
        //
        //
        //============================================================
        function resolveController() {

            return ['$q', '$route', '$filter','$location','underscore',
             function($q, $route, $filter, $location, _) {

                var deferred = $q.defer();

                var controllers = [];
                controllers.push($route.current.$$route.templateUrl.replace(/(\?v=)/, '.js?v='));


                require(controllers, function (module) {
                    deferred.resolve(module);
                });

                return deferred.promise;
            }];
        }
    }]);
});
