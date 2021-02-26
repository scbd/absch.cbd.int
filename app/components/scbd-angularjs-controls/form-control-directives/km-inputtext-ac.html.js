define(['app','text!components/scbd-angularjs-controls/form-control-directives/km-inputtext-ac.html','angular', 'angucomplete-alt','css!components/scbd-angularjs-controls/form-control-directives/km-control.css'], function(app,template,angular) {
  //============================================================
  //
  //
  //============================================================
  app.directive('kmTextboxAc', ['$filter', '$timeout', function($filter, $timeout) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: "?ngModel",
      scope: {
        placeholder         : '@',
        binding             : '=ngModel',
        locales             : '=',
        required            : "@",
        ngDisabledFn        : '&ngDisabled',
        onSearchFn          : '&onSearch'
      },
      link: function($scope, element, $attr, ngModelController) {

        $scope.autocompleteOptions = {
          placeholder         : $attr.placeholder       || "Type to autocomplete...",
          pause               : $attr.pause             || "400",
          dataField           : $attr.dataField         || "title",
          titleField          : $attr.titleField        || "title",
          descriptionField    : $attr.descriptionField  || "summary",
          inputClass          : $attr.inputClass        || "form-control-small",
        }

        $scope.text = {};
        $scope.termLocales={};
        $scope.$watch('locales', watchLocales);
        $scope.$watch('binding', watchBinding);
        
        //==============================
        //Remove value of not selected languages/empty languages
        //==============================
         function watchLocales() {
          var oLocales = $scope.locales || [];
          var oBinding = $scope.binding || {};
          var oText = {};

          angular.forEach(oLocales, function(locale, i) {
            oText[locale] = oBinding[locale] || oText[locale];
            if(!$scope.termLocales[locale]){
              $scope.termLocales[locale] = { identifier: 'lang-'+locale };
            }
          });
          $scope.text = oText;
          onchange();
          $timeout(function(){element.find('.lang-tooltip').tooltip()}, 300)
        };

        //==============================
        //Remove value of not selected languages/empty languages
        //==============================
        function watchBinding() {
          var oLocales = $scope.locales || [];
          var oBinding = $scope.binding || {};
          var oText = $scope.text;

          angular.forEach(oLocales, function(locale, i) {
            oText[locale] = oBinding[locale];
          });
        };

        //==============================
        //Remove value of not selected languages/empty languages
        //==============================
        function onchange() {
          var oLocales = $scope.locales || [];
          var oText = $scope.text || {};
          var oNewBinding = {};

          angular.forEach(oLocales, function(locale, i) {
            if ($.trim(oText[locale]) !== "")
              oNewBinding[locale] = oText[locale].title||oText[locale];
          });

          $scope.binding = !$.isEmptyObject(oNewBinding) ? oNewBinding : undefined;

          ngModelController.$setViewValue($scope.binding);
        };

        //==============================
        //
        //==============================
        $scope.isRequired = function() {
          return $scope.required !== undefined && $.isEmptyObject($scope.binding);
        };

        //==============================
        //
        //==============================
        $scope.isShowLocale = function() {
          return $scope.locales && $scope.locales.length > 1;
        };

        $scope.remoteApiHandler = function(text, timeout){
          var fieldLocale = this.$parent.locale;
          return $scope.onSearchFn({text:text, locale:fieldLocale, timeout:timeout})
        }

        // the binding is type = so we do not have control over the parameters
        $scope.onInputChange = function(text){
          var fieldLocale = this.$parent.locale; // gets the locale from parent as there can be multiple locale
          $scope.text[fieldLocale] = text;
          onchange();
        }

        // the binding is type = so we do not have control over the parameters
        $scope.onObjectSelected = function(item){
          var fieldLocale = this.$parent.locale; // gets the locale from parent as there can be multiple locale
          if(item){
            $scope.text[fieldLocale] = item.title;
            onchange();
          }
        }
      }      
    };
  }]);
});