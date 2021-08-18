import app from 'app';
import template from 'text!./icons.html';

app.directive('bchIcons', function(){
    return {
        restrict: 'EAC',
        replace: false,
        template: template,
    }
})