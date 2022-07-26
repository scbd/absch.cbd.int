import app from '~/app';
import template from 'text!./login.html';
import $ from 'jquery';
import 'css!~/components/scbd-branding/directives/header/login.css';
import '~/components/scbd-angularjs-services/main';
import loginAccountT from '~/app-text/components/scbd-branding/directives/header/login.json';

app.directive('loginAccount', [function() {
        return {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                 user: '=',
            },
            controller: ['$scope', '$http', '$window', '$location', '$browser','authentication','$rootScope','$timeout', '$route', 'translationService',
             function ($scope, $http, $window, $location, $browser, authentication, $rootScope,$timeout, $route, translationService) {
              translationService.set('loginAccountT', loginAccountT);
              $scope.sessionExpiredAlert = false
              $scope.email = null;
              $scope.password = null;
              $scope.show_feed_content= false;

              //============================================================
              //
              //
              //============================================================
              $scope.doSignIn = function doSignIn () {

                $scope.errorInvalid = false;
                    $scope.errorTimeout = false;
                    $scope.waiting      = true;
                    authentication.signIn($scope.email, $scope.password)
                    .then(function(user){
                          
                          $scope.user=user;
                          $timeout(function () { $("#loginDialog .close").trigger('click')});
                          $('#loginDialog').modal('hide');
                          if($scope.sessionExpiredAlert){
                            $scope.sessionExpiredAlert = false;
                            $rootScope.$broadcast('event:sessionExpired-signIn', user);
                          }
                    })
                    .catch(function onerror(error) {
                        $scope.password     = "";
                        $scope.errorInvalid = error.errorCode == 403;
                        $scope.errorTimeout = error.errorCode != 403;
                    })
                    .finally(function(){
                        $scope.waiting      = false;
                    });
              };

             $scope.actionSignup = function () {
                  var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
                  $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri='+redirect_uri;
              };

              $rootScope.$on('event:auth-sessionExpired', function(evt, data){                
                  $scope.user = undefined;
                  $scope.sessionExpiredAlert = true;
                  if($route.current.$$route.resolve.securized) //show login dialog only when the route is required signin. probably a bad hack.
                    $('#loginDialog').modal({backdrop: "static", keyboard:false});
              })

            }]

        };
    }]);

