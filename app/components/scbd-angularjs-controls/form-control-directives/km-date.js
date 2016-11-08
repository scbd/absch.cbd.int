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
      transclude: false,
      scope: {
        binding: '=ngModel',
        placeholder: '@',
        ngDisabledFn: '&ngDisabled',
        ngChange: '&'
      },
      link: function($scope, $element, $attr) {
        $element.datepicker({
          format: "yyyy-mm-dd",
          autoclose: true
        }).on('changeDate', function(event) {
          $element.find('input').focus();
        });
        $scope.$watch('binding', function(newVal) {
          if ($scope.ngChange)
            $scope.ngChange();
        });
      },
      controller: ["$scope", function($scope) {}]
    };
  }]);
});
