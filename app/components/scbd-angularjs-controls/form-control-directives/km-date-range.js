define(['app', 'text!./km-date-range.html', 'moment', 'datepicker-range'], function(app, template) {
  'use strict';
  //============================================================
  //
  //
  //============================================================
  app.directive('kmDateRange', [function() {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: "ngModel",
      transclude: true,
      scope: {
        binding: '=ngModel',
        placeholder: '@',
        ngDisabledFn: '&ngDisabled'
      },
      link: function($scope, $element, $attr, ngModelController) {
         $element.daterangepicker({
            showDropdowns: true,
            alwaysShowCalendars:true,
            ranges: {
              'Today'           : [moment(), moment()],
              'Last 7 Days'     : [moment().subtract(6,   'days'  ), moment()],
              'Last 30 Days'    : [moment().subtract(29,  'days'  ), moment()],
              'Last six months' : [moment().subtract(6,   'month' ).startOf('month'), moment()],
              'Last 12 months'  : [moment().subtract(12,  'month' ).startOf('month'), moment()],
              'Last 2 years'    : [moment().subtract(2,   'year'  ).startOf('month'), moment()],
              'Last 5 years'    : [moment().subtract(5,   'year'  ).startOf('month'), moment()]
            }
        }, function(start, end, label) {
          $scope.binding = {
            start : start.format('YYYY-MM-DD'),
            end   : end.format('YYYY-MM-DD'),
            label : label
          }
          ngModelController.$setViewValue($scope.binding);
          // $scope.formatedDate = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD')
          // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        });
        $scope.$watch('binding', function(newVal, old) {
            var newVal = newVal || {}
            var format;
            if(newVal.start)
              format = newVal.start;//.format('YYYY-MM-DD');

            if(newVal.end)
              format = (format ? (format + ' - ') : '') + newVal.end;//.format('YYYY-MM-DD')

            $scope.formatedDate = format||'';
        });
      }
    };
  }]);
});
