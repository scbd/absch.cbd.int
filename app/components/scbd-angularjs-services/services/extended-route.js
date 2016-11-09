define(['require', 'app', 'angular', 'angular-route'], function(require, app, angular) { 'use strict';

    var baseUrl = require.toUrl('');

    app.provider('extendedRoute', ["$routeProvider", function($routeProvider) {

        var __when = $routeProvider.when.bind($routeProvider);

        //============================================================
        //
        //
        //============================================================
        function new_when(path, route) {

            var templateUrl = route.templateUrl;
            var templateModule;

            if(templateUrl) {

                if(templateUrl.indexOf('/')!==0) {
                    route.templateUrl = baseUrl + templateUrl;
                    templateModule  = changeExtension(templateUrl, '');
                }
                else {
                    templateModule = changeExtension(templateUrl, '.js');
                }
            }

            var ext = { resolve: route.resolve || {} };

            if(!route.controller && route.resolveController && typeof(route.resolveController)=="string")
                templateModule = route.resolveController;

            if(!route.controller && route.resolveController) {
                ext.controller         = proxy;
                ext.resolve.controller = resolveController(templateModule);
            }

            return __when(path, angular.extend(route, ext));
        }

        //********************************************************************************
        //********************************************************************************
        //********************************************************************************
        //********************************************************************************

        function changeExtension(path, ext) {
            return path.replace(/(\.[a-z0-9]+$)/gi, ext);
        }

        //============================================================
        //
        //
        //============================================================
        function proxy($injector, $scope, $route, controller) {

            if(!controller)
                return;

            var locals = angular.extend($route.current.locals, { $scope: $scope });

            return $injector.instantiate(controller, locals);
        }
        proxy.$inject = ['$injector', '$scope', '$route', 'controller'];

        //============================================================
        //
        //
        //============================================================
        function resolveUser() {
            return ['$rootScope', 'authentication', function($rootScope, authentication) {
                return authentication.getUser().then(function (user) {
//                    console.log('route',user);
                    return user;
                });
            }];
        }

        //============================================================
        //
        //
        //============================================================
        function resolveController(controllerModule) {

            return ['$q', function($q) {

                var deferred = $q.defer();

                require([controllerModule], function (module) {
                    deferred.resolve(module);
                }, function(){
                    deferred.reject("controller not found: " + controllerModule);
                });

                return deferred.promise;
            }];
        }

        return angular.extend($routeProvider, { when: new_when });
    }]);
});
