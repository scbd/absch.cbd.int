define(['app', 'underscore', '/app/js/common.js'], function(app, _) {

  app.directive('searchFilterCountries', function($http) {
    return {
      restrict: 'EAC',
      templateUrl: '/app/views/search/find_countries.partial.html',
      replace: true,
      scope: {
        title: '@title',
        items: '=ngModel',
        field: '@field',
        query: '=query',
        externalFilter: '=externalFilter'
      },
      link: function($scope, element, attrs, ngModelController) {},
      controller: ['$scope', '$element', '$location', 'commonjs', '$q','$routeParams','$timeout',
        function($scope, $element, $location, commonjs, $q, $routeParams, $timeout) {
          $scope.alphabet = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z'
          ];
          $scope.expanded = false;
          $scope.selectedItems = [];
          $scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet
          $scope.countryFilter = 'All';
          $scope.typeFilter = 'All';


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

            if ($scope.isSelected(item)) {
              $scope.selectedItems.splice($.inArray(item.symbol, $scope.selectedItems), 1);
            } else {
              $scope.selectedItems.push(item.symbol);
            }

            buildQuery();
          };

          $scope.actionExpand = function() {

            var count1 = Math.ceil($scope.items.length / 3);
            var count2 = Math.ceil(($scope.items.length - count1) / 2);
            var count3 = Math.ceil(($scope.items.length - count2 - count1));

            $scope.items1 = $scope.items.slice(0, count1);
            $scope.items2 = $scope.items.slice(count1, count2 + count2);
            $scope.items3 = $scope.items.slice(count1 + count2, count1 + count2 + count3);

            $element.find("#dialogSelect").modal("show");
          };

          $scope.ccc = function(item) {
            return $scope.isSelected(item) ? 'facet selected' : 'facet unselected';
          };

          $scope.onclick = function(scope, evt) {

            scope.item.selected = !scope.item.selected;

            if (scope.item.selected == false)
              if (_.indexOf($scope.externalFilter, scope.item.identifier) >= 0)
                $scope.externalFilter.splice(_.indexOf($scope.externalFilter, scope.item.identifier), 1);

            buildQuery();
          }

          function buildQuery() {
            var conditions = [];
            buildConditions(conditions, $scope.terms);

            if (conditions.length == 0) $scope.query = '*:*';
            else {
              var query = '';
              conditions.forEach(function(condition) {
                query = query + (query == '' ? '( ' : ' OR ') + condition;
              });
              query += ' )';
              $scope.query = query;
            }
          }

          function buildConditions(conditions, items) {
            items.forEach(function(item) {
              if (item.selected)
                conditions.push($scope.field + ':' + item.code.toLowerCase());
            });

            if ($scope.externalFilter && $scope.externalFilter.length > 0) {

              $scope.externalFilter.forEach(function(item) {
                if (_.indexOf($scope.externalFilter, $scope.field + ':' + item) == -1)
                  conditions.push($scope.field + ':' + item);
              });
            }
          }

          function dictionarize(items) {
            var dictionary = [];
            items.forEach(function(item) {
              item.selected = false;
              dictionary[item.code.toLowerCase()] = item;
            });
            return dictionary;
          }
          $scope.setCountryFilter = function(letter) {

            $scope.countryFilter = letter;
          };
          $scope.filterCountries = function(entity) {
            return $scope.countryFilter == 'All' ||
              (entity && entity.name.en.indexOf($scope.countryFilter) == 0);
            // ||$scope.countryFilter == 'isPartyToCBD' && !entity.isSignatory && !entity.isRatified
            // ||$scope.countryFilter == 'isSignatory' && entity.isSignatory
            // ||$scope.countryFilter == 'isRatified' && entity.isRatified;

          };

          $scope.filterByType = function(entity) {
            return $scope.typeFilter == 'All' ||
            $scope.typeFilter == 'isPartyToCBD' && ((!entity.isSignatory && !entity.isRatified) || entity.isInbetween)||
            $scope.typeFilter == 'isSignatory' && entity.isSignatory ||
            $scope.typeFilter == 'isRatified' && entity.isRatified && !entity.isInbetween || 
            $scope.typeFilter == 'isInbetween' && entity.isInbetween;

          };
          $scope.selectedCount = function() {
            return _.where($scope.terms, {
              selected: true
            }).length;
          };

          $scope.terms = [];
          $scope.termsx = [];


          function onWatch_items(values) {
            if (!values) return;
            values.forEach(function(item) {
              if (_.has($scope.termsx, item.symbol))
                $scope.termsx[item.symbol].count = item.count;
            });
            updateExternalFilter();
          }

          $scope.$watch('items', onWatch_items);

          $scope.refresh = buildQuery;

          $scope.$watch('externalFilter', function(newValue, oldValue) {
            console.log(oldValue, newValue);
            if(oldValue && newValue && oldValue.length > newValue.length){ //i.e filter had been removed.
                var removedFilter = _.without(oldValue, newValue);
                console.log(removedFilter);
                var country = _.where($scope.terms, {code: removedFilter[0]})
                country[0].selected = false;
            }
            buildQuery();
            loadContryDetails(true);
            updateExternalFilter();

          }, true);

          if($routeParams.countryCode){
              $scope.externalFilter = [$routeParams.countryCode];
          }

          $scope.$watch('showSelect', function(value) {
              loadContryDetails(value);
          });

          function updateExternalFilter(){
              if($scope.externalFilter && $scope.externalFilter.length>0 && $scope.terms.length > 0){
                  $scope.externalFilter.forEach(function(item){
                      var cd = _.where($scope.terms, {
                          code: item
                      })
                      cd[0].selected = true;
                  });
              }
          }

          function loadContryDetails(value) {
            if (value && $scope.terms.length == 0)
              //$http.get('/api/v2013/thesaurus/domains/countries/terms').success(function(data) {
              $q.when(commonjs.getCountries(), function(data) {
                $scope.terms = data;
                $scope.termsx = dictionarize($scope.terms);
                onWatch_items($scope.items);

                $scope.signatoryCount = 0;
                $scope.nonRatifiedCount = 0;
                $scope.ratifiedCount = 0;
                $scope.inbetweenCount = 0;

                // $q.when(commonjs.getCountries(), function(countries) {
                //
                  $scope.terms.forEach(function(country) {
                    // var cd = _.where(countries, {
                    //   code: country.identifier.substring(0, 2).toUpperCase()
                    // })
                    // if (cd.length > 0) {
                      country.isParty =country.isParty;
                      country.isSignatory = country.isSignatory;
                      country.isRatified = country.isRatified;
                      country.isInbetween = country.isInbetweenParty;

                      if (country.isSignatory)
                        $scope.signatoryCount++;

                      if (country.isInbetween || !country.isRatified)
                        $scope.nonRatifiedCount++;

                      if (country.isRatified && !country.isInbetween)
                        $scope.ratifiedCount++;

                      if (country.isInbetween)
                        $scope.inbetweenCount++;
                    // }

                  });
                //
                //  var cout =
                //   _.reject(countries, function(country){
                //       var cd = _.find($scope.terms, function(cot){
                //           return cot.identifier.toUpperCase() == country.code.toUpperCase();
                //         }                      )
                //         if(!cd)
                //         console.log(cd,country)
                //         if(cd && cd.length>0)
                //             return cd[0];
                //
                //   })
                //   console.log(cout);
                //
                //   console.log($scope.terms)
                //
                // });
              });
          }

          $scope.$on("clearFilter", function(evt, info) {
            if (!$scope.terms)
              return;

            $scope.terms.forEach(function(data) {
              if (data.selected)
                data.selected = false;
            })
            $scope.externalFilter = [];
            buildQuery();

          });


        }
      ]
    }
  });
});
