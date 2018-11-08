define(['text!./party-status.html',
  'app',
], function(template, app, _) {
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
          
        } //link
    };
  });
});
