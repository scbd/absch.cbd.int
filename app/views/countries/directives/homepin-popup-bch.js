import app from '~/app';
import template from './homepin-popup-bch.html';

app.directive('homepinPopupBch', function(){
    return {
        restrict:'E',
        replace: true,
        template:template,
        
        link: function ($scope) {
            $scope.hideCartagena = function(code){
                if (code == 'NRI' || code == 'NR1' || code == 'NR2') return false;
                else return true;
            }
        }

    }

})