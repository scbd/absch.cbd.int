import app from 'app'
import cbdFooterHtml from 'text!./cbd-footer.html';

app.directive('cbdFooter', [function () { return { restrict: 'E', template: cbdFooterHtml }; }]);   