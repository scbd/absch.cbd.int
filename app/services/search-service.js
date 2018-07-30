define(['app', 'underscore', './local-storage-service', './app-config-service',
'components/scbd-angularjs-services/services/locale'], function(app, _) {

    app.factory('searchService', ['$http', '$q', 'realm', 'localStorageService', 'appConfigService', 'locale',
        function($http, $q, realm, localStorageService, appConfigService, locale) {
            return new function() {

                var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';

                var searchDefaults = {
                    currentPage: 0,
                    rowsPerPage: 25,
                    sort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                    fields: base_fields + en_fields,
                    query: '*:*',
                    groupSort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                    groupField: 'government_s',
                    groupLimit: 100000
                }
                var q = '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:* AND ';

                //================================================================================================================
                this.list = function(searchQuery, queryCanceler) {

                    _.defaults(searchQuery, searchDefaults);
                    q = '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:* AND ';

                    var queryListParameters = {
                        'q': q + searchQuery.query,
                        'sort': searchQuery.sort,
                        'fl': localeFields(searchQuery.fields),
                        'wt': 'json',
                        'start': searchQuery.currentPage * searchQuery.rowsPerPage,
                        'rows': searchQuery.rowsPerPage,
                    };

                    // console.log("list:" + q + searchQuery.query);

                    return $http.get('/api/v2013/index/select', {
                        params: queryListParameters,
                        timeout: queryCanceler
                    });


                }

                //================================================================================================================
                this.group = function(searchQuery, queryCanceler) {

                    _.defaults(searchQuery, searchDefaults);
                    q = '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:* AND ';

                    var queryGroupParameters = {
                        'q': q + searchQuery.query,
                        'sort': searchQuery.sort,
                        'fl': localeFields(searchQuery.fields),
                        'wt': 'json',
                        'start': searchQuery.currentPage * searchQuery.rowsPerPage,
                        'rows': searchQuery.rowsPerPage,
                        'group': true,
                        'group.ngroups': true,
                        'group.field': searchQuery.groupField,
                        'group.limit': searchQuery.groupLimit,
                        'group.sort': searchQuery.groupSort
                    };

                    // console.log("group:" + q + searchQuery.query);

                    return $http.get('/api/v2013/index/select', {
                        params: queryGroupParameters,
                        timeout: queryCanceler
                    });
                }

                //================================================================================================================
                this.facets = function(facetQuery, localStorageKey) {

                    if (localStorageKey) {
                        var fromStorage = localStorageService.get(localStorageKey);
                        if (fromStorage)
                            return fromStorage;
                    }
                    _.defaults(facetQuery, searchDefaults);

                    if (facetQuery) {
                        q = '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:* AND ';
                        var queryFacetsParameters = {
                            'q': q + facetQuery.query,
                            'fl': '',
                            'wt': 'json',
                            'rows': 0,
                            'facet': true,
                            'facet.field': facetQuery.fields,
                            'facet.query': facetQuery.query,
                            'facet.limit': 512,
                            'facet.mincount': 1
                        };
                        var queryAction = $http.get('/api/v2013/index/select', {
                            params: queryFacetsParameters
                        });
                        return $q.when(queryAction)
                            .then(function(data) {
                                var facets = readFacets2(data.data.facet_counts.facet_fields[facetQuery.fields]);

                                if (localStorageKey)
                                    localStorageService.set(localStorageKey, facets);

                                return facets;
                            })
                    }

                };
                //================================================================================================================
                this.facetsPivot = function(facetQuery, localStorageKey, country) {

                    if (localStorageKey) {
                        var fromStorage = localStorageService.get(localStorageKey);
                        if (fromStorage){ //&& fromStorage.expiry < new date())
                            if(country){
                                return _.find(fromStorage, {government:country});
                            }
                            return fromStorage;
                        }
                    }
                    _.defaults(facetQuery, searchDefaults);

                    if (facetQuery) {
                        q = '(realm_ss:' + appConfigService.currentRealm.toLowerCase() + ') AND NOT version_s:* AND ';
                        var queryFacetsParameters = {
                            'q': q + facetQuery.query,
                            'fl': '',
                            'wt': 'json',
                            'rows': 0,
                            'facet': true,
                            'facet.pivot': facetQuery.fields,
                            'facet.limit': 512,
                            'facet.mincount': 1
                        };
                        var queryAction = $http.get('/api/v2013/index/select', {
                            params: queryFacetsParameters
                        });
                        return $q.when(queryAction)
                            .then(function(data) {

                                var facets = _.map(data.data.facet_counts.facet_pivot[facetQuery.fields], function(data) {
                                    var facet = {};
                                    facet.government = data.value;
                                    facet.recordCount = data.count;
                                    facet.schemas = {};
                                    _.each(data.pivot, function(pivotFacets) {
                                        facet.schemas[pivotFacets.value] = pivotFacets.count;
                                    });
                                    return facet;
                                });

                                if (localStorageKey)
                                    localStorageService.set(localStorageKey, facets);
                                
                                if(country){
                                    return _.find(facets, {government:country});
                                }

                                return facets;
                            });
                    }

                };

                //================================================================================================================
                this.governmentSchemaFacets = function(country) {

                    var nationalRecordsQuery = {
                        fields: 'government_s,schema_s',
                        query: 'NOT virtual_b:* AND schema_s:(' + appConfigService.nationalSchemas.join(' ') + ')'
                    };
                    return this.facetsPivot(nationalRecordsQuery, 'governmentFacets', country);

                };


                /////////////////////////////////////
                //       internal functions        //
                ////////////////////////////////////
                function readFacets2(solrArray) {

                    var facets = [];
                    if (solrArray) {
                        for (var i = 0; i < solrArray.length; i += 2) {

                            var facet = solrArray[i];

                            facets.push({
                                symbol: facet,
                                title: facet,
                                count: solrArray[i + 1]
                            });
                        }
                    }
                    return facets;
                };

                function localeFields(fields){

                    if(locale && locale!='en'){
                        return fields.replace(/_EN/ig, '_'+(locale||'en').toUpperCase())
                    }

                    return fields;
                }

                this.readFacets = readFacets2;

            }
        }
    ]);
});
