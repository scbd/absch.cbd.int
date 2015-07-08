define(['app','ng-breadcrumbs','angular-localizer','scbd-angularjs-services','scbd-angularjs-filters',
    '/app/views/directives/login.directive.html.js',
    '/app/views/directives/xuser-notifications.js',
    'ngSmoothScroll'
], function(app, ngSmoothScroll) {
    'use strict';

    app.controller('TemplateController', ['$scope', '$rootScope', '$window', '$location', 'authentication', '$browser', 'realmConfiguration', 'underscore', 'IUserNotifications', '$timeout','$filter',
     '$anchorScroll','breadcrumbs',//'localStorageService',localStorageService,
        function($scope, $rootScope, $window, $location, authentication, $browser, realmConfiguration, _, userNotifications, $timeout, $filter,$anchorScroll,breadcrumbs) {

            $scope.controller = "TemplateController";
            $scope.breadcrumbs     = breadcrumbs;
        $scope.$root.pageTitle = { text: "" };
        // $scope.goHome               = function() { $location.path('/'); };
        // $scope.currentPath          = function() { return $location.path(); };.

        //============================================================
        //
        //
        //============================================================
        $scope.gotoAnchor = function(x) {
          var newHash = 'anchor' + x;
          if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash('anchor' + x);
          } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
          }
        };

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

//            $scope.updateStorage = function(){
//                localStorageService.set('hideDisclaimer', true);
//                $scope.hideDisclaimer=true;
//            };
//    	    $scope.hideDisclaimer = localStorageService.get('hideDisclaimer');
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
            };

            $rootScope.$on("$locationChangeSuccess", function() {
                $anchorScroll();
            });
        }
    ]);
});
