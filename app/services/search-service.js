define(['app', 'underscore', './local-storage-service.js'], function (app, _) {

    app.factory('searchService', ['$http', '$q', 'realm', 'localStorageService',
      function ($http, $q, realm, localStorageService) {
        return new function () {

            var searchDefaults = {
                currentPage     : 0,
                rowsPerPage     : 25,
                sort            : 'udpatedDate_dt desc',
                fields          : 'identifier_s, title_t, description_t',
                query           : '*:*',
                groupSort       : 'government_EN_t',
                groupField      : 'government_EN_t asc'
            }

           var q = '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:* AND';
            

           //*****************************************************************************************************************
            this.list = function(searchQuery, queryCanceler){

               _.defaults(searchQuery, searchDefaults);

               var queryListParameters = {
                    'q': q + searchQuery.query,
                    'sort': searchQuery.sort,
                    'fl': searchQuery.fields,
                    'wt': 'json',
                    'start': searchQuery.currentPage * searchQuery.rowsPerPage,
                    'rows': searchQuery.rowsPerPage,
                };

                return $http.get('/api/v2013/index/select', { params: queryListParameters, timeout: queryCanceler });
            }

            //*****************************************************************************************************************
            this.group = function(searchQuery, queryCanceler){

               _.defaults(searchQuery, searchDefaults);

               var queryGroupParameters = {
                    'q': q  + searchQuery.query,
                    'sort': searchQuery.sort,
                    'fl': searchQuery.fields,
                    'wt': 'json',
                    'start': searchQuery.currentPage * searchQuery.rowsPerPage,
                    'rows': searchQuery.rowsPerPage,
                    'group': true,
                    'group.ngroups' : true,
                    'group.field': searchQuery.groupField,
                    'group.limit': 1000,
                    'group.sort': searchQuery.groupSort
                };

                return $http.get('/api/v2013/index/select', { params: queryGroupParameters, timeout: queryCanceler });
            }

            //*****************************************************************************************************************
            this.facets = function(facetQuery, localStorageKey){

                if(localStorageKey){
                    var fromStorage = localStorageService.get(localStorageKey);
                    if(fromStorage && fromStorage.data )//&& fromStorage.expiry < new date())
                        return fromStorage.data;
                }
               _.defaults(facetQuery, searchDefaults);

                if(facetQuery) {

                    var queryFacetsParameters = {
                        'q'             : facetQuery.query,
                        'fl'            : '',
                        'wt'            : 'json',
                        'rows'          : 0,
                        'facet'         : true,
                        'facet.field'   : facetQuery.fields,
                        'facet.query'   : facetQuery.query,
                        'facet.limit'   : 512,
                        'facet.mincount': 1
                    };
                   var queryAction =  $http.get('/api/v2013/index/select', { params: queryFacetsParameters });
                   return $q.when(queryAction)
                    .then(function (data) {
                        var facets = {};
                        _.each(facetQuery.fields, function(facet){
                            facets[facet] = readFacets2(data.data.facet_counts.facet_fields[facet]);
                        });

                        if(localStorageKey)
                            localStorageService.set(localStorageKey, facets);

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
