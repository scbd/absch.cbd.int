import app from 'app';
import template from 'text!./lwfc-autocomplete.html';
import 'angular-localizer';
  app.directive('lwfcAutocomplete', function() {
      return {
          restrict: 'AEC',
          scope: {
              binding: '=ngModel',
              source: '=',
              preview: '=?',
              title: '@',
              placeholder: '@',
              help: '@?',
              maxmatches: '@?',
              minchars: '@?',
              selectbox: '@?',
          },
          template: template,
      };
  });
