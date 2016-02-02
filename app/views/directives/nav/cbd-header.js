define(['app', 'underscore','angular-localizer','scbd-angularjs-services','scbd-angularjs-filters',
    '/app/views/directives/login.directive.html.js',
    '/app/views/directives/xuser-notifications.js',
    'ngAria', 'angular-animate',
], function (app, _) {
        app.directive('cbdHeader', function () {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            templateUrl: '/app/views/directives/nav/cbd-header.html',
            scope: {
                    uid: '@',
                    user : '='
            },
            link: ['$scope', '$q', '$element', function ($scope, $q, $element) {

            }]
            , controller: ['$scope', '$rootScope', '$window', '$location', 'authentication', '$browser', 'realmConfiguration',
                        'underscore', 'IUserNotifications', '$timeout','$filter','$route','$anchorScroll',
            function($scope, $rootScope, $window, $location, authentication, $browser, realmConfiguration,
                    _, userNotifications, $timeout, $filter, $route, $anchorScroll) {


            //============================================================
            //
            //
            //============================================================
            $scope.actionSignOut = function() {
                authentication.signOut();
                if($route.current.locals.securized)
                    $location.path('/');
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




                        }]
                };

        });
});
