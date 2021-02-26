define(['app',
 'text!components/scbd-branding/directives/header/locale.html',
  'css!components/scbd-branding/directives/header/locale',
  'components/scbd-angularjs-services/services/locale',
  'components/scbd-angularjs-services/services/authentication',
],
function(app, template, $) {
     app.directive('localeHeader', function() {
         return { restrict: 'ECA' ,
                  priority: 0,// child of header
                  scope: {
                       idname: '@id',
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication', 'locale',
                  function($scope, $window, $location,authentication, locale) {
                   if(!$scope.idname)
                         $scope.idname ="CBD-Branding";
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
