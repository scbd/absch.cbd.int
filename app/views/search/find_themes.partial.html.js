define(['app'], function (app) {
app.directive('searchFilterThemes', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/views/search/find_themes.partial.html',
        replace: true,
        // require : "?ngModel",
        scope: {
              // placeholder: '@',
              // ngDisabledFn : '&ngDisabled',
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
              // locales    : '=',
              // rows       : '=',
              // required   : "@"
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$location', 'Thesaurus', 'underscore', function ($scope, $element, $location, thesaurus, _)
        {
            $scope.expanded = false;
            $scope.selectedItems = [];
            $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            var parameters = $location.search();

            if (parameters[$scope.facet]) {
                $scope.selectedItems.push(parameters[$scope.facet]);
            }

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

                console.log($scope.items1);
                console.log($scope.items2);
                console.log($scope.items3);


                $element.find("#dialogSelect").modal("show");

                //if(!$scope.expanded)
                    //$scope.$parent.$broadcast('onExpand', $scope);

                //$scope.expanded = !$scope.expanded;
            };

            $scope.$on('onExpand', function(scope) {
                if(scope!=$scope && $scope.expanded)
                    $scope.expanded = false;
            });

            $scope.filterx = function(item) {
                console.log(item);
                //return item.selected;
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };
            $scope.showSelected = function(item) {
                //console.log(item.selected,item.indeterminate )
                if(item.selected || item.indeterminate)
                    return true;
                return false;
            }

            $scope.updateQuery = function() {

               // console.log($scope.query );

                $scope.query = '';

                $scope.selectedItems.forEach(function(item) {
                    $scope.query += ($scope.query=='' ? '' : ' OR ') + $scope.field+':' + item;
                });

                if($scope.query!='')
                    $scope.query = '(' + $scope.query + ')';
                else
                    $scope.query = '*:*';

               // console.log($scope.query);
            };

            function select(item) {
                if(!item.selected) item.indeterminate = true;
                if(item.narrowerTerms) item.narrowerTerms.forEach(select);
            }

            var unselect = $scope.unselect = function (item) {
                if(!item.selected) item.indeterminate = false;
                if(item.narrowerTerms) item.narrowerTerms.forEach(unselect);
            }

            function setBroaders(broaderTerms, selected) {

                if(!broaderTerms) return;

                broaderTerms.forEach(function (term) {
                    term.indeterminateCounterA = term.indeterminateCounterA + (selected ? 1 : -1);
                    term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                    setBroaders(term.broaderTerms, selected);
                });

            }

            function setNarrowers(narrowerTerms, selected) {

                if(!narrowerTerms) return;

                narrowerTerms.forEach(function (term) {

                    term.indeterminateCounterB = term.indeterminateCounterB + (selected ? 1 : -1);
                    term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                    setNarrowers(term.narrowerTerms, selected);
                });
            }

            $scope.onclick = function (item, evt) {
                scope.item.selected = !item.item.selected;
                $scope.ts(item, evt);
            }

            $scope.ts = function (item, evt) {

//console.log(scope.item);
                var term = item.item;
                term.selected = !item.item.selected;
                term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;

                setBroaders(term.broaderTerms, term.selected);
                setNarrowers(term.narrowerTerms, term.selected);

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

                //console.log($scope.query);
            }

            function buildConditions (conditions, items) {
                items.forEach(function (item) {
                    if(item.selected)
                        conditions.push('thematicAreas_ss:'+encodeURIComponent(item.identifier));
                    else if(item.narrowerTerms) {
                        buildConditions(conditions, item.narrowerTerms);
                    }
                });
            }

            function flatten(items, collection) {
                items.forEach(function (item) {
                    item.selected = false;
                    item.indeterminateCounterA = 0;
                    item.indeterminateCounterB = 0;
                    collection[item.identifier] = item;
                    if(item.narrowerTerms)
                        flatten(item.narrowerTerms, collection);
                });
                return collection;
            }



            $scope.$watch('items', function (values) {

                if(!values) return;
                if($scope.termsMap)
                    values.forEach(function (item) {
                        if(_.has($scope.termsMap, item.symbol))
                            $scope.termsMap[item.symbol].count = item.count;
                    });
            });

            $scope.terms = [];
            $scope.$watch('showSelect', function(value){
                    if(value && $scope.terms.length==0){

                        $http.get('/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms').success(function (data) {
                            $scope.terms = thesaurus.buildTree(data);

                            $scope.termsMap   = flatten($scope.terms, {});
                            $scope.termsArray = _.values($scope.termsMap);

                            if($scope.items)
                                $scope.items.forEach(function (item) {
                                    if(_.has($scope.termsMap, item.symbol))
                                        $scope.termsMap[item.symbol].count = item.count;
                                });
                           //console.log (data);
                        });
                    }
                }
            );
            $scope.$on("clearFilter", function(evt, info){

                $scope.termsMap   = flatten($scope.terms, {});
                $scope.terms.forEach(unselect)
                $scope.termsArray = _.values($scope.termsMap);

                buildQuery();

            });
            function resetIndeterminante(term ,selected){
                term.indeterminateCounterB = term.indeterminateCounterB + (selected ? 1 : -1);
                term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;
            }

            function resetCheckbox(terms) {

                if(!terms) return;
                terms.forEach(function (term) {
                    // if(term.selected)
                    // {
                        term.selected = false;
                    // }
                        term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;
                        resetIndeterminante(term, false);

                    //}
                    resetCheckbox(term.narrowerTerms);
                });

            }

            function resetCheckbox1(terms) {

                if(!terms) return;
                terms.forEach(function (term) {
                    // if(term.selected)
                        term.selected = false;
                    term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;
                        term.indeterminateCounterA = term.indeterminateCounterA + (selected ? 1 : -1);
                        term.indeterminate = !term.selected && (term.indeterminateCounterA + term.indeterminateCounterB) > 0;
                    resetCheckbox(term.broaderTerms);
                });

            }
        }]
    }
});
});
