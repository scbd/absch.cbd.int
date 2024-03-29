import app from '~/app';
import template from 'text!./accounts-validation.html';
import '~/components/scbd-angularjs-services/main';
     app.directive('accountsValidationHeader', function() {
         return { restrict: 'E' ,
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication', '$rootScope', '$q',
                  function($scope, $window, $location,authentication, $rootScope) {
                      
                      
                      $rootScope.$on('event:auth-emailVerification', function(evt, data){
                        $scope.showEmailVerificationMessage = data.message;
                        $scope.user = $rootScope.user;
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

