import app from '~/app';
import template from 'text!./text.html';
import $ from 'jquery';
import 'angular-sanitize';
  ;
  app.directive('afcText', function() {
    return {
      restrict: 'EAC',
      scope: {
        binding: "=ngModel",
        title: '@',
        placeholder: '@',
        rows: '@',
        help: '@',
        name: '@?',
        preview: '@?',
      },
      template: template,
      controller: function($scope, $element, $attrs) {
        $('textarea', $element).each(function() {
          for (var i in $attrs)
            if (i.substr(0, 1) != '$' && !$scope[i] && i != 'ngModel')
              $(this).attr(i, $attrs[i]);
        });
      },
    };
  });

