define(['angular-flex', 'angular-animate', 'angular-sanitize', 'angular-loggly-logger', 'angular-joyride'],
    function(angular) { 'use strict';

        var app = angular.module('app', angular.defineModules([
            'ngAnimate', 'ngSanitize', 'ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'toastr',
            'angular-intro', 'scbdControls', 'ngLocalizer', 'angularTrix', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll', 'logglyLogger', 'angular-joyride', 'dndLists', 'angucomplete-alt'
        ]));

        app.config(["LogglyLoggerProvider", function (LogglyLoggerProvider) {

            LogglyLoggerProvider
                .includeUrl(true)
                .includeUserAgent(true)
                .includeTimestamp(true)
                .sendConsoleErrors(true)
                .endpoint('/error-logs');

        }]);

        app.factory('$exceptionHandler', ['$log', function($log) {
            return function myExceptionHandler(exception, cause) {
                if(typeof(exception) == 'string' && /^Possibly unhandled rejection: /.test(exception)){
                    try{
                        exception = exception.replace(/^Possibly unhandled rejection: /, '');
                        exception = JSON.parse(exception);
                        exception = JSON.stringify(exception.data || exception);
                    }
                    catch(e){}
                }
                $log.warn(exception);
            };
        }])

       app.run(['LogglyLogger', 'realm', '$window', function (logglyLogger, realm, $window) {

            var appVersion = $window.appVersion||'localhost';
            logglyLogger.fields({ realm: realm.value, appVersion: appVersion });

        }]);
        
        return app;
    });
