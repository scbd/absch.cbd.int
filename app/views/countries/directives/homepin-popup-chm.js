import app from '~/app';
import template from './homepin-popup-chm.html';
import homepinPopupChmTranslation from '~/app-text/views/countries/directives/homepin-popup-chm.json';

app.directive('homepinPopupChm', ['translationService', '$routeParams', '$location', function(translationService, $routeParams, $location){
    return {
        restrict:'E',
        replace: true,
        template:template,
        link: function($scope) {
            translationService.set('homepinPopupChmTranslation', homepinPopupChmTranslation);
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