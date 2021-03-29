
import app from 'app';
import template from 'text!./search-subfilter-options.html';
import 'ngDialog';

    app.directive('searchSubfilterOptions', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }]);


