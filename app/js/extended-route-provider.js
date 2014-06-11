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
                    return $rootScope.user = user;
                });
            }];
        }

        //============================================================
        //
        //
        //============================================================
        function resolveController() {
          
            return ['$q', '$route', function($q, $route) {
     
                var deferred = $q.defer();
     
                var controllers = [];
                controllers.push($route.current.$$route.templateUrl + '.js');

                //TODO: I'm not sure if this is the most elegant approach... reconsider
                //NOTE: for some reason the subTemplareUrl is staying as the old one, not as the newly defined one. Yet the document_type is being changed.
                if($route.current.$$route.subTemplateUrl.indexOf('/app/views/forms/edit/edit-') != -1)
                  $route.current.$$route.subTemplateUrl = '/app/views/forms/edit/edit-' + $route.current.params.document_type + '.html';

                if($route.current.$$route.subTemplateUrl)
                  controllers.push($route.current.$$route.subTemplateUrl + '.js');
                require(controllers, function (module) {
                    deferred.resolve(module);
                });
     
                return deferred.promise;
            }];
        }
    }]);
});
