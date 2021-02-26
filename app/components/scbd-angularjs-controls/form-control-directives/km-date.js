define(['app', 'text!components/scbd-angularjs-controls/form-control-directives/km-date.html', 'bootstrap-datepicker'], function(app, template) {
  ;
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

        var options = {
          format      : $attr.format      ||"yyyy-mm-dd",
          startView   : $attr.startView   ||"days", 
          minViewMode : $attr.minViewMode ||"days",
          autoclose   : true
        };
        var datePicker = $element.datepicker(options);

        datePicker.on('changeDate', function(event) {
          $element.find('input').focus();
        });

        $scope.$watch('binding', function(newVal) {
          ngModelController.$setViewValue($scope.binding);
          if($scope.binding)
          $element.datepicker('update', $scope.binding)
        });

      }
    };
  }]);
});
