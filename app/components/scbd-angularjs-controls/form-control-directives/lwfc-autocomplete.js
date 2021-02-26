define(['app', 'text!./lwfc-autocomplete.html','angular-localizer'], function(app, template) {
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
});