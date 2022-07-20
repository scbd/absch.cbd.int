import app from '~/app';
import template from 'text!./km-date-range.html';
import 'moment';
import 'datepicker-range';
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
      transclude: true,
      scope: {
        binding: '=ngModel',
        placeholder: '@',
        ngDisabledFn: '&ngDisabled'
      },
      link: function($scope, $element, $attr, ngModelController) {
        const dateFormat = $attr.dateFormat||'DD-MM-YYYY';
        
        const options = {
            showDropdowns: true,
            alwaysShowCalendars:true,
            ranges: {
              'Today'           : [moment(), moment()],
              'Last 7 Days'     : [moment().subtract(6,   'days'  ), moment()],
              'Last 30 Days'    : [moment().subtract(29,  'days'  ), moment()],
              'Last six months' : [moment().subtract(6,   'month' ).startOf('month'), moment()],
              'Last 12 months'  : [moment().subtract(12,  'month' ).startOf('month'), moment()],
              'Last 2 years'    : [moment().subtract(2,   'year'  ).startOf('month'), moment()],
              'Last 5 years 1'    : [moment().subtract(5,   'year'  ).startOf('month'), moment()]
            },
            locale: {
              format: dateFormat,              
              applyLabel: "Apply",
              cancelLabel: "Cancel",              
              fromLabel: "From",
              toLabel: "To",
              customRangeLabel: "Custom Range",
              weekLabel: "W",
              direction : locale == 'ar' ? 'rtl' : 'ltr',
            },
            minYear :  moment().subtract(75, 'year').year(),
            maxYear :  moment().add(20, 'year').year(),
            opens: locale == 'ar' ? 'right' : 'left',
        };

        $element.daterangepicker(options);
        $element.on('apply.daterangepicker', function(ev, picker) {
            $scope.binding = {
                  start : picker.startDate,
                  end   : picker.endDate,
                  label : picker.chosenLabel
                }
                ngModelController.$setViewValue($scope.binding);
        });

        $scope.$watch('binding', function(newVal, old) {
            var newVal = newVal || {}
            var format;
            if(newVal.start)
              format = newVal.start.format(dateFormat)

            if(newVal.end)
              format = (format ? (format + ' - ') : '') + newVal.end.format(dateFormat);//.format('YYYY-MM-DD')

            $scope.formattedDate = format||'';
        });
      }
    };
  }]);

