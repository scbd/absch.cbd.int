import app from '~/app';
import template from './homepin-popup-abs.html';
import homepinPopupAbsTranslation from '~/app-text/views/countries/directives/homepin-popup-abs.json';

app.directive('homepinPopupAbs', ['translationService', '$routeParams', function(translationService, $routeParams){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function($scope) {
            translationService.set('homepinPopupAbsTranslation', homepinPopupAbsTranslation);
            $scope.ToggleCountyList = function (code, currentCountryCode){
                console.log("code: ",code)
                console.log("currentCountryCode: ",currentCountryCode)
                if ($routeParams.code && $("#div" + code).length>0) {
                    $('html, body').animate({
                        scrollTop: $("#div"+code).offset().top
                    }, 500);
                    if ($("#div" + code).find('i').hasClass("bi-chevron-down")){
                        $("#div" + code).trigger('click');
                    }
                }
                else{
                    window.location.href = `countries/${currentCountryCode}/${code}`;
                }
            }
        }
    }
}])