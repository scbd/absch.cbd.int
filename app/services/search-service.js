import app from '~/app';
import _ from 'lodash';
import './local-storage-service';
import './app-config-service';
import '~/components/scbd-angularjs-services/main';
import './solr';

    app.factory('searchService', ['$http', '$q', 'realm', 'localStorageService', 'appConfigService', 'locale', 'solr',
        function($http, $q, realm, localStorageService, appConfigService, locale, solr) {
            return new function() {

                var base_fields = 'id,realm_ss, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';
                    en_fields += ',symbol_s,startDate_dt,endDate_dt,eventCountry_CEN_s,title_s,eventCity_s,covers_ss';

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

                    //TODO 28*05-24 Blaise to check any side effects!!!!!!
                    var fieldQueries = _.flatten(['_state_s:public', searchQuery.fieldQuery]);

                    if(!_.find(fieldQueries, function(q){ return ~q.indexOf('realm_ss:')})){
                        fieldQueries.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    }

                    fieldQueries.push('_state_s:public')

                    var queryListParameters = {
                        df    : this.localizeFields(searchQuery.df||'text_EN_txt'),
                        fq    : _(fieldQueries).flatten().compact().uniq().value(),
                        q     : searchQuery.query,
                        sort  : this.localizeFields(searchQuery.sort),
                        fl    : this.localizeFields(searchQuery.fields),
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
                        
                    var fieldQueries = _.flatten([searchQuery.fieldQuery]);
                    fieldQueries.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    fieldQueries.push('_state_s:public');

                    // searchQuery.fieldQuery.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    var queryGroupParameters = {
                        df    : this.localizeFields(searchQuery.df||'text_EN_txt'),
                        fq    : _(fieldQueries).flatten().compact().uniq().value(),
                        'q': searchQuery.query,
                        'sort': this.localizeFields(searchQuery.sort),
                        'fl'  : this.localizeFields(searchQuery.fields),
                        'wt'  : 'json',
                        'start': searchQuery.start || (searchQuery.currentPage * searchQuery.rowsPerPage),
                        'rows': searchQuery.rowsPerPage,
                        'group': true,
                        'group.ngroups': true,
                        'group.field': searchQuery.groupField,
                        'group.limit': searchQuery.groupLimit,
                        'group.sort' : this.localizeFields(searchQuery.groupSort)
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

                    return $http.post('/api/v2013/index/select', queryGroupParameters,{ timeout: queryCanceler})
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

                    var fieldQueries = _.flatten([facetQuery.fieldQuery]);
                    fieldQueries.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    fieldQueries.push('_state_s:public');

                    if (facetQuery) {
                        var queryFacetsParameters = {
                            fq    : _(fieldQueries).flatten().compact().uniq().value(),
                            'q': facetQuery.query,
                            'wt': 'json',
                            'rows': 0,
                            'facet': true,
                            'facet.field': facetQuery.fields,
                            'facet.query': facetQuery.query,
                            'facet.limit': 512,
                            'facet.mincount': 1
                        };
                        var queryAction = $http.post('/api/v2013/index/select', queryFacetsParameters);

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

                    var fieldQueries = _.flatten([facetQuery.fieldQuery]);
                    fieldQueries.push('realm_ss:' + appConfigService.currentRealm.toLowerCase())
                    fieldQueries.push('_state_s:public');

                    if (facetQuery) {

                        var queryFacetsParameters = {
                            fq    : _(fieldQueries).flatten().compact().uniq().value(),
                            'q': facetQuery.query,
                            'fl': '',
                            'wt': 'json',
                            'rows': 0,
                            'facet': true,
                            'facet.pivot': facetQuery.fields,
                            'facet.limit': 512,
                            'facet.mincount': 1
                        };
                        var queryAction = $http.post('/api/v2013/index/select', queryFacetsParameters);
                        
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
                        query: 'NOT virtual_b:* AND schema_s:(' + schemas.map(solr.escape).join(' ') + ')'
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

                this.localizeFields = function localizeFields(fields){
                    if(!fields)
                        return;

                    if (locale && locale !== 'en') {
                        const fieldLocale = (locale||'en').toUpperCase();
                        const localize = (f) => typeof f === 'string' ? f.replace(/_EN_/g, `_${ fieldLocale }_`) : f;

                        if (Array.isArray(fields)) {
                            return fields.map(localize);
                        }

                        return localize(fields);
                    }
                
                    return fields;
                };

                this.readFacets     = readFacets2;

            }
        }
    ]);

