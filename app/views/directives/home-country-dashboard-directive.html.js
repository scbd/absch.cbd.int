define(['app'], function (app) {
	app.directive('homeCountryDashboard', function($http){
		return{
			restrict: 'EAC',
			replace:true,
			templateUrl: '/app/views/directives/home-country-dashboard-directive.html',
			controller: ['$scope', '$filter','schemaTypes', 'realm', function($scope, $filter, schemaTypes, realm){

                $scope.options  = {
                      countries		: function() {
                        return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){
                          var countries = $filter("orderBy")(o.data, "name");
                          _.each(countries, function(element) {
                            element.__value = element.name;
                          });
                          return countries;
                        });
                      }
                }
                $scope.genericFilter = function($query, items) {
                  var matchedOptions = [];
                  for(var i=0; i!=items.length; ++i)
                    if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
                      matchedOptions.push(items[i]);

                  return matchedOptions;
                };

                $scope.genericMapping = function(item) {
                  return {identifier: item.identifier};
                };
                $scope.$watch('document.countryStats', function(newValue){
                    //console.log(newValue)
                    if(newValue && newValue.identifier){
                        $scope.loadFacets(newValue.identifier);
                    }
                    else if(newValue ==null)
                        $scope.loadFacets();
                })
    			$scope.loadFacets = function(country){

                    var countryQuery = '';
                    $scope.loadingFacets = true;

                    if(country){
                        countryQuery = ' AND government_s:' + country;
                    }

    				var queryFacetsParameters = {
                        'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND NOT version_s:* AND (schema_s:'
                                          + schemaTypes.join(' OR schema_s:') + ') '+ countryQuery ,
                        'fl': '', 		//fields for results.
                        'wt': 'json',
                        'rows': 0,		//limit
                        'facet': true,	//get counts back
                        'facet.pivot': 'government_s,schema_s',
                        'facet.limit': 512
                    };

                    $http.get('/api/v2013/index/select', { params: queryFacetsParameters }).success(function (data) {

                        var tempFacets = {};
                        _.each(data.facet_counts.facet_pivot['government_s,schema_s'], function(data){
                            _.each(data.pivot, function(facets){
                                tempFacets[facets.value] = {"facetCount" : (tempFacets[facets.value] ? tempFacets[facets.value].facetCount : 0) + facets.count,
                                                "countryCount" : (tempFacets[facets.value] ? tempFacets[facets.value].countryCount : 0) + 1};
                            });

                        });
                        $scope.commonFormatFacets = _.pairs(tempFacets);
                        $scope.loadingFacets = false;

                    }).error(function (error) {$scope.commonFormatFacets={};console.log(error); } )
                    .finally(function(){$scope.loadingFacets = false;})

    			}
                //$scope.loadFacets();


			}]
		};

	});
});
