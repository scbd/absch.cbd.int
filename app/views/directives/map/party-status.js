import template from 'text!./party-status.html';
import app from 'app';
  ;

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

