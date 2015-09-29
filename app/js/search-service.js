define(['app', 'underscore'], function (app, _) {

    app.factory('searchService', ['$http', '$q', function ($http, $q) {
        return new function () {
            
            this.list = function(searchQuery){
                
            }
            
            this.group = function(searchQuery){
                
            }
            
            this.facets = function(facetQuery){
                
                if(facetQuery) {
                    
                    var queryFacetsParameters = {
                        'q'             : facetQuery.q,
                        'fl'            : '', 
                        'wt'            : 'json',
                        'rows'          : 0,
                        'facet'         : true,
                        'facet.field'   :facetQuery.f,
                        'facet.limit'   : 512,
                        'facet.mincount': 1
                    };
                   var queryAction =  $http.get('/api/v2013/index/select', { params: queryFacetsParameters });
                   $q.when(queryAction)
                    .then(function (data) {
                        var facets = {};
                        _.each(facetQuery.f, function(facet){
                            facets[facet] = readFacets2(data.data.facet_counts.facet_fields[facet]);
                        });
                        console.log(facets);
                        return facets;
                    })
                }                
           }
           
           
           /////////////////////////////////////
           //       internal functions        //
           ////////////////////////////////////
           function readFacets2(solrArray) {

                var facets = [];
                if(solrArray){
                    for (var i = 0; i < solrArray.length; i += 2) {
    
                        var facet = solrArray[i];
    
                        facets.push({ symbol: facet, title: facet, count: solrArray[i + 1] });
                    }
                }
                return facets;
           };
        }
    }]);
});
