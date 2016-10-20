'use strict';
define(['angular', 'angular-sanitize', 'angular-loading-bar', 'angular-animate', 'text-angular', 'ngSmoothScroll',
    ],
    function(angular) {

        var dependencies = ['ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-animate', 'ngAria' ,'ngMaterial','toastr',
            'ngSanitize', 'angular-intro', 'scbdControls', 'ngLocalizer', 'textAngular', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll', 'logglyLogger'
        ];
        angular.defineModules(dependencies);
        var app = angular.module('app', dependencies);

        app.config(["LogglyLoggerProvider", "realmProvider", function (LogglyLoggerProvider, realm) {

            LogglyLoggerProvider
                .includeUrl(true)
                .includeUserAgent(true)
                .includeTimestamp(true)
                .sendConsoleErrors(true)
                .endpoint('/api/v2016/error-logs');
        }]);

        app.config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                autoDismiss: true,
                containerId: 'toast-container',
                maxOpened: 1,
                newestOnTop: true,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
                preventOpenDuplicates:false,
                target: 'body',
                timeOut: 2000,
                });
            });

       app.run(['$route', '$rootScope', '$location', 'LogglyLogger', 'realm', '$cookies', 
       function ($route, $rootScope, $location, logglyLogger, realm, $cookies) {

            var appVersion = $cookies.get('appVersion')||'localhost';
            logglyLogger.fields({ realm: realm.value, appVersion: appVersion })

            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                //padding route attributes to the rootscope
                if (current.$$route && current.$$route.subTemplateUrl)
                    $rootScope.subTemplateUrl = current.$$route.subTemplateUrlFull;
            });

            // todo: would be proper to change this to decorators of $location and $route
            $location.update_path = function (path, keep_previous_path_in_history) {
              if ($location.path() == path) return;

              var routeToKeep = $route.current;
              $rootScope.$on('$locationChangeSuccess', function () {
                if (routeToKeep) {
                  $route.current = routeToKeep;
                  routeToKeep = null;
                }
              });

              $location.path(path);
              if (!keep_previous_path_in_history) $location.replace();
            };
        }]);
        // app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        //     var original = $location.path;
        //     $location.path = function (path, reload) {
        //         console.log(path);
        //         if (reload === false) {
        //             var lastRoute = $route.current;
        //             var un = $rootScope.$on('$locationChangeSuccess', function () {
        //                 $route.current = lastRoute;
        //                 un();
        //             });
        //         }
        //         return original.apply($location, [path]);
        //     };
        // }])
        return app;
    });
