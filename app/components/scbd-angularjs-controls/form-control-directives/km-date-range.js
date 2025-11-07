import app from '~/app';
import kmDatePickerRange from '../../km/km-date-picker-range.vue';
import template from 'text!./km-date-range.html';
import {formatDate} from '~/services/datetime';
import dateTranslations from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-date-range.json' with { type: "json" };
import { mergeTranslationKeys } from '~/services/translation-merge';
const dateT = mergeTranslationKeys(dateTranslations);

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
          if(!$scope.filterDates.start){
            $scope.dateRangeText = `${dateT.before} ${formatDate($scope.filterDates.end)}`;
          }
          if(!$scope.filterDates.end){
            $scope.dateRangeText = `${dateT.after} ${formatDate($scope.filterDates.start)}`; // if only start: After xxx
          }
         
          ngModelController.$setViewValue($scope.binding);
          $scope.isPopupVisible = false;
        };
        
        $scope.$watch('binding', function(newVal) {
          if(!newVal){
            $scope.dateRangeText  = '';
            $scope.filterDates.start = null; 
            $scope.filterDates.end   = null;
            return;
          }

          $scope.filterDates.start = newVal.start ? new Date(newVal.start) : null;
          $scope.filterDates.end   = newVal.end   ? new Date(newVal.end)   : null;

          if ($scope.filterDates.start && $scope.filterDates.end) {
            $scope.dateRangeText = `${formatDate($scope.filterDates.start)} - ${formatDate($scope.filterDates.end)}`;
          }
          else if ($scope.filterDates.start) {
            $scope.dateRangeText = `${dateT.after} ${formatDate($scope.filterDates.start)}`;
          }
          else if ($scope.filterDates.end) {
            $scope.dateRangeText = `${dateT.before} ${formatDate($scope.filterDates.end)}`;
          }
        });
      }
    };
  }]);

