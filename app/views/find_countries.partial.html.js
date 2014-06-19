define(['app','/app/js/common.js'], function (app) {

    app.directive('searchFilterCountries', function ($http) {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/find_countries.partial.html',
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
            controller : ['$scope', '$element', '$location','commonjs', '$q', function ($scope, $element, $location,commonjs,$q)
            {
                $scope.alphabet = ['All','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                $scope.expanded = false;
                $scope.selectedItems = [];
                $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet
                $scope.countryFilter ='All';


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

                    buildQuery();
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
                };

                $scope.ccc = function(item) {
                    return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
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
                 $scope.setCountryFilter = function(letter){

                        $scope.countryFilter = letter;                   
                };
                $scope.filterCountries = function(entity){
                        return $scope.countryFilter == 'All' || 
                        (entity && entity.title.en.indexOf($scope.countryFilter) == 0);

                };

                $scope.terms = [];
                $scope.termsx = [];
                

                function onWatch_items(values) { if(!values) return;
                    values.forEach(function (item) {
                        if(_.has($scope.termsx, item.symbol))
                            $scope.termsx[item.symbol].count = item.count;
                    });
                }

                $scope.$watch('items', onWatch_items);

                $scope.refresh = buildQuery;

                $scope.$watch('showSelect', function(value){
                    if(value && $scope.terms.length==0)
                        $http.get('/api/v2013/thesaurus/domains/countries/terms').success(function (data) {
                            
                            $scope.terms = data;
                            $scope.termsx = dictionarize($scope.terms);
                            onWatch_items($scope.items);

                            $q.when(commonjs.getCountries(),function(countries){                            
                                $scope.terms.forEach(function(country){                                   
                                    var cd = _.where(countries, {code:country.identifier.substring(0,2).toUpperCase()})
                                    if(cd.length>0){
                                        country.isParty = cd[0].isParty;
                                        country.isSignatory = cd[0].isSignatory;
                                        country.isRatified  = cd[0].isRatified
                                    }                                
                                });

                            }); 
                        });
                });
                
                
            }]
        }
    });
});