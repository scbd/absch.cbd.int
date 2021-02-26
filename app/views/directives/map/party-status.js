define(['text!views/directives/map/party-status.html',
  'app',
], function(template, app, _) {
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
});
