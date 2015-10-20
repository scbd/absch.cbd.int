var thesaurus = null;

define(['app'], function(app) {
  app.directive('searchFilterRegions', function ($http, $timeout) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/views/search/search-filter-regions.partial.html?v'+(new Date()).getTime(),
        replace: true,
        scope: {
              title: '@title',
              items: '=ngModel',
              field: '@field',
              query: '=query',
              facets: '=facets',
              api             : '=?'
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$location', 'Thesaurus', function ($scope, $element, $location, thesaurus)
        {
            $scope.api = {
                getSelected   : function(){return _.where(self.termsMap, {selected: true});},
                unSelectItem  : unSelectItem,
                unSelectAll   : unSelectAll,
            }
            function unSelectItem(identifier){
                if(identifier){
                    var selectedItem = _.find(self.termsMap, {identifier:identifier})
                    if(selectedItem){
                        $scope.onclick({item:selectedItem});
                    }
                }
            }

            function unSelectAll(){
                $scope.api.getSelected().forEach(function(data) {
                  if (data.selected)
                    data.selected = false;
                })
                buildQuery();
            }
            var self = this;
            self.termsMap = [];

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

            $scope.actionSelect = function(item) {

                if($scope.isSelected(item)) {
                    $scope.selectedItems.splice($.inArray(item.symbol, $scope.selectedItems), 1);
                } else {
                    $scope.selectedItems.push(item.symbol);
                }

                buildQuery();
            };

            $scope.ccc = function(item) {
                return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
            };

            $scope.onclick = function (scope, evt) {
                scope.item.selected = !scope.item.selected;
                buildQuery();
            }

            function buildQuery (avar) {
              $timeout(function() {
                var conditions = [];
                buildConditions(conditions, self.termsMap);

                if(conditions.length==0) $scope.query = '*:*';
                else {
                    var query = '';
                    conditions.forEach(function (condition) { query = query + (query=='' ? '( ' : ' OR ') + condition; });
                    query += ' )';
                    $scope.query = query;
                }
              }, 1000);
            }

            function buildConditions (conditions, items) {
                _.values(items).forEach(function (item) {
                    if(item.selected){
                        conditions.push($scope.field+':'+item.identifier);
                    }
                });
            }

            function dictionarize(items) {
                var dictionary = [];
                (items||[]).forEach(function (item) {
                    item.selected = false;
                    dictionary[item.identifier] = item;
                });
                return dictionary;
            }

            function flatten(items, collection) {
                items.forEach(function (item) {
                    item.selected = false;
                    collection[item.identifier] = item;
                    if(item.narrowerTerms)
                        flatten(item.narrowerTerms, collection);
                });
                return collection;
            }



            function onWatch_items(values) {
                (values||[]).forEach(function (item) {
                    if(_.has($scope.termsx, item.symbol))
                        $scope.termsx[item.symbol].count = item.count;
                });
            }

            $scope.refresh = buildQuery;
            $scope.facets = [];
            $scope.$watch('facets', function(items){
                 if(items){
                    $scope.facets = items;
                }
            });

            $scope.terms = [];

            $scope.$watch('$parent.loadRegions', function (value) {
                $scope.showSelect = value;
            });


            $scope.$watch('showSelect', function(value){
                    if(value && $scope.terms.length==0){
                        $http.get('/api/v2013/thesaurus/domains/regions/terms').then(function (response) {
                            var termsTree = thesaurus.buildTree(response.data);
                            self.termsMap = flatten(termsTree, {});
                            var classes   = _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218'});

                            _.values(self.termsMap).forEach(function (term) {
                                term.selected = false;
                                term.count = 0;
                            });

                            $scope.allTerms = _.values(self.termsMap);

                            ($scope.items||[]).forEach(function (item) {
                                if(_.has(self.termsMap, item.symbol))
                                    self.termsMap[item.symbol].count = item.count;
                            });

                            $scope.terms = classes;

                            updateFacets();
                        });
                    }
                }
            );

            $scope.$watch('facets', function(newVal){
                if(newVal)
                    updateFacets();
            });
            $scope.$on("clearFilter", function(evt, info){

                if(!$scope.allTerms)
                    return;

                $scope.allTerms.forEach(function(data){
                    if(data.selected)
                        data.selected = false;
                })

                buildQuery();

            });

            function updateFacets(){
                //update facets
                ($scope.facets).forEach(function (item) {
                    if(_.has(self.termsMap, item.symbol))
                        self.termsMap[item.symbol].count = item.count;
                });
            }

            buildQuery();

        }]
    }
  })
});
