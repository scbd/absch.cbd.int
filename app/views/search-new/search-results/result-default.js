define(['app', 'underscore', '/app/js/common.js',
'/app/views/search-new/search-results/record-viewer.js'
], function(app, _) {

    app.directive('resultDefault', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            //require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-results/result-default.html',
            scope: {
                doc:'=',
                type:'@'
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {



            },
        };
    });
});
