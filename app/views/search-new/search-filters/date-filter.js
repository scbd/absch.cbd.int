define(['app', 'underscore', '/app/js/common.js', 'scbd-angularjs-controls','bootstrap-datepicker'
], function(app, _) {

    app.directive('dateFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/date-filter.html',
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                // $scope.since = {};

                $scope.df_fitlers = searchDirectiveCtrl.getSearchFilters("date");

            },//link
            controller  : ['$scope', function($scope){

            $scope.dateFilter = {since : null,
                                 until : null};
                $scope.$watch('dateFilter.since', function(newVal){
                    if(newVal)
                        saveQuery();
                });

                $scope.$watch('dateFilter.until', function(newVal){
                    if(newVal)
                        saveQuery();
                });

                function saveQuery(){
                    var query;

                    if($scope.dateFilter.since || $scope.dateFilter.until) {
                        var since = $scope.dateFilter.since ? $scope.dateFilter.since + 'T00:00:00.000Z' : '*';
                        var until = $scope.dateFilter.until ? $scope.dateFilter.until + 'T23:59:59.999Z' : '*';

                        query = '[ ' + since + ' TO ' + until + ' ]';
                    } else {
                        query = '*:*';
                    }
                    $scope.saveDateFilter($scope.df_fitlers[0].id, query);
                }

                // if($scope.df_fitlers.length > 0){
                // //    if($scope.df_fitlers[0])
                // console.log($scope.df_fitlers);
                // }
            }]
        };
    });
});
