import app from '~/app';
import template from './homepin-popup-bch.html';

app.directive('homepinPopupBch', function(){
    return {
        restrict:'E',
        replace: true,
        template:template
    }
})