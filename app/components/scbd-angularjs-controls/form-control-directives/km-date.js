import app from '~/app';
import template from 'text!./km-date.html';
import 'bootstrap-datepicker';
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

        $scope.onDateChange = function(){
          ngModelController.$setViewValue($scope.binding);
        }
        $scope.$watch('binding', function(newVal) {
          if($scope.binding)
            $element.datepicker('update', $scope.binding)
        });

      }
    };
  }]);

