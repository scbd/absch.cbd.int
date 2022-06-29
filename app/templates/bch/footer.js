import template from 'text!./footer.html';
import app from 'app';
import bchFooterT from '~/app-text/templates/bch/footer.json';
app.directive('bchFooter', ['translationService', function (translationService) {
    return {
        restrict: 'E',
        template: template,
        link: function(){
            translationService.set('bchFooterT', bchFooterT);
        }
    };
}]);