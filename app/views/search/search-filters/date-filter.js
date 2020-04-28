define(['app', 'text!views/search/search-filters/date-filter.html','lodash', 'js/common', 'components/scbd-angularjs-controls/form-control-directives/all-controls','bootstrap-datepicker'
], function(app, template, _) {

    app.directive('dateFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {

                $scope.df_filters = searchDirectiveCtrl.getSearchFilters("date");

                $scope.dateFilter = {
                    field:'updatedDate_dt',
                    value:{start : null, end : null}
                };
                
                $scope.onFiedlChange = function(){
                    $scope.dateFilter.value = {start : null, end : null}
                }

                $scope.onChange = function(){
                    var query;

                    if($scope.dateFilter.value.start || $scope.dateFilter.value.end) {
                        var start = $scope.dateFilter.value.start ? $scope.dateFilter.value.start + 'T00:00:00.000Z' : '*';
                        var end = $scope.dateFilter.value.end ? $scope.dateFilter.value.end + 'T23:59:59.999Z' : '*';

                        query = '[ ' + start + ' TO ' + end + ' ]';
                    } 
                    $scope.saveDateFilter($scope.dateFilter.field, query, $scope.dateFilter);
                }

            }
        };
    });
});
