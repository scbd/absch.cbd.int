import app from '~/app';
import html from './embed-footer.html';
import headerT from '~/app-text/templates/absch/header.json';

app.directive('embedFooter', ['translationService',  function (translationService) {
    return {
        restrict: 'E',
        template: html,
        link: function($scope) {
            translationService.set('abschHeaderT', headerT);
            $scope.url  = window.location.href.replace(/&?embed=true/, '');
        }
    };
}]);

