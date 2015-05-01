define(['app',
    '/app/views/directives/login.directive.html.js',
    '/app/views/directives/xuser-notifications.js'
], function(app) {
    'use strict';

    app.controller('TemplateController', ['$scope', '$rootScope', '$window', '$location', 'authentication', '$browser', 'realmConfiguration', 'underscore', 'IUserNotifications', '$timeout','$filter',
        function($scope, $rootScope, $window, $location, authentication, $browser, realmConfiguration, _, userNotifications, $timeout, $filter) {

            $scope.controller = "TemplateController";

            $scope.$root.getRoleName = function(roleName) {
                if (roleName) {
                    var realmConfig = _.where(realmConfiguration, {
                        host: $location.$$host
                    });
                    if (realmConfig.length > 0) {
                        var role = _.find(realmConfig[0].roles, function(key) {
                            return _.keys(key)[0] == roleName;
                        });
                        // console.log(realmConfig, role)
                        if (role)
                            return _.values(role)[0];
                        else
                            throw roleName + ' role is not configured for realm ' + realmConfig[0].realm + ', please update realm-configuration.js';
                    } else
                        throw 'Realm not configured, please update realm-configuration.js';
                }
            };

            //============================================================
            //
            //
            //============================================================
            $scope.getClass = function(path) {
                if ($location.path().substr(0, path.length) == path) {
                    return true;
                } else {
                    return false;
                }
            };

            //============================================================
            //
            //
            //============================================================
            $scope.env_name = "ABS-CH";
            $scope.production_env = true;
            $scope.development_env = false;
            $scope.training_env = false;

            if ($location.absUrl().toLowerCase().indexOf("://dev.absch.cbd.int") > 0 || $location.absUrl().toLowerCase().indexOf("localhost:2010") > 0) {
                $scope.development_env = true;
                $scope.training_env = false;
                $scope.production_env = false;
                $scope.env_name = "DEVELOPMENT";
            }
            if ($location.absUrl().toLowerCase().indexOf("://training-absch.cbd.int") > 0) {
                $scope.development_env = false;
                $scope.training_env = true;
                $scope.production_env = false;
                $scope.env_name = "TRAINING";
            }


            //============================================================
            //
            //
            //============================================================
            function setCookie(name, value, days, path) {

                var cookieString = escape(name) + "=";

                if (value) cookieString += escape(value);
                else days = -1;

                if (path)
                    cookieString += "; path=" + path;

                if (days || days == 0) {

                    var expirationDate = new Date();

                    expirationDate.setDate(expirationDate.getDate() + days);

                    cookieString += "; expires=" + expirationDate.toUTCString();
                }

                document.cookie = cookieString
            };
           

            //============================================================
            //
            //
            //============================================================
            $scope.actionSignOut = function() {
                authentication.signOut();
            };

            //============================================================
            //
            //
            //============================================================
            $scope.actionSignup = function() {
                var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri=' + redirect_uri;
            };

            //============================================================
            //
            //
            //============================================================
            $scope.actionPassword = function() {
                var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                $window.location.href = 'https://accounts.cbd.int/password?redirect_uri=' + redirect_uri;
            };

            //============================================================
            //
            //
            //============================================================
            $scope.actionProfile = function() {
                var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                $window.location.href = 'https://accounts.cbd.int/profile?redirect_uri=' + redirect_uri;

            };

            $scope.closePopup = function() {
                $('#loginDialog').modal('hide')
            }

            //============================================================
            //
            //
            //============================================================
            function receiveMessage(event) {
                if (event.origin != 'https://accounts.cbd.int')
                    return;

                var message = JSON.parse(event.data);

                if (message.type == 'ready')
                    event.source.postMessage('{"type":"getAuthenticationToken"}', event.origin);

                if (message.type == 'authenticationToken') {
                    //console.log($browser.cookies().authenticationToken);
                    if (message.authenticationToken && (!$browser.cookies().authenticationToken 
                                                    || $browser.cookies().authenticationToken== "undefined" || $browser.cookies().authenticationToken== "null")) {
                       // setCookie('authenticationToken', message.authenticationToken, 7, '/');
//                        console.log('token from accounts', message.authenticationToken);
                        $browser.cookies().authenticationToken = message.authenticationToken;
                        authentication.getUser(true).then(function(user){
//                            console.log('token from accounts', user);
                            $rootScope.$broadcast('signIn', user);
                        })

                    }
                    if (!message.authenticationToken && $browser.cookies().authenticationToken) {
//console.log('signout');
                        //window.setTimeout(function(){
                        authentication.signOut();

                        // $window.location.href = $window.location.href;
                        // },1000)
                    }
                }
            }

            window.addEventListener('message', receiveMessage, false);

            var iframe = angular.element(document.querySelector('#authenticationFrame'))[0];
            iframe.contentWindow.postMessage('{"type":"getAuthenticationToken"}', 'https://accounts.cbd.int');

        }
    ]);

    function _loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
});
