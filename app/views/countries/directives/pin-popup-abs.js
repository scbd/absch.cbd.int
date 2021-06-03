import app from '~/app';
import template from './pin-popup-abs.html';

app.directive('pinPopupAbs', function(){
    return {
        restrict:'E',
        replace: true,
        template:template
    }
})