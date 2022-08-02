import app from '~/app';
import template from 'text!./footer.html';
import '~/components/scbd-branding/directives/footer.css';
     app.directive('scbdFooter', function() {
         return { restrict: 'E' ,
                  priority: 0,// child of header
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication',
                  function($scope, $window, $location,authentication) {
                  // code for seling locale
                    var currentTime = new Date();
                    $scope.year = currentTime.getFullYear()
                  }],//controller
        };//return
     });//directive

