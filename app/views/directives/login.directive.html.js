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

                    //

                    var credentials = { 'email': $scope.email, 'password': $scope.password };

                    $http.post('/api/v2013/authentication/token', credentials).then(function onsuccess(success) {

                      $browser.cookies().authenticationToken = success.data.authenticationToken;
                      $browser.cookies().email = $scope.rememberMe ? $scope.email : '';
                      //setCookie('authenticationToken',  success.data.authenticationToken, 7, '/');
                        var response = { type: 'setAuthenticationToken', authenticationToken: $browser.cookies().authenticationToken, setAuthenticationEmail: $browser.cookies().email||'' };

                      var authenticationFrame = angular.element(document.querySelector('#authenticationFrame'))[0];
                        authenticationFrame.contentWindow.postMessage(JSON.stringify(response), 'https://accounts.cbd.int');

                        authentication.getUser(true).then(function (user) {
                            if(typeof $scope.onAuthorization =='function'){
                                $scope.onAuthorization();
                            }
                            return $rootScope.user = user;
                        });
                        //$location.path($window.location.href);
                      //$window.location.href = $window.location.href;

                    }, function onerror(error) {
                      console.log(error);
                      $scope.password     = "";
                        $scope.errorInvalid = error.status == 403;
                        $scope.errorTimeout = error.status != 403;
                        $scope.waiting      = false;
                    });
              }

             $scope.actionSignup = function () {
                  var redirect_uri = encodeURIComponent($location.protocol()+'://'+$location.host()+':'+$location.port()+'/');
                  $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri='+redirect_uri;
              };

              function setCookie (name, value, days, path) {

                   var cookieString = escape(name) + "=";

                   if(value) cookieString += escape(value);
                   else      days = -1;

                   if(path)
                       cookieString += "; path=" + path;

                   if(days || days == 0) {

                       var expirationDate = new Date();

                       expirationDate.setDate(expirationDate.getDate() + days);

                       cookieString += "; expires=" + expirationDate.toUTCString();
                   }

                   document.cookie = cookieString
               };

            }]

        };
    });
});
