define(['text!./search-chips.html', 'app', 'lodash', 'ngDialog'], function (template, app, _) {
    'use strict';

    app.directive('searchChips', ['$location', 'ngDialog', 'locale', function ($location, ngDialog, locale) {
        return {
            restrict: 'EA',
            template: template,
            scope: false,
            link: function ($scope) {

            }
        }
    }])

});
