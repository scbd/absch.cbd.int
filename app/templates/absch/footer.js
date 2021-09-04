import template from 'text!./footer.html';
import app from 'app';

app.directive('abschFooter', [function () {
    return {
        restrict: 'E',
        template: template
    };
}]);