define(['app', 'lodash', './local-storage-service', './app-config-service',
'components/scbd-angularjs-services/services/locale'], function(app, _) {

    app.factory('searchService', ['$http', '$q', 'realm', 'localStorageService', 'appConfigService', 'locale',
        function($http, $q, realm, localStorageService, appConfigService, locale) {
            return new function() {

                var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,summary_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';

                var searchDefaults = {
                    currentPage : 0,
                    rowsPerPage : 25,
                    fields      : base_fields + en_fields,
                    groupField  : 'government_s',
                    groupLimit  : 100000,
                    fieldQuery  : [],
                    query       : "''"
                }

                // groupSort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                // sort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                
                //================================================================================================================
                this.list = function(searchQuery, queryCanceler) {

                    _.defaults(searchQuery, searchDefaults);
                    if(searchQuery.additionalFields)
                        searchQuery.fields += ',' + searchQuery.additionalFields;                                               

                    var fieldQueries = _.flatten([searchQuery.fieldQuery]);

                    if(!_.find(fieldQueries, function(q){ return ~q.indexOf('realm_ss:')})){
                        fieldQueries.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    }

                    var queryListParameters = {
                        df    : localizeFields(searchQuery.df||'text_EN_txt'),
                        fq    : _.flatten(fieldQueries),
                        q     : searchQuery.query,
                        sort  : localizeFields(searchQuery.sort),
                        fl    : localizeFields(searchQuery.fields),
                        wt    : 'json',
                        start : searchQuery.start || (searchQuery.currentPage * searchQuery.rowsPerPage),
                        rows  : searchQuery.rowsPerPage,
                        // 'debug.explain.structured':true,
                        // "debugQuery":"on"
                    };

                    if(searchQuery.highlight){
                        queryListParameters.hl      = true;
                        queryListParameters['hl.snippets'] = 5;
                        queryListParameters['hl.fl']= searchQuery.highlightFields||'text_EN_txt';
                    }
                    if(searchQuery.facet){
                        queryListParameters.facet = true
                        queryListParameters['facet.field']  = searchQuery.facetFields
                        queryListParameters['facet.mincount'] = 1,
                        queryListParameters['facet.limit'] =  512

                        if(searchQuery.pivotFacetFields)
                            queryListParameters['facet.pivot']  = searchQuery.pivotFacetFields;
                    }

                    // console.log("list:" + q + searchQuery.query);

                    return $http.post('/api/v2013/index/select', queryListParameters, { timeout: queryCanceler })
                            .then(function(data){
                                if(searchQuery.facet){ /// Normalize Facets                                   
                                    data.data.facet_counts.facet_fields = facetsToObject(data.data.facet_counts.facet_fields, searchQuery.facetFields)
                                }
                                return data;
                           });


                }

                //================================================================================================================
                this.group = function(searchQuery, queryCanceler) {

                    _.defaults(searchQuery, searchDefaults);
                    if(searchQuery.additionalFields)
                        searchQuery.fields += ',' + searchQuery.additionalFields;
                        
                    // searchQuery.fieldQuery.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    var queryGroupParameters = {
                        df    : localizeFields(searchQuery.df||'text_EN_txt'),
                        fq    : _.union(['realm_ss:' + appConfigService.currentRealm.toLowerCase()], searchQuery.fieldQuery),
                        'q': searchQuery.query,
                        'sort': localizeFields(searchQuery.sort),
                        'fl': localizeFields(searchQuery.fields),
                        'wt': 'json',
                        'start': searchQuery.start || (searchQuery.currentPage * searchQuery.rowsPerPage),
                        'rows': searchQuery.rowsPerPage,
                        'group': true,
                        'group.ngroups': true,
                        'group.field': searchQuery.groupField,
                        'group.limit': searchQuery.groupLimit,
                        'group.sort': localizeFields(searchQuery.groupSort)
                    };

                    if(searchQuery.highlight){
                        queryGroupParameters.hl      = true;
                        queryGroupParameters['hl.snippets'] = 5;
                        queryGroupParameters['hl.fl']= searchQuery.highlightFields||'text_EN_txt';
                    }

                    if(searchQuery.facet){
                        queryGroupParameters.facet = true
                        queryGroupParameters['facet.field']  = searchQuery.facetFields
                        queryGroupParameters['facet.mincount'] = 1,
                        queryGroupParameters['facet.limit'] =  512
                    }
                    // console.log("group:" + q + searchQuery.query);

                    return $http.get('/api/v2013/index/select', { params: queryGroupParameters, timeout: queryCanceler})
                                .then(function(data){
                                    if(searchQuery.facet){ /// Normalize Facets                                   
                                        data.data.facet_counts.facet_fields = facetsToObject(data.data.facet_counts.facet_fields, searchQuery.facetFields)
                                    }
                                    return data;
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
                        var queryFacetsParameters = {
                            fq    : _.union(['realm_ss:' + appConfigService.currentRealm.toLowerCase()], facetQuery.fieldQuery),
                            'q': facetQuery.query,
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
                                var facets;                               
                                facets = facetsToObject(data.data.facet_counts.facet_fields, facetQuery.fields);

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

                        var queryFacetsParameters = {
                            fq    : _.union(['realm_ss:' + appConfigService.currentRealm.toLowerCase()], facetQuery.fieldQuery),
                            'q': facetQuery.query,
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
                                    _.forEach(data.pivot, function(pivotFacets) {
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
                    var schemas = _.without(appConfigService.nationalSchemas, 'contact');
                    var nationalRecordsQuery = {
                        fields: 'government_s,schema_s',
                        query: 'NOT virtual_b:* AND schema_s:(' + schemas.join(' ') + ')'
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
                function facetsToObject(solrArray, facetFields) {

                    var facets = {};
                    if(!_.isArray(facetFields)){
                        facetFields = [facetFields]
                    }

                    _.forEach(facetFields, function(field){
                        if (solrArray){
                            var mField = field.replace(/{.*}/, ''); //remove tags(${!ex=xxx}) is specified in field names
                            for (var i = 0; i < solrArray[mField].length; i += 2) {
                                if(!facets[mField])
                                    facets[mField] = {};
                                facets[mField][solrArray[mField][i]] = solrArray[mField][i + 1];
                            }
                        }
                    });
                                                           
                    return facets;
                };

                function localizeFields(fields){
                    if(!fields)
                        return;
                        
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
