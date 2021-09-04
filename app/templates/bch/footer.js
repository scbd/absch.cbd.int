import template from 'text!./footer.html';
import app from 'app';

app.directive('bchFooter', [function () {
    return {
        restrict: 'E',
        template: template
    };
}]);