import app from '~/app';
import template from './homepin-popup-bch.html';
import homepinPopupBchTranslation from '~/app-text/views/countries/directives/homepin-popup-bch.json';

app.directive('homepinPopupBch', ['translationService', function(translationService){
    return {
        restrict:'E',
        replace: true,
        template:template,
        
        link: function ($scope) {
            $scope.hideCartagena = function(code){
                if (code == 'NRI' || code == 'NR1' || code == 'NR2') return false;
                else return true;
            }

            translationService.set('homepinPopupBchTranslation', homepinPopupBchTranslation);
        }

    }

}])