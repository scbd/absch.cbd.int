import app from 'app'
import cbdFooterHtml from 'text!./cbd-footer.html';
import cbdFooterT from '~/app-text/templates/directives/cbd-footer.json';

app.directive('cbdFooter', ['translationService', function (translationService) {
     return { 
        restrict: 'E', 
        template: cbdFooterHtml,
        link: function(){
            translationService.set('cbdFooterT', cbdFooterT);
        }
    }; 

    }]);   