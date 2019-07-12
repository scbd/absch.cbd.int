define(['app', 'text!views/search/search-filters/date-filter.html','lodash', 'js/common', 'components/scbd-angularjs-controls/form-control-directives/all-controls','bootstrap-datepicker'
], function(app, template, _) {

    app.directive('dateFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                // $scope.since = {};

                $scope.df_filters = searchDirectiveCtrl.getSearchFilters("date");

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
                    $scope.saveDateFilter($scope.df_filters[0].id, query);
                }

                // if($scope.df_filters.length > 0){
                // //    if($scope.df_filters[0])
                // console.log($scope.df_filters);
                // }
            }]
        };
    });
});
