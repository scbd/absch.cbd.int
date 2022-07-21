import app from '~/app';
import template from 'text!./locale.html';
import 'css!~/components/scbd-branding/directives/header/locale';
import '~/components/scbd-angularjs-services/main';
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

