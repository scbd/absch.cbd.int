import app from '~/app';
import template from './homepin-popup-abs.html';

app.directive('homepinPopupAbs', function(){
    return {
        restrict:'E',
        replace: true,
        template:template
    }
})