import app from '~/app';
import template from './pin-popup-abs.html';
import pinPopupAbsT from '~/app-text/views/countries/directives/pin-popup-abs.json';

app.directive('pinPopupAbs', ['translationService', function(translationService){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function() {
            translationService.set('pinPopupAbsT', pinPopupAbsT);
        }
    }
}])