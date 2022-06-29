import app from '~/app';
import template from './pin-popup-bch.html';
import pinPopupBchT from '~/app-text/views/countries/directives/pin-popup-bch.json';

app.directive('pinPopupBch', ['translationService', function(translationService){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function ()
        {
            translationService.set('pinPopupBchT', pinPopupBchT);
        }
    }
}])