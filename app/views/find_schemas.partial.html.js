require('app').directive('searchFilterSchemas', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/views/find_schemas.partial.html?'+(new Date().getTime()),
        replace: true,
        scope: {
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$location', function ($scope, $element, $location)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            $scope.isSelected = function(item) {
                return $.inArray(item.symbol, $scope.selectedItems) >= 0;
            };

            $scope.closeDialog = function() {
                $element.find("#dialogSelect").modal("hide");
            };

            $scope.actionSelect = function(item) {

                if($scope.isSelected(item)) {
                    $scope.selectedItems.splice($.inArray(item.symbol, $scope.selectedItems), 1);
                } else {
                    $scope.selectedItems.push(item.symbol);
                }

                $scope.updateQuery();
            };

            $scope.actionExpand = function() {

                var count1 = Math.ceil($scope.items.length/3);
                var count2 = Math.ceil(($scope.items.length-count1)/2);
                var count3 = Math.ceil(($scope.items.length-count2-count1));

                $scope.items1 = $scope.items.slice(0, count1);
                $scope.items2 = $scope.items.slice(count1, count2+count2);
                $scope.items3 = $scope.items.slice(count1+count2, count1+count2+count3);

                $element.find("#dialogSelect").modal("show");
            };

            $scope.$on('onExpand', function(scope) {
                if(scope!=$scope && $scope.expanded)
                    $scope.expanded = false;
            });

            $scope.filterx = function(item) {
                return $scope.isSelected(item) || $scope.expanded;
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };

            $scope.updateQuery = function() {

                console.log($scope.query);
                
                $scope.query = '';

                $scope.selectedItems.forEach(function(item) {
                    $scope.query += ($scope.query=='' ? '' : ' OR ') + $scope.field+':' + item;
                });

                if($scope.query!='')
                    $scope.query = '(' + $scope.query + ')';
                else
                    $scope.query = '*:*';

                console.log($scope.query);
            };

            $scope.onclick = function (scope, evt) {
                scope.item.selected = !scope.item.selected;
                buildQuery();
            }

            function buildQuery () {
                var conditions = [];
                buildConditions(conditions, $scope.terms);

                if(conditions.length==0) $scope.query = '*:*';
                else {
                    var query = '';
                    conditions.forEach(function (condition) { query = query + (query=='' ? '( ' : ' OR ') + condition; });
                    query += ' )';
                    $scope.query = query;
                }
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) { 
                    if(item.selected)
                        conditions.push($scope.field+':'+item.identifier);
                });
            }

            function dictionarize(items) {
                var dictionary = [];
                items.forEach(function (item) { 
                    item.selected = false;
                    dictionary[item.identifier] = item;
                });
                return dictionary;
            }

            $scope.focalpoint              = { identifier: 'focalPoint',               title: 'National Focal Points' };
            $scope.authority               = { identifier: 'authority',                title: 'Competent National Authorities' };
            $scope.database                = { identifier: 'database',                 title: 'National Websites and Databases', count: 0 };
            $scope.measure                 = { identifier: 'measure',                  title: 'Legislative, administrative and policy measures', count: 0  };
            $scope.absPermit               = { identifier: 'absPermit',                title: 'Permits and their equivalent' };
            $scope.absCheckpoint           = { identifier: 'absCheckpoint',            title: 'Checkpoints' };
            $scope.absCheckpointCommunique = { identifier: 'absCheckpointCommunique',  title: 'Checkpoint Communiqués' };

            $scope.resource                = { identifier: 'resource',                 title: 'Virtual Library Record' };
            $scope.organization            = { identifier: 'organization',             title: 'ABS Related Organizations' };
            $scope.meeting                 = { identifier: 'meeting',                  title: 'Meetings &amp; Meeting Outcomes ({{meeting.count}})' };
            $scope.notification            = { identifier: 'notification',             title: 'Notifications' };
            $scope.pressRelease            = { identifier: 'pressRelease',             title: 'Press Releases' };
            $scope.statement               = { identifier: 'statement',                title: 'Statements' };

            $scope.terms  = [ $scope.focalpoint, $scope.authority, $scope.database, $scope.measure, $scope.absPermit, $scope.absCheckpoint, $scope.absCheckpointCommunique, $scope.resource, $scope.organization, $scope.meeting, $scope.notification, $scope.pressRelease, $scope.statement ];
            $scope.termsx = dictionarize($scope.terms);

            // Set intitial selection from QueryString parameters

            var initialSelection = $location.search()[$scope.facet];

            if(initialSelection && $scope.termsx[initialSelection]) {
                $scope.termsx[initialSelection].selected = true;
            }

            function onWatch_items(values) { if(!values) return;
                values.forEach(function (item) {
                    if(_.has($scope.termsx, item.symbol))
                        $scope.termsx[item.symbol].count = item.count;
                });
            }

            $scope.$watch('items', onWatch_items);

            $scope.refresh = buildQuery;
            
            buildQuery();
        }]
    }
});
