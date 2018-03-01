define(['angular-flex', 'angular-sanitize', 'angular-loggly-logger'],
    function(angular) { 'use strict';

        var app = angular.module('app', angular.defineModules([
            'ngRoute', 'ngCookies', 'chieffancypants.loadingBar', 'toastr',
            'ngSanitize', 'angular-intro', 'scbdControls', 'ngLocalizer', 'textAngular', 'cbd-forums',
            'ng-breadcrumbs', 'scbdServices', 'scbdFilters', 'smoothScroll', 'ngMessages', 'ngStorage', 'ngDialog',
            'infinite-scroll', 'logglyLogger', 'angular-joyride'
        ]));

        app.config(["LogglyLoggerProvider", function (LogglyLoggerProvider) {

            LogglyLoggerProvider
                .includeUrl(true)
                .includeUserAgent(true)
                .includeTimestamp(true)
                .sendConsoleErrors(true)
                .endpoint('/api/v2016/error-logs');

        }]);

       app.run(['LogglyLogger', 'realm', '$window', function (logglyLogger, realm, $window) {

            var appVersion = $window.appVersion||'localhost';
            logglyLogger.fields({ realm: realm.value, appVersion: appVersion });

        }]);
        
        return app;
    });
