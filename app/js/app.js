'use strict';

define(['angular', 'angular-sanitize', 'angular-loading-bar', 'angular-animate','ngAria' ,'ngMaterial', 'toastr',
        'text-angular', 'ngSmoothScroll'
    ],
    function(angular) {

        var dependencies = ['ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-animate', 'ngAria' ,'ngMaterial','toastr',
            'ngSanitize', 'angular-intro', 'scbdControls', 'ngLocalizer', 'textAngular', 'cbd-forums', 'LocalStorageModule',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages'
        ];
        angular.defineModules(dependencies);
        var app = angular.module('app', dependencies);

        app.config(['$controllerProvider', '$compileProvider', '$provide', '$filterProvider', '$httpProvider',
            function($controllerProvider, $compileProvider, $provide, $filterProvider, $httpProvider) {
                // console.log($routeProvider);
                //app.controllerProvider = $controllerProvider;
                //app.routeProvider      = $routeProvider;
                //app.compileProvider    = $compileProvider;
                app.filter = function(name, param1, param2, param3, param4) {
                    return (fromCache('filter', name) ||
                        toCache('filter', name, $filterProvider.register(name, param1, param2, param3, param4))).data;
                };

                app.factory = function(name, param1, param2, param3, param4) {
                    return (fromCache('factory', name) ||
                        toCache('factory', name, $provide.factory(name, param1, param2, param3, param4))).data;
                };

                app.value = function(name, param1, param2, param3, param4) {
                    return (fromCache('value', name) ||
                        toCache('value', name, $provide.value(name, param1, param2, param3, param4))).data;
                };

                app.controller = function(name, param1, param2, param3, param4) {
                    return (fromCache('controller', name) ||
                        toCache('controller', name, $controllerProvider.register(name, param1, param2, param3, param4))).data;
                };

                app.directive = function(name, param1, param2, param3, param4) {
                    return (fromCache('directive', name) ||
                        toCache('directive', name, $compileProvider.directive(name, param1, param2, param3, param4))).data;
                };



                //==========================================
                //==========================================
                //==========================================
                //==========================================

                var lazyCache = {};

                function fromCache(type, name) {

                    var key = type + ':' + name;

                    if (lazyCache[key])
                        console.log('Already defined: ' + key);

                    return lazyCache[key];
                }

                function toCache(type, name, data) {

                    var key = type + ':' + name;

                    if (lazyCache[key])
                        throw 'Cannot cache: Already defined: ' + key;

                    lazyCache[key] = {
                        data: data
                    };

                    return lazyCache[key];
                }

            }
        ]);
        
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

        app.run(function($rootScope, $location) {
            $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
                //padding route attributes to the rootscope
                if (current.$$route && current.$$route.subTemplateUrl)
                    $rootScope.subTemplateUrl = current.$$route.subTemplateUrlFull;
            });

        });

        return app;
    });
