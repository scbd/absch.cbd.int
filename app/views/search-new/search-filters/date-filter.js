define(['app', 'underscore', '/app/js/common.js', 'scbd-angularjs-controls','bootstrap-datepicker'
], function(app, _) {

    app.directive('dateFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/date-filter.html',
            scope: {},
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                // $scope.since = {};
                // $scope.until = {};

                $scope.df_fitlers = searchDirectiveCtrl.getSearchFilters("date");

            },//link
            controller  : ['$scope', function($scope){
                $scope.$watch('since', function(newVal){
                    if(newVal)
                        saveQuery();
                });

                $scope.$watch('until', function(newVal){
                    if(newVal)
                        saveQuery();
                });

                function saveQuery(){
                    var query;

                    if($scope.since || $scope.until) {
                        var since = $scope.since ? $scope.since + 'T00:00:00.000Z' : '*';
                        var until = $scope.until ? $scope.until + 'T23:59:59.999Z' : '*';

                        query = '[ ' + since + ' TO ' + until + ' ]';
                    } else {
                        query = '*:*';
                    }
                    $scope.saveDateFilter($scope.df_fitlers[0].id, query);
                }
            }]
        };
    });
});
