import template from 'text!./footer.html';
import app from '~/app';
import abschFooterT from '~/app-text/templates/absch/footer.json';

app.directive('abschFooter', ['translationService', function (translationService) {
    return {
        restrict: 'E',
        template: template,
        link: function() {
            translationService.set('abschFooterT', abschFooterT);
        }
    };
}]);