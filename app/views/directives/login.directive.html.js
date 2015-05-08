define(['app'], function (app) {

app.directive('login', function ($http) {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/login.directive.html',
            replace: true,
            scope: {
                onAuthorization : '&'
            },
            controller: ['$scope', '$http', '$window', '$location', '$browser','authentication','$rootScope',
             function ($scope, $http, $window, $location, $browser, authentication, $rootScope) {

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
                        if(typeof $scope.onAuthorization =='function'){
                            $scope.onAuthorization();
                        }
                    })
                    .catch(function onerror(error) {
                        console.log(error);
                        $scope.password     = "";
                        $scope.errorInvalid = error.status == 403;
                        $scope.errorTimeout = error.status != 403;
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
