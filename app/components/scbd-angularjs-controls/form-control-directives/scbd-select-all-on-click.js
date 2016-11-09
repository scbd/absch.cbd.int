define(['app'], function(app) {
  var directive =  function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('focus', function() {
                    console.log('selectAllOnClick');
                    this.setSelectionRange(0, 9999);
                });
            },
        };
      };
  app.directive('selectAllOnClick', directive);
  app.directive('scbdSelectAllOnClick', directive);
});