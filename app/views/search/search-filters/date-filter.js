import app from 'app';
import template from 'text!./date-filter.html';
import _ from 'lodash';
import 'services/main';
import 'components/scbd-angularjs-controls/main';
import 'bootstrap-datepicker';

    app.directive('dateFilter', ['solr', function(solr) {
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
                        var start = $scope.dateFilter.value.start ? solr.escape($scope.dateFilter.value.start.format('YYYY-MM-DD') + 'T00:00:00.000Z') : '*';
                        var end = $scope.dateFilter.value.end ? solr.escape($scope.dateFilter.value.end.format('YYYY-MM-DD') + 'T23:59:59.999Z') : '*';

                        query = '[ ' + start + ' TO ' + end + ' ]';
                    } 
                    $scope.saveDateFilter($scope.dateFilter.field, query, $scope.dateFilter);
                }

            }
        };
    }]);

