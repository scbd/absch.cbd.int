
import app from 'app';
import template from 'text!./search-sort.html';
import 'ngDialog';

    app.directive('searchSort', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }]);


