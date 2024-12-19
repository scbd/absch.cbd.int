import app from '~/app';
import template from 'text!./date-filter.html';
import _ from 'lodash';
import '~/services/main';
import '~/components/scbd-angularjs-controls/main';
import 'bootstrap-datepicker';
import kmDatePickerRange from '~/components/km/km-date-picker-range.vue';
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
                
                const selectedFilters = searchDirectiveCtrl.getSelectedFilters('date');
                const selectedDateFilter = selectedFilters.find(filter => filter.type === "date");

                if (selectedDateFilter?.query) {
                    const { start, end } = selectedDateFilter.query;
                    $scope.dateFilter.value = { start, end };
                }

                $scope.exportVueComponent = {
                    components: { kmDatePickerRange },
                }
                $scope.handleApplyDates = () => {
                    searchDirectiveCtrl.closeFilterTab();
                    $scope.saveDateFilter($scope.dateFilter.field, undefined, $scope.dateFilter);
                };

            }
        };
    }]);

