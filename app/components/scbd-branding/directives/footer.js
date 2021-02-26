define(['app',
 'text!./footer.html',
  'css!components/scbd-branding/directives/footer',
],
function(app, template, $) {
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
});
