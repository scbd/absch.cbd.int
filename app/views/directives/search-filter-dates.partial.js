import app from '~/app';
import template from 'text!./search-filter-dates.partial.html';
import '~/components/scbd-angularjs-controls/main';
import 'bootstrap-datepicker';
import '~/services/main';

app.directive('searchFilterDates', function ($http) {
    return {
        restrict: 'EAC',
        template: template,
        replace: true,
        scope: {
              title: '@title',
              query: '=query',
              field: '@field',
              api   : '=?',
              onChange : '&'
              //since: '=since',
              //until: '=until'
        },
        link: function ($scope, element, attrs, ngModelController) {
        },
        controller : ["$scope", "$filter", "solr", function ($scope, $filter, solr) {

            $scope.api = {
                getDateString : getDateString,
                clearSelection  : clearSelection
            };

            function clearSelection(){
                $scope.since = null;
                $scope.until = null;
                $scope.selectedDate = '';
            }
            function getDateString(){
                if($scope.since || $scope.until) {
                    var since = $scope.since ? 'since ' +  $filter("formatDate")($scope.since)  : '';
                    var until = $scope.until ? ' until ' +  $filter("formatDate")($scope.until)  : '';

                    return since + until;
                }
                return '';
            }

            var now = new Date();

            $scope.dates = [
                { text: 'Any', date: '' },
                { text: 'Last day', date: new Date(new Date(now).setDate(now.getDate()-1)).toISOString() },
                { text: 'Last week', date: new Date(new Date(now).setDate(now.getDate()-7)).toISOString() },
                { text: 'Last two weeks', date: new Date(new Date(now).setDate(now.getDate()-14)).toISOString() },
                { text: 'Last month', date: new Date(new Date(now).setMonth(now.getMonth()-1)).toISOString() },
                { text: 'Last two months', date: new Date(new Date(now).setMonth(now.getMonth()-2)).toISOString() },
                { text: 'Last six months', date: new Date(new Date(now).setMonth(now.getMonth()-6)).toISOString() },
                { text: 'Last year', date: new Date(new Date(now).setMonth(now.getMonth()-12)).toISOString() },
            ];

            $scope.since = null;
            $scope.until = null;
            $scope.selectedDate = '';

            $scope.$watch('since', updateQuery);
            $scope.$watch('until', updateQuery);


            function updateQuery () {

                if($scope.since || $scope.until) {
                    var since = $scope.since ? solr.escape($scope.since + 'T00:00:00.000Z') : '*';
                    var until = $scope.until ? solr.escape($scope.until + 'T23:59:59.999Z') : '*';

                    $scope.query = ' (' + $scope.field +':[ ' + since + ' TO ' + until + ' ] ) ';
                } else {
                    $scope.query = '*:*';
                }
                $scope.onChange({query:$scope.query});
            };

            $scope.$watch('selectedDate', function (value) {
                $scope.since = $scope.selectedDate.date ? new Date($scope.selectedDate.date).toISOString().substr(0, 10) : null;
                $scope.until = null;
            });

            $scope.updateQuery = updateQuery;

             $('.dropdowndate').on("click", "*", function (e) {
                e.stopPropagation();
            });

            $(document).on('click', 'span.month, th.next, th.prev, th.switch, span.year, td.day, th.dow, th.datepicker-switch', function (e) {
                e.stopPropagation();
            });

			$scope.$parent.$on('clearSelectSelection', function(){
				 clearSelection();
			})

            $scope.hasSelectedItems = function(){
                    return $scope.query.length > 0 && $scope.query !="*:*";
            }
        }]
    }
})


