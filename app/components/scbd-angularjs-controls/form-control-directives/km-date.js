define(['app', 'text!./km-date.html', 'bootstrap-datepicker'], function(app, template) {
  'use strict';
  //============================================================
  //
  //
  //============================================================
  app.directive('kmDate', [function() {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: "?ngModel",
      transclude: false,
      scope: {
        binding: '=ngModel',
        placeholder: '@',
        ngDisabledFn: '&ngDisabled'
      },
      link: function($scope, $element, $attr, ngModelController) {
        $element.datepicker({
          format: "yyyy-mm-dd",
          autoclose: true
        }).on('changeDate', function(event) {
          $element.find('input').focus();
        });
        $scope.$watch('binding', function(newVal) {
          ngModelController.$setViewValue($scope.binding);
        });
      },
      controller: ["$scope", function($scope) {}]
    };
  }]);
});
