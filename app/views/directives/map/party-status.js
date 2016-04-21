define(['text!./party-status.html',
  'app',
  'lodash',
  './odometer/odometer.js',
  'css!./odometer/odometer',
  'css!./party-status',

], function(template, app, _, Odometer) {
  'use strict';

  app.directive('partyStatus', function() {
    return {
      restrict: 'E',
      template: template,
      scope: {
        num: '=num'
      },
      link: function($scope, $element, $attr) {

          $element.find("#od").attr('id', $attr.id);
          var od = new Odometer({
            el: $element.find("#" + $attr.id)[0],
            value: 200, // default value
            format: 'd', // default value
            duration: 2000,
          });




          var clearWatch = $scope.$watch('num', function() {

            if ($scope.num) {

              clearWatch();
              if ($scope.num < 200 && $scope.num > 9)
                $scope.num = Number('1' + $scope.num);
              else if ($scope.num < 10)
                $scope.num = Number('10' + $scope.num);

              if ($attr.delay)
                setTimeout(function() {
                  od.update($scope.num);
                }, $attr.delay);
              else
                od.update($scope.num);
            }
          });
        } //link
    };
  });
});
