import app from '~/app';
  var directive = function() {
      return function($scope, $element) {
          $element.bind('focus', function() {
              this.rows = 4;
              this.dataset.width = this.style.width;
              this.style.width = '400px';
              this.style.display = 'block';
          });
          $element.bind('blur', function() {
              this.rows = 1;
              this.style.width = this.dataset.width;
              this.style.display = 'inline';
          });
      };
  };
  app.directive('expandableText', directive);
  app.directive('scbdExpandableText', directive);
