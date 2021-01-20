define(['text!./search-subfilter-options.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('searchSubfilterOptions', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {
            }
        }
    }])

});
