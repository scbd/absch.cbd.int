define(['app', 'text!components/scbd-angularjs-controls/form-control-directives/km-form-languages.html', 'lodash', 'components/scbd-angularjs-controls/form-control-directives/km-select', 'services/thesaurus-service'], function(app, template, _) {
  ;
  //============================================================
  //
  //
  //============================================================
  //TODO: out of date, needs to be updated with current select, or select needs to be updated.
  app.directive('kmFormLanguages', ['thesaurusService', '$timeout', function(thesaurusService, $timeout) {
      return {
          restrict: 'EA',
          template: template,
          replace: true,
          require: "ngModel",
          scope: {
              binding: '=ngModel',
          },
          link:  function($scope, $element, $attr, ngModelController) {

            var unLanguages  = ['ar', 'en', 'fr', 'es', 'ru', 'zh'];
            $scope.ctrl      = $scope;
            $scope.multiple  = $attr.multiple=='true' || $attr.multiple==""; // incase if empty is defined

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
                            if(!_.includes(unLanguages, lang.identifier))return lang;
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
                
                ngModelController.$setViewValue($scope.binding, 'change');
                
                if($attr.requireUnLanguage=='false')
                    return;
                var unLang = _.map($scope.locales, 'identifier')
                var selectedLanguage = $scope.binding;
                if(!$scope.multiple)
                    selectedLanguage = [selectedLanguage];
                if(!_.intersection(selectedLanguage, unLang).length)
                    $scope.showLanguageError = true;
                else
                    $scope.showLanguageError = false;
                
            }

            var bindingWatch = $scope.$watch('binding', function(newVal){
                if(newVal){
                    $timeout(function(){
                        var binding = $scope.binding;
                        if(_.isString(binding))
                            binding = [binding];
                        if(_.difference(binding, unLanguages).length){
                            $scope.selectApi.loadOtherSource();
                            bindingWatch();
                        }
                    }, 500)//delay while the km-select directive is initialized
                }
            });
          }
      };
  }]);
});