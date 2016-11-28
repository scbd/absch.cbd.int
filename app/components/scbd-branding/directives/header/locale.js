define(['app',
 'text!./locale.html',
  'css!./locale',
  'scbd-angularjs-services/locale',
  'scbd-angularjs-services/authentication',
],
function(app, template, $) {
     app.directive('localeHeader', function() {
         return { restrict: 'E' ,
                  priority: 0,// child of header
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication', 'locale',
                  function($scope, $window, $location,authentication, locale) {
                  // code for seling locale
                      $scope.currentLanguage = locale||'en';
                      $scope.changeLanguage = function(lang){
                         
                          $location.search({ returnUrl: $location.url() });
                          $location.path('/lang/'+ lang);
                      }

                      $scope.showMessage = function($event){
                          $event.stopPropagation()
                          alert('Support for Arabic language is coming soon.')
                      }
                  }],//controller
        };//return
     });//directive
});
