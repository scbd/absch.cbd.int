'use strict';

define(['app', 'angular', 'authentication'], function(app, angular) {

    app.provider('extendedRoute', ["$routeProvider", function($routeProvider) {

        var __when = $routeProvider.when.bind($routeProvider);
  // console.log(__when);
        //============================================================
        //
        //
        //============================================================
        function new_when(path, route) {

            var ext = { resolve: {} };

            if(route.resolveController) {
                ext.controller = proxy;
                ext.resolve.controller = resolveController();
            }

            if(route.resolveUser) {
                ext.resolve.user = resolveUser();
            }

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
//                    console.log('route',user);
                    return user;
                });
            }];
        }


        //============================================================
        //
        //
        //============================================================
        function resolveController() {
            // var realmConfigurations =[{'host':'absch.cbd.int', 'realm' : 'ABS'},{'host':'dev.absch.cbd.int', 'realm' : 'ABS-DEV'},{'host':'training-absch.cbd.int', 'realm' : 'ABS-TRAINING'}
            //                           ,{'host':'localhost', 'realm' : 'ABS-DEV'},{'host':'127.0.0.1', 'realm' : 'ABS-DEV'}]

            return ['$q', '$route', '$filter','realm', '$location','underscore','realmConfiguration', function($q, $route, $filter, realm, $location, _,realmConfiguration) {

                //change relam if not production
            //    console.log(realmConfiguration)

                if($location.$$host != 'absch.cbd.int'){

                    var realmConfig = _.where(realmConfiguration,{host:$location.$$host});
                    //console.log(realmConfig)
                    if(!realmConfig)
    				     realm.value = realmConfig[0].realm;
                    else
                        realm.value = 'ABS-DEV';
    			}

                var deferred = $q.defer();

                var controllers = [];
                controllers.push($route.current.$$route.templateUrl + '.js');

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
