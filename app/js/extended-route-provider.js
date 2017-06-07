'use strict';

define(['app', 'angular', '../services/app-config-service', 'scbd-angularjs-services/locale'], function(app, angular) {
        
    app.provider('extendedRoute', ["$routeProvider", function($routeProvider) {
        
        var baseUrl = "";//$('#appBaseUrl').text();

        var __when = $routeProvider.when.bind($routeProvider);

        //============================================================
        //
        //
        //============================================================
        function new_when(path, route) {

            var ext = { resolve: route.resolve || {} };

            if(route.resolveController) {
                ext.controller = proxy;
                ext.resolve.controller = resolveController();
            }

            if(route.resolveUser) {
                ext.resolve.user = resolveUser();
            }
            var prj = proxy;
            route.templateUrl += '?v='+window.appVersion;
            return __when(baseUrl+path, angular.extend(route, ext));
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

                //TODO: I'm not sure if this is the most elegant approach... reconsider
                //NOTE: for some reason the subTemplareUrl is staying as the old one, not as the newly defined one. Yet the document_type is being changed.
                if($route.current.$$route.subTemplateUrl && $route.current.$$route.subTemplateUrl.slice(-1) == '-'){
                    $route.current.$$route.subTemplateUrlFull = $route.current.$$route.subTemplateUrl.slice(0, -1) +
                                                                $filter("mapSchema")($route.current.params.document_type) + '.html';
                    if($route.current.params.folder)
                        $route.current.$$route.subTemplateUrlFull = $route.current.$$route.subTemplateUrlFull
                                                                          .replace(':folder' , $route.current.params.folder)
                }
                else
                    $route.current.$$route.subTemplateUrlFull = $route.current.$$route.subTemplateUrl;

                if($route.current.$$route.subTemplateUrlFull && !$route.current.$$route.ignoreSubController)
                  controllers.push($route.current.$$route.subTemplateUrlFull + '.js');
                require(controllers, function (module) {
                    deferred.resolve(module);
                });

                return deferred.promise;
            }];
        }
    }]);
});
