define(['app',
    'text!./login.html',
    'jquery',
    'css!./login',
    'scbd-angularjs-services/authentication',
], function (app,template,$) {

app.directive('loginAccount', function ($http) {
        return {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                 user: '=',
            },
            controller: ['$scope', '$http', '$window', '$location', '$browser','authentication','$rootScope','$timeout',
             function ($scope, $http, $window, $location, $browser, authentication, $rootScope,$timeout) {

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
                          $timeout(function(){$('#loginDialog').modal('hide');});
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

            }]

        };
    });
});
