define(['app',
  'text!./accounts-validation.html',
  'css!./accounts-validation',
  'scbd-angularjs-services/authentication',
],
function(app, template) {
     app.directive('accountsValidationHeader', function() {
         return { restrict: 'E' ,
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication', '$rootScope',
                  function($scope, $window, $location,authentication, $rootScope) {
                      
                      
                      $rootScope.$on('event:auth-emailVerification', function(evt, data){
                        $scope.showEmailVerificationMessage = data.message;
                      });
                      
                      $scope.showMessage = function (){
                        if($scope.showEmailVerificationMessage)
                          return true;
                        else
                          return false;
                      };

                      $scope.showMessageToggle = function (){
                        $scope.showEmailVerificationMessage=!$scope.showEmailVerificationMessage;
                      };
                  }],//controller
        };//return
     });//directive
});
