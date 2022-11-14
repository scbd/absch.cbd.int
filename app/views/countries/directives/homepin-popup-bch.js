import app from '~/app';
import template from './homepin-popup-bch.html';
import homepinPopupBchTranslation from '~/app-text/views/countries/directives/homepin-popup-bch.json';

app.directive('homepinPopupBch', ['translationService', '$routeParams', '$location', function (translationService, $routeParams, $location){
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
            $scope.ToggleCountyList = function (code, currentCountryCode){
                if ($routeParams.code && $("#div" + code).length>0) {
                    $('html, body').animate({
                        scrollTop: $("#div"+code).offset().top
                    }, 500);
                    if ($("#div" + code).find('i').hasClass("bi-chevron-down")){
                        $("#div" + code).trigger('click');
                    }
                }
                else{
                    $location.path(`countries/${currentCountryCode}/${code}`);
                }
            }
        }

    }

}])