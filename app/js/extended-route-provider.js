'use strict';

define(['app', 'angular', 'services/app-config-service', 'scbd-angularjs-services/locale'], function(app, angular) {
        
    var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');

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
                route.templateUrl += '?v='+window.appVersion;
            }

            var ext = { resolve: route.resolve || {} };

            if(!route.controller && route.resolveController && typeof(route.resolveController)=="string")
                templateModule = route.resolveController;

            if(!route.controller && route.resolveController) {
                ext.controller         = proxy;
                ext.resolve.controller = resolveController(templateModule);
            }

            if(route.resolveUser) {
                ext.resolve.user = resolveUser();
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
            return ['$q', '$rootScope', 'authentication', function($q, $rootScope, authentication) {
                return $q.when(authentication.getUser()).then(function (user) {
                    $rootScope.user = user;
                    return user;
                });
            }];
        }

        //============================================================
        //
        //
        //============================================================
        function resolveController(controllerModule) {

            return ['$q', '$route', '$filter', function($q, $route, $filter) {

                var deferred = $q.defer();

                var controllers = [];
                controllers.push(controllerModule);
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
                }, function(){
                    deferred.reject("controller not found: " + controllerModule);
                });

                return deferred.promise;
            }];
        }

        return angular.extend($routeProvider, { when: new_when });
    }]);
});
