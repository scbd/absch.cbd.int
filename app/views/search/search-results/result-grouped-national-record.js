define(['app', 'underscore', '/app/js/common.js',
'/app/views/search/search-results/record-viewer.js'
], function(app, _) {

    app.directive('resultGroupedNationalRecord', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            //require:'^searchDirective',
            templateUrl: '/app/views/search/search-results/result-grouped-national-record.html',
            scope: {
                doc:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {



            },
        };
    });
});
