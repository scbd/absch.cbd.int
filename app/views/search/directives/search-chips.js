
import app from 'app';
import template from 'text!./search-chips.html';
import 'ngDialog';

    app.directive('searchChips', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {

            }
        }
    }]);
