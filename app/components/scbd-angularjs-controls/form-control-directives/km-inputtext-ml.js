import app from '~/app';
import template from 'text!./km-inputtext-ml.html';
import angular from 'angular';
  //============================================================
  //
  //
  //============================================================
  app.directive('kmTextboxMl', ['$filter', '$timeout', function($filter, $timeout) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: "?ngModel",
      scope: {
        placeholder: '@',
        ngDisabledFn: '&ngDisabled',
        binding: '=ngModel',
        locales: '=',
        rows: '=',
        required: "@"
      },
      link: function($scope, element, attrs, ngModelController) {
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
          $scope.onchange();
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
        $scope.onchange = function() {
          var oLocales = $scope.locales || [];
          var oText = $scope.text || {};
          var oNewBinding = {};

          angular.forEach(oLocales, function(locale, i) {
            if ($.trim(oText[locale]) !== "")
              oNewBinding[locale] = oText[locale];
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
      }      
    };
  }]);
