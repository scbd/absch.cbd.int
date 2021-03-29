

import app from 'app';
import template from 'text!./search-input.html';
import 'ngDialog';


    app.directive('searchInput', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }]);
