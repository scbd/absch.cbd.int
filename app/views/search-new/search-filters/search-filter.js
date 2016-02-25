define(['app', 'underscore', '/app/js/common.js',
], function(app, _, $http) {

    app.directive('searchFilter', function($http) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/search-filter.html',
            scope: {
                doc:"=",
                index:"="
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                
               $scope.saveFilter = searchDirectiveCtrl.saveFilter;
               $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;

            }//link
        };
    });
});
