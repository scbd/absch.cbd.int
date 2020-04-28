define(['app', 'text!./km-form-languages.html', 'lodash', 'services/thesaurus-service'], function(app, template, _) {
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
          controller: ["$scope", '$http', 'thesaurusService', function($scope, $http, thesaurusService) {
            $scope.selectApi = {};
            var unLanguages = ['ar', 'en', 'fr', 'es', 'ru', 'zh']
            $scope.options = {
                locales : function(){
                    return thesaurusService.getDomainTerms('unLanguages').then(formatLocales).then(function(locales){
                        return $scope.locales = locales;
                    })
                },
                otherLocales : function(){
                    return thesaurusService.getDomainTerms('languages').then(formatLocales).then(function(locales){                        
                        if($scope.locales) unLanguages = _.map($scope.locales, 'identifier');
                        return _(locales).map(function(lang){
                            if(!_.contains(unLanguages, lang.identifier))return lang;
                        }).compact().value()
                    })
                }
            }

            function formatLocales(locales){

                return _(locales).map(function(lang){
                    var langLocale = lang.identifier.replace('lang-', '');                    
                    if(/^lang\-/.test(lang.identifier)){
                        return {
                            identifier  : langLocale,
                            title       : lang.title
                        }
                    }
                }).compact().value()
            }
            $scope.isVisible = function() {
                return $scope.binding !== undefined && $scope.binding !== null;
            };

            $scope.validateUNLanguage = function(){
                var unLang = _.map($scope.locales, 'identifier')
                if(!_.intersection($scope.binding, unLang).length)
                    $scope.showLanguageError = true;
                else
                    $scope.showLanguageError = false;
            }

            var bindingWatch = $scope.$watch('binding', function(newVal){
                if(newVal){
                    if(_.difference($scope.binding, unLanguages).length){
                        $scope.selectApi.loadOtherSource();
                        bindingWatch();
                    }
                }
            })

          }]
      };
  }]);
});