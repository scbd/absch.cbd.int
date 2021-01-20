define(['text!./search-filters.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('searchFilters', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }])

});
