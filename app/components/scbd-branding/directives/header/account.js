import app from '~/app';
import template from 'text!./account.html';
import 'css!~/components/scbd-branding/directives/header/account.css';
import '~/components/scbd-angularjs-services/main';
import accountHeaderT from '~/app-text/components/scbd-branding/directives/header/account.json';
     app.directive('accountHeader', function() { // parent directive header

         return { restrict: 'E' ,
                  priority: 0, //child of headder
                  template: template,
                  scope: {
                       user: '=',
                  },
                  controller: ['$scope', '$window', '$location','authentication', '$http', 'translationService',
                  function($scope, $window, $location,authentication, $http, translationService) {
                    translationService.set('accountHeaderT', accountHeaderT);
                    if(!$scope.user || !$scope.user.isAuthenticated )
                      getUser();
                    //==========================
                    //
                    //============================================================
                    function getUser() {
                      return authentication.getUser().then(function(u){
                    		    $scope.user = u;
                                // var roleQuery = {roles : u.roles };
                                // $http.get('/api/v2013/roles' , {params : {q : roleQuery}})
                                // .then(function(data){
                                //     $scope.userRoles = data.data;
                                // })
                			});
                    }
                    //==========================
                    //
                    //============================================================
                    $scope.actionSignOut = function() {
                        authentication.signOut().then(function(){getUser();});
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionSignup = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() +  $location.path());
                        $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri=' + redirect_uri;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionPassword = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() +  $location.path());
                        $window.location.href = 'https://accounts.cbd.int/password?redirect_uri=' + redirect_uri;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionProfile = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() +  $location.path());
                        $window.location.href = 'https://accounts.cbd.int/profile?redirect_uri=' + redirect_uri;

                    };
                  }],//controller
        };//return
     });//directive

