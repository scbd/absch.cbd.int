
import app from 'app';
import template from 'text!./search-filters.html';
import 'ngDialog';

    app.directive('searchFilters', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }]);
