'use strict';

define(['angular', 'angular-sanitize', 'angular-loading-bar', 'angular-animate', 'text-angular', 'ngSmoothScroll',
    ],
    function(angular) {

        var dependencies = ['ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-animate', 'ngAria' ,'ngMaterial','toastr',
            'ngSanitize', 'angular-intro', 'scbdControls', 'ngLocalizer', 'textAngular', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll'
        ];
        angular.defineModules(dependencies);
        var app = angular.module('app', dependencies);


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

        app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
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

        return app;
    });
