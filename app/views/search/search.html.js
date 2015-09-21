define(['app', 'underscore',
    'scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls', 
], function(app, _) {

    app.controller('newSearchController', ['$scope', '$http', '$filter',
        function($scope, $http, $filter) {
            $scope.matrix={};

            $scope.options = {
                countries: function() {
                    return $http.get("/api/v2013/thesaurus/domains/countries/terms", {
                        cache: true
                    }).then(function(o) {
                        var countries = $filter("orderBy")(o.data, "name");
                        _.each(countries, function(element) {
                            element.__value = element.name;
                        });
                        return countries;
                    });
                },
            };

            $scope.navigateTo = function(to, event) {
                
            };
            $scope.genericFilter = function($query, items) {
                var matchedOptions = [];
                for (var i = 0; i != items.length; ++i)
                    if (items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
                        matchedOptions.push(items[i]);

                return matchedOptions;
            };

            $scope.genericMapping = function(item) {
                return {
                    identifier: item.identifier
                };
            };


    }]);

});
