import app from 'app';
import template from 'text!./search-results-section.html';
import 'ngDialog';


    app.directive('searchResultsSection', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }]);

