define(['angular-flex', 'angular-animate', 'angular-sanitize', 'angular-loggly-logger', 'angular-joyride', 'ngMeta'],
    function(angular) { 'use strict';

        var app = angular.module('app', angular.defineModules([
            'ngAnimate', 'ngSanitize', 'ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'toastr',
            'angular-intro', 'scbdControls', 'ngLocalizer', 'angularTrix', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll', 'logglyLogger', 'angular-joyride', 'ngMeta'
        ]));

        app.config(["LogglyLoggerProvider", 'ngMetaProvider',  function (LogglyLoggerProvider, ngMetaProvider) {

            LogglyLoggerProvider
                .includeUrl(true)
                .includeUserAgent(true)
                .includeTimestamp(true)
                .sendConsoleErrors(true)
                .endpoint('/error-logs');

       
            ngMetaProvider.useTitleSuffix(true);
            ngMetaProvider.setDefaultTitle(window.scbdApp.title);
            ngMetaProvider.setDefaultTitleSuffix(' | '+window.scbdApp.title);
            ngMetaProvider.setDefaultTag('description', ' | '+(window.scbdApp.description||window.scbdApp.title));
        }])

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

       app.run(['ngMeta', 'LogglyLogger', 'realm', '$window', function (ngMeta, logglyLogger, realm, $window) {

            var appVersion = $window.scbdApp.version||'localhost';
            logglyLogger.fields({ realm: realm.value, appVersion: appVersion });

            ngMeta.init();

        }]);
        
        return app;
    });
