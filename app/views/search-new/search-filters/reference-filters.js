define(['app', 'underscore', '/app/js/common.js', '/app/views/search-new/search-filters/search-filter.js',
], function(app, _, $http) {

    app.directive('referenceFilters', function($http) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/reference-filters.html',
            scope: {},
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
           

            }//link
            
        };
    });
});
