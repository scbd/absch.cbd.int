import app from '~/app';
  var directiveFn =  function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('focus', function() {
                    this.setSelectionRange(0, 9999);
                });
            },
        };
      };
  app.directive('selectAllOnClick', directiveFn);
  app.directive('scbdSelectAllOnClick', directiveFn);
