import app from '~/app';
import template from './pin-popup-chm.html';
import pinPopupChmT from '~/app-text/views/countries/directives/pin-popup-chm.json';

app.directive('pinPopupChm', ['translationService', function(translationService){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function() {
            translationService.set('pinPopupChmT', pinPopupChmT);
        }
    }
}])