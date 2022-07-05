import app from 'app';
import template from 'text!./km-form-languages.html';
import _ from 'lodash';
import './km-select';
import 'services/main';
import kmFormLanguagesT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-form-languages.json';
  //============================================================
  //
  //
  //============================================================
  //TODO: out of date, needs to be updated with current select, or select needs to be updated.
app.directive('kmFormLanguages', ['thesaurusService', '$timeout', 'guid', 'translationService', function (thesaurusService, $timeout, guid, translationService) {
      return {
          restrict: 'EA',
          template: template,
          replace: true,
          require: "ngModel",
          scope: {
              binding: '=ngModel',
          },
          link:  function($scope, $element, $attr, ngModelController) {
            translationService.set('kmFormLanguagesT', kmFormLanguagesT);
            var unLanguages  = ['ar', 'en', 'fr', 'es', 'ru', 'zh'];
            $scope.ctrl      = $scope;
            $scope.multiple  = $attr.multiple=='true' || $attr.multiple==""; // incase if empty is defined
            $scope.instanceId= guid();

            $scope.options = {
                locales : function(){
                    return thesaurusService.getDomainTerms('unLanguages').then(formatLocales).then(function(locales){
                        return $scope.locales = locales;
                    })
                },
                otherLocales : function(){
                    
                    return thesaurusService.getDomainTerms('languages').then(formatLocales).then(function(locales){     
                        $scope.$broadcast('event:km-select-enable-search', {enabled:true, instanceId:$scope.instanceId});
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
                if(newVal!==undefined)
                    $scope.initialized = true;
            });
          }
      };
  }]);
