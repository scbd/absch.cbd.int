import app from '~/app';
import template from './pin-popup-bch.html';

app.directive('pinPopupBch', function(){
    return {
        restrict:'E',
        replace: true,
        template:template
    }
})