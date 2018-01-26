'use strict';
define(['angular', 'angular-sanitize', 'angular-loading-bar', 'angular-animate',
 'text-angular', 'ngSmoothScroll', 'angular-loggly-logger', 'angular-joyride'],
    function(angular) {

        var dependencies = ['ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'toastr',
            'ngSanitize', 'angular-intro', 'scbdControls', 'ngLocalizer', 'textAngular', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll', 'logglyLogger', 'angular-joyride'
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

       app.run(['$route', '$rootScope', '$location', 'LogglyLogger', 'realm', '$cookies', '$window',
       function ($route, $rootScope, $location, logglyLogger, realm, $cookies, $window) {

            var appVersion = $window.appVersion||'localhost';
            logglyLogger.fields({ realm: realm.value, appVersion: appVersion })

        }]);
        
        return app;
    });
