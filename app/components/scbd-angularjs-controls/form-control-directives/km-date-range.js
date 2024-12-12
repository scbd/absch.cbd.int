import app from '~/app';
import kmDatePickerRange from '../../km/km-date-picker-range.vue';
import { provide } from 'vue'; 
import { safeDelegate } from '~/services/common'
import template from 'text!./km-date-range.html';
import {formatDate} from '~/services/datetime';

  ;
  //============================================================
  //
  //
  //============================================================
  app.directive('kmDateRange', ['locale', function(locale) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: "ngModel",
      scope: {
        binding: '=ngModel',
        placeholder: '@',
        ngDisabledFn: '&ngDisabled'
      },
      link: function($scope, $element, $attr, ngModelController) {
        $scope.isPopupVisible = false;
        $scope.togglePopup = function() {
            $scope.isPopupVisible = !$scope.isPopupVisible;
        };

        $scope.filterDates = {
          start : null,
          end   : null
        };
        $scope.exportVueComponent = {
            components: { kmDatePickerRange },
        }
        
        $scope.handleApplyDates = () => {
          $scope.binding = {
            start : $scope.filterDates.start, 
            end   : $scope.filterDates.end
          }
          $scope.dateRangeText = `${formatDate($scope.filterDates.start)} - ${formatDate($scope.filterDates.end)}`;
          ngModelController.$setViewValue($scope.binding);
          $scope.isPopupVisible = false;
        };
        
        $scope.$watch('binding', function(newVal, old) {
          if(!newVal)
            $scope.dateRangeText = '';
        });
      }
    };
  }]);

