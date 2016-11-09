define(['app',
 'text!./account.html',
  'jquery',
  'css!./account',
  'scbd-angularjs-services/authentication',
],
function(app, template, $) {
     app.directive('scbdHeaderAccount', function() {
         return { restrict: 'E' ,
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication',
                  function($scope, $window, $location,authentication) {
                    //==========================
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
                        $('#loginDialog').modal('hide');
                    };


                  }],//controller
        };//return
     });//directive
});
