import app from '~/app';
import template from './homepin-popup-abs.html';
import homepinPopupAbsTranslation from '~/app-text/views/countries/directives/homepin-popup-abs.json';

app.directive('homepinPopupAbs', ['translationService', function(translationService){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function() {
         translationService.set('homepinPopupAbsTranslation', homepinPopupAbsTranslation);
        }
    }
}])