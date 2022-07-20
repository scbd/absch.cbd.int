import app from '~/app';
import template from 'text!./date-filter.html';
import _ from 'lodash';
import moment from 'moment';
import '~/services/main';
import '~/components/scbd-angularjs-controls/main';
import 'bootstrap-datepicker';
import dateFilterT from '~/app-text/views/search/search-filters/date-filter.json';

app.directive('dateFilter', ['solr', 'translationService', function (solr, translationService) {
        return {
            restrict: 'EAC',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                translationService.set('dateFilterT', dateFilterT);
                $scope.df_filters = searchDirectiveCtrl.getSearchFilters("date");

                $scope.dateFilter = {
                    field:'updatedDate_dt',
                    value:{start : null, end : null}
                };

                $scope.onChange = function(){
                    var query;

                    if($scope.dateFilter.value.start || $scope.dateFilter.value.end) {
                        const startDate = moment($scope.dateFilter.value.start);
                        const endDate = moment($scope.dateFilter.value.end);
                        var start = startDate ? solr.escape(startDate.locale('en').format('YYYY-MM-DD') + 'T00:00:00.000Z') : '*';
                        var end = endDate ? solr.escape(endDate.locale('en').format('YYYY-MM-DD') + 'T23:59:59.999Z') : '*';

                        query = '[ ' + start + ' TO ' + end + ' ]';
                    } 
                    $scope.saveDateFilter($scope.dateFilter.field, query, $scope.dateFilter);
                }

            }
        };
    }]);

