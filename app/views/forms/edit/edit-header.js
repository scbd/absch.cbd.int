import app from  'app';
import template from 'text!./edit-header.html';

app.directive('editHeader', [function(){
    return {
        restrict   : "E",
		template: template,
		replace    : true,
        link:function($scope){}
    }
}])