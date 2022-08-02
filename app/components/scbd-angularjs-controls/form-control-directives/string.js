import app from '~/app';
import template from 'text!./string.html';
import $ from 'jquery';
  ;
  app.directive('afcInput', function() {
    return {
      restrict: 'EAC',
      scope: {
        ngModel: '=',
        type: '@',
        title: '@',
        help: '@',
        placeholder: '@',
        name: '@?',
      },
      template: template,
      controller: function($scope, $element, $attrs) {
        $('input', $element).each(function() {
          for (var i in $attrs)
            if (i.substr(0, 1) != '$' && !$scope[i] && i != 'ngModel')
              $(this).attr(i, $attrs[i]);
        });
      },
    };
  });
