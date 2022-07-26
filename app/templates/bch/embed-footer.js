import app from 'app';
import html from 'text!./embed-footer.html';
import bchHeaderT from '~/app-text/templates/bch/header.json';

app.directive('embedFooter', ['translationService',  function (translationService) {
    return {
        restrict: 'E',
        template: html,
        link: function($scope) {
            translationService.set('bchHeaderT', bchHeaderT);
            $scope.url  = window.location.href.replace(/embed=true/, '');
        }
    };
}]);

