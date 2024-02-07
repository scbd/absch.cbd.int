import template from 'text!./footer.html';
import app from '~/app';
import chmFooterT from '~/app-text/templates/chm/footer.json';
app.directive('chmFooter', ['translationService', function (translationService) {
    return {
        restrict: 'E',
        template: template,
        link: function(){
            translationService.set('chmFooterT', chmFooterT);
        }
    };
}]);