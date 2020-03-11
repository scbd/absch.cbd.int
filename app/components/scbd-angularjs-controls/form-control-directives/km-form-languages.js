define(['app', 'text!./km-form-languages.html', 'lodash'], function(app, template, _) {
  'use strict';
  //============================================================
  //
  //
  //============================================================
  //TODO: out of date, needs to be updated with current select, or select needs to be updated.
  app.directive('kmFormLanguages', [ function() {
      return {
          restrict: 'EAC',
          template: template,
          replace: true,
          transclude: true,
          scope: {
              binding: '=ngModel',
          },
          controller: ["$scope", '$http', function($scope, $http) {
            $scope.selectApi = {};
            $scope.locales = [
                { identifier: "ar", name: "Arabic"    }, 
                { identifier: "en", name: "English"   }, 
                { identifier: "es", name: "Spanish"   },
                { identifier: "fr", name: "French"    }, 
                { identifier: "ru", name: "Russian"   }, 
                { identifier: "zh", name: "Chinese"   }
            ];

            $scope.isVisible = function() {
                return $scope.binding !== undefined && $scope.binding !== null;
            };

            $scope.showOthers = function(){
            return $http.get('/api/v2013/thesaurus/domains/ISO639-2/terms').then(function(result){
                return _(result.data).map(function(lang){
                    if(/^lang\-/.test(lang.identifier)){
                        return {
                            identifier  : lang.identifier.replace('lang-', ''),
                            title       : lang.title
                        }
                    }
                }).compact().value()
            })
            }

            $scope.validateUNLanguage = function(){
                var unLang = _.map($scope.locales, 'identifier')
                if(!_.intersection($scope.binding, unLang).length)
                $scope.showLanguageError = true;
                else
                $scope.showLanguageError = false;
            }

            var bindingWatch = $scope.$watch('binding', function(newVal){
                if(newVal){
                    var unLang = _.map($scope.locales, 'identifier')
                    if(_.difference($scope.binding, unLang).length){
                        $scope.selectApi.loadOtherSource();
                        bindingWatch();
                    }
                }
            })

          }]
      };
  }]);
});